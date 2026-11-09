#!/usr/bin/env python3
"""Preview-only smoke test. Credentials and cookies exist in memory only.

Input: one JSON object on stdin with keys "username" and "password".
Do not invoke until the caller has independently confirmed Blob isolation.
"""
import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.request
import uuid
from http.cookies import SimpleCookie
from pathlib import Path
from urllib.parse import urlsplit


class SafeFailure(Exception):
    """An error message containing no credential or response data."""


def read_oidc_token(path):
    values = []
    with Path(path).open(encoding='utf-8-sig') as file:
        for line in file:
            match = re.match(r'^\s*(?:export\s+)?VERCEL_OIDC_TOKEN\s*=\s*(.*?)\s*$', line)
            if not match:
                continue
            value = match.group(1)
            if len(value) >= 2 and value[0] == value[-1] and value[0] in ('"', "'"):
                value = value[1:-1]
            values.append(value)
    if len(values) != 1 or not re.fullmatch(r'[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+', values[0]):
        raise SafeFailure('Expected one valid OIDC token in the selected environment file')
    return values[0]


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        # Never forward the trusted token or cookie to another location.
        return None


def validate_url(url):
    parts = urlsplit(url)
    host = (parts.hostname or "").lower()
    if (parts.scheme != "https" or not host.endswith(".vercel.app") or
            host == "wmc-iota.vercel.app" or not host.startswith("wmc-") or
            not re.fullmatch(r"[a-z0-9.-]+", host) or parts.port is not None or
            parts.username or parts.password or parts.path not in ("", "/") or
            parts.query or parts.fragment):
        raise ValueError("An explicitly verified WMC Preview deployment URL is required")
    return f"https://{host}"


class PreviewClient:
    def __init__(self, base, oidc_token):
        self.base = base
        self.cookie = None
        self.oidc_token = oidc_token
        self.opener = urllib.request.build_opener(NoRedirect)

    def request(self, route, payload=None, authenticated=False):
        headers = {'x-vercel-trusted-oidc-idp-token': self.oidc_token}
        if authenticated:
            if self.cookie is None:
                raise SafeFailure("No Preview session")
            headers['Cookie'] = self.cookie
        body = None
        if payload is not None:
            headers['Content-Type'] = 'application/json'
            body = json.dumps(payload, ensure_ascii=True, separators=(',', ':')).encode('utf-8')
        request = urllib.request.Request(self.base + route, data=body, headers=headers)
        try:
            try:
                response = self.opener.open(request, timeout=45)
            except urllib.error.HTTPError as error:
                response = error
            with response:
                status = response.status
                response_headers = str(response.headers)
                response_body = response.read().decode('utf-8', 'replace')
            return status, response_headers, response_body
        except (OSError, ValueError) as error:
            # No request headers, bodies or token values in diagnostics.
            raise SafeFailure(f"HTTPS request failed for {route} ({type(error).__name__})") from None

    def login(self, username, password):
        status, headers, _ = self.request('/api/auth', {'action': 'login', 'username': username, 'password': password})
        expect(status == 200, f"Login status {status}, expected 200")
        cookies = SimpleCookie()
        for line in headers.splitlines():
            if line.lower().startswith('set-cookie:'):
                cookies.load(line.split(':', 1)[1].strip())
        expect('wmc-auth' in cookies, 'Login did not return a session cookie')
        self.cookie = 'wmc-auth=' + cookies['wmc-auth'].value


def expect(ok, message):
    if not ok:
        raise SafeFailure(message)


def json_response(client, route, payload=None, authenticated=False, expected=200):
    status, _, body = client.request(route, payload, authenticated)
    expect(status == expected, f"{route}: status {status}, expected {expected}")
    try:
        return json.loads(body)
    except json.JSONDecodeError as error:
        raise SafeFailure(f"{route}: invalid JSON response") from error


RETRY_SECONDS = 100
RETRY_INTERVAL = 2


