// Riddim detail page with i18n
const t = getT();

// Nav
document.getElementById('mainNav').innerHTML = `
    <a href="index.html" class="nav-link">${t.navHome}</a>
    <a href="explorer.html" class="nav-link">${t.navExplorer}</a>
    ${buildLangSwitcher()}
`;

// Back link
document.getElementById('backText').textContent = t.backToCatalog;

// Footer
document.getElementById('footer').innerHTML = `
    <p>&copy; 2026 ${t.siteTitle} &mdash; ${t.footerText}</p>
    <p class="footer-note">${t.footerNote}</p>
`;

async function loadRiddim() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    if (!id) {
        window.location.href = 'explorer.html';
        return;
    }

    const response = await fetch('../data/riddims.json');
    const riddims = await response.json();
    const riddim = riddims.find(r => r.id === id);

    if (!riddim) {
        document.getElementById('riddimDetail').innerHTML = `
            <div class="no-results">
                <h3>${t.riddimNotFound}</h3>
                <p><a href="index.html" style="color: var(--gold);">${t.backToHome}</a></p>
            </div>
        `;
        return;
    }

    document.title = `${riddim.name} - ${t.siteTitle}`;
    document.querySelector('meta[name="description"]').content = t.metaDescRiddim;
    renderRiddimPage(riddim);
}

function formatViews(n) {
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return n.toString();
}

function getTotalViews(riddim) {
    return riddim.voicings.reduce((sum, v) => sum + v.views, 0);
}

function getYoutubeSearchUrl(artist, title) {
    const query = encodeURIComponent(`${artist} - ${title}`);
    return `https://www.youtube.com/results?search_query=${query}`;
}

function translateType(type) {
    const map = { classique: t.typeClassique, ragga: t.typeRagga, digital: t.typeDigital };
    return map[type] || type;
}

function translateGenre(genre) {
    const map = { reggae: t.genreReggae, dancehall: t.genreDancehall, 'lovers rock': t.genreLovers, soca: t.genreSoca };
    return map[genre] || genre;
}

function renderRiddimPage(riddim) {
    const totalViews = getTotalViews(riddim);
    const sortedVoicings = [...riddim.voicings].sort((a, b) => b.views - a.views);
    const maxViews = sortedVoicings[0]?.views || 1;

    document.getElementById('riddimDetail').innerHTML = `
        <div class="riddim-page">
            <div class="riddim-page-header">
                <div class="riddim-page-title-section">
                    <h1 class="riddim-page-name">${riddim.name}</h1>
                    <div class="riddim-page-meta">
                        <span class="riddim-page-producer">${riddim.producer}</span>
                        <span class="separator">&bull;</span>
                        <span>${riddim.label}</span>
                    </div>
                </div>
                <div class="riddim-page-stats">
                    <div class="riddim-page-stat">
                        <span class="stat-value">${formatViews(totalViews)}</span>
                        <span class="stat-label">${t.totalViews}</span>
                    </div>
                    <div class="riddim-page-stat">
                        <span class="stat-value">${riddim.voicings.length}</span>
                        <span class="stat-label">${t.voicingsTitle}</span>
                    </div>
                    <div class="riddim-page-stat">
                        <span class="stat-value">${riddim.year}</span>
                        <span class="stat-label">${t.year}</span>
                    </div>
                    ${riddim.bpm ? `
                    <div class="riddim-page-stat">
                        <span class="stat-value">${riddim.bpm}</span>
                        <span class="stat-label">BPM</span>
                    </div>` : ''}
                </div>
            </div>

            <div class="riddim-page-tags">
                <span class="tag tag-genre">${translateGenre(riddim.genre)}</span>
                <span class="tag tag-type">${translateType(riddim.type)}</span>
                <span class="tag tag-year">${riddim.year}</span>
                ${riddim.bpm ? `<span class="tag tag-bpm">${riddim.bpm} BPM</span>` : ''}
            </div>

            <p class="riddim-page-description">${riddim.description}</p>

            <div class="riddim-page-voicings">
                <h2 class="voicings-heading">${t.voicingsTitle} <span class="voicings-count">${riddim.voicings.length}</span></h2>
                <div class="voicings-table">
                    ${sortedVoicings.map((v, i) => {
                        const pct = (v.views / maxViews * 100).toFixed(1);
                        const rankClass = i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : '';
                        const ytUrl = getYoutubeSearchUrl(v.artist, v.title);
                        return `
                            <div class="voicing-row">
                                <span class="voicing-rank ${rankClass}">${i + 1}</span>
                                <div class="voicing-details">
                                    <div class="voicing-title">${v.title}</div>
                                    <div class="voicing-artist">${v.artist}</div>
                                </div>
                                <div class="voicing-bar-container">
                                    <div class="voicing-bar" style="width: ${pct}%"></div>
                                </div>
                                <span class="voicing-views">${formatViews(v.views)}</span>
                                <a href="${ytUrl}" target="_blank" rel="noopener noreferrer" class="yt-link" title="${t.listenOnYt}">
                                    <svg class="yt-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.7 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.7-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
                                </a>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
}

loadRiddim();