def catalogue_snapshot(client, deadline=None):
    """Return only a server-verified catalogue; stale or seed data is inconclusive."""
    deadline = deadline if deadline is not None else time.monotonic() + RETRY_SECONDS
    while time.monotonic() < deadline:
        status, headers, body = client.request('/api/riddims', authenticated=True)
        if status == 200:
            # A plain 200 was previously observed serving stale content. Never
            # infer cleanup from it unless the updated route verifies the ETag.
            verified = re.search(r'^x-wmc-catalogue-consistency:\s*verified\s*$',
                                 headers, re.IGNORECASE | re.MULTILINE)
            if verified:
                try:
                    data = json.loads(body)
                except json.JSONDecodeError:
                    raise SafeFailure('Catalogue response is not valid JSON') from None
                expect(isinstance(data, list), 'Catalogue response is not a list')
                return data
            # The first authenticated request can initialize the store. Allow
            # an explicit initialized/seed state, but no unlabelled 200.
            initial = re.search(r'^x-wmc-catalogue-consistency:\s*(?:seed|initialized)\s*$',
                                headers, re.IGNORECASE | re.MULTILINE)
            expect(initial is not None, 'Catalogue response lacks the required consistency proof')
        else:
            expect(status in (409, 503), f'Catalogue status {status}, expected 200, 409 or 503')
        time.sleep(RETRY_INTERVAL)
    raise SafeFailure('Timed out waiting for a verified catalogue; state is unknown')


def mutate_and_reconcile(client, payload, riddim_id, marker, expected_state):
    """Retry ambiguous writes only after a verified read establishes their result."""
    deadline = time.monotonic() + RETRY_SECONDS
    while time.monotonic() < deadline:
        try:
            status, _, _ = client.request('/api/riddims', payload, authenticated=True)
        except SafeFailure:
            # A lost response can follow a successful write. Reconcile first.
            status = None
        if status is not None:
            expect(status in (200, 409, 503), f'Catalogue write returned unexpected status {status}')
        found = find_marked(catalogue_snapshot(client, deadline), riddim_id, marker)
        expect(len(found) <= 1, 'Multiple test markers found; manual cleanup required')
        if expected_state(found):
            return found
        if status == 200:
            # Acknowledged write followed by a verified contradictory read is a
            # failure, never silently duplicate or repeat the operation.
            raise SafeFailure('Acknowledged catalogue write was not reflected in a verified read')
        time.sleep(RETRY_INTERVAL)
    raise SafeFailure('Timed out reconciling catalogue write; state is unknown')


def find_marked(data, riddim_id, marker):
    row = next((r for r in data if r.get('id') == riddim_id), None)
    expect(row is not None, 'Selected riddim was not found')
    return [v for v in row.get('voicings', []) if v.get('artist') == marker]


def wait_for_page(client, path, marker, present):
    deadline = time.monotonic() + RETRY_SECONDS
    while time.monotonic() < deadline:
        status, _, html = client.request(path)
        if status == 200 and ((marker in html) == present):
            return
        time.sleep(RETRY_INTERVAL)
    raise SafeFailure(f"Page did not reflect test marker {'presence' if present else 'removal'}")


def main():
    parser = argparse.ArgumentParser(description='Test an independently verified isolated WMC Preview')
    parser.add_argument('--deployment', required=True, help='Unique Preview deployment URL, not production')
    parser.add_argument('--confirm-isolated-store', action='store_true', required=True,
                        help='Confirm the deployment-to-Blob mapping was verified independently')
    parser.add_argument('--oidc-env-file', default='.env.local',
                        help='Existing file containing only the key to be read: VERCEL_OIDC_TOKEN')
    parser.add_argument('--riddim-id', type=int, default=1)
    args = parser.parse_args()
    if args.riddim_id <= 0:
        parser.error('riddim-id must be positive')
    base = validate_url(args.deployment)
    try:
        credentials = json.loads(sys.stdin.readline())
        username, password = credentials['username'], credentials['password']
        if not isinstance(username, str) or not isinstance(password, str) or not username or not password:
            raise ValueError('Empty credentials')
    except (ValueError, KeyError, TypeError, json.JSONDecodeError):
        raise SafeFailure('Expected username and password as a JSON object on stdin') from None

    client = PreviewClient(base, read_oidc_token(args.oidc_env_file))
    marker = 'wmc-preview-check-' + uuid.uuid4().hex
    page = f'/fr/riddim/{args.riddim_id}'
    possibly_added = False
    failure = None
    try:
        expect(client.request('/fr/audit')[0] in (302, 303, 307, 308), 'Anonymous audit was not redirected')
        expect(client.request('/api/riddims', {'action': 'add-voicing'})[0] == 401, 'Anonymous write was not rejected')
        client.login(username, password)
        username = password = None
        credentials.clear()
        expect(json_response(client, '/api/auth', {'action': 'check'}, True).get('authenticated') is True, 'Session check failed')
        first = catalogue_snapshot(client)
        second = catalogue_snapshot(client)
        expect(find_marked(first, args.riddim_id, marker) == [], 'Test marker already exists')
        ids1 = [v.get('id') for v in next(r for r in first if r.get('id') == args.riddim_id)['voicings']]
        ids2 = [v.get('id') for v in next(r for r in second if r.get('id') == args.riddim_id)['voicings']]
        expect(ids1 == ids2 and all(ids1), 'Existing voicing IDs are not stable')
        wait_for_page(client, page, marker, False)
        # Assume a write may have happened even if the HTTP response is lost.
        possibly_added = True
        found = mutate_and_reconcile(client, {'action': 'add-voicing', 'riddimId': args.riddim_id,
                                     'artist': marker, 'title': 'Preview smoke test', 'views': 999999999999},
                                     args.riddim_id, marker, lambda rows: len(rows) == 1)
        voicing_id = found[0].get('id')
        expect(isinstance(voicing_id, str) and voicing_id, 'Added voicing ID missing')
        wait_for_page(client, page, marker, True)
        mutate_and_reconcile(client, {'action': 'edit-voicing', 'riddimId': args.riddim_id,
                             'voicingId': voicing_id, 'artist': marker, 'title': 'Preview smoke test edited',
                             'views': 999999999998}, args.riddim_id, marker,
                             lambda rows: len(rows) == 1 and rows[0].get('id') == voicing_id
                             and rows[0].get('title') == 'Preview smoke test edited')
    except Exception as error:
        failure = error
    finally:
        if possibly_added:
            try:
                found = find_marked(catalogue_snapshot(client), args.riddim_id, marker)
                expect(len(found) <= 1, 'Multiple test markers found; manual cleanup required')
                if found:
                    cleanup_id = found[0].get('id')
                    expect(isinstance(cleanup_id, str) and cleanup_id, 'Test marker ID missing; manual cleanup required')
                    mutate_and_reconcile(client, {'action': 'delete-voicing', 'riddimId': args.riddim_id,
                                         'voicingId': cleanup_id}, args.riddim_id, marker, lambda rows: not rows)
                expect(not find_marked(catalogue_snapshot(client), args.riddim_id, marker),
                       'Test marker still exists in the catalog')
                wait_for_page(client, page, marker, False)
                print('PASS: test marker removed and page refreshed')
            except Exception as error:
                print(f'FAIL: cleanup requires attention ({type(error).__name__})', file=sys.stderr)
                failure = failure or error
        if client.cookie:
            try:
                client.request('/api/auth', {'action': 'logout'}, True)
            except Exception:
                pass
    if failure:
        # Never display server bodies, cookies, credentials, or stderr.
        if isinstance(failure, SafeFailure):
            raise failure from None
        raise SafeFailure(f'Test failed ({type(failure).__name__})') from None
    print('PASS: anonymous protection, login, stable IDs, add/edit/delete and page invalidation')


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        message = str(error) if isinstance(error, SafeFailure) else type(error).__name__
        print(f'FAIL: {message}', file=sys.stderr)
        sys.exit(1)
