let riddims = [];
let filteredRiddims = [];

async function loadRiddims() {
    const response = await fetch('data/riddims.json');
    riddims = await response.json();
    applyFilters();
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

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text, query) {
    if (!query) return text;
    const escaped = escapeRegex(query);
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function applyFilters() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const genre = document.getElementById('genreFilter').value;
    const type = document.getElementById('typeFilter').value;
    const decade = document.getElementById('decadeFilter').value;
    const sortBy = document.getElementById('sortBy').value;

    filteredRiddims = riddims.filter(r => {
        if (genre && r.genre !== genre) return false;
        if (type && r.type !== type) return false;
        if (decade) {
            const d = parseInt(decade);
            if (r.year < d || r.year >= d + 10) return false;
        }
        if (query) {
            const inName = r.name.toLowerCase().includes(query);
            const inProducer = r.producer.toLowerCase().includes(query);
            const inLabel = r.label.toLowerCase().includes(query);
            const inVoicings = r.voicings.some(v =>
                v.artist.toLowerCase().includes(query) ||
                v.title.toLowerCase().includes(query)
            );
            if (!inName && !inProducer && !inLabel && !inVoicings) return false;
        }
        return true;
    });

    filteredRiddims.sort((a, b) => {
        switch (sortBy) {
            case 'views': return getTotalViews(b) - getTotalViews(a);
            case 'name': return a.name.localeCompare(b.name);
            case 'year': return b.year - a.year;
            case 'voicings': return b.voicings.length - a.voicings.length;
            default: return 0;
        }
    });

    renderStats();
    renderRiddims(query);
}

function renderStats() {
    const totalRiddims = filteredRiddims.length;
    const totalVoicings = filteredRiddims.reduce((s, r) => s + r.voicings.length, 0);
    const totalViews = filteredRiddims.reduce((s, r) => s + getTotalViews(r), 0);
    const genres = new Set(filteredRiddims.map(r => r.genre));

    document.getElementById('statsBar').innerHTML = `
        <div class="stat">
            <span class="stat-value">${totalRiddims}</span>
            <span class="stat-label">Riddims</span>
        </div>
        <div class="stat">
            <span class="stat-value">${totalVoicings}</span>
            <span class="stat-label">Voicings</span>
        </div>
        <div class="stat">
            <span class="stat-value">${formatViews(totalViews)}</span>
            <span class="stat-label">Vues totales</span>
        </div>
        <div class="stat">
            <span class="stat-value">${genres.size}</span>
            <span class="stat-label">Genres</span>
        </div>
    `;
}

function renderRiddims(query) {
    const container = document.getElementById('riddimList');

    if (filteredRiddims.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>Aucun riddim trouvé</h3>
                <p>Essaye de modifier tes filtres ou ta recherche.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredRiddims.map(riddim => {
        const totalViews = getTotalViews(riddim);
        const sortedVoicings = [...riddim.voicings].sort((a, b) => b.views - a.views);
        const maxViews = sortedVoicings[0]?.views || 1;
        const cardId = `riddim-${riddim.id}`;

        return `
            <article class="riddim-card" id="${cardId}">
                <div class="riddim-header" onclick="toggleVoicings('${cardId}')">
                    <div class="riddim-info">
                        <h2 class="riddim-name">${highlightText(riddim.name, query)}</h2>
                        <div class="riddim-meta">
                            <span>${highlightText(riddim.producer, query)}</span>
                            <span class="separator">&bull;</span>
                            <span>${riddim.label}</span>
                        </div>
                    </div>
                    <div class="riddim-stats">
                        <div class="riddim-total-views">${formatViews(totalViews)} vues</div>
                        <div class="riddim-voicing-count">${riddim.voicings.length} voicings</div>
                    </div>
                </div>
                <div class="riddim-tags">
                    <span class="tag tag-genre">${riddim.genre}</span>
                    <span class="tag tag-type">${riddim.type}</span>
                    <span class="tag tag-year">${riddim.year}</span>
                    ${riddim.bpm ? `<span class="tag tag-bpm">${riddim.bpm} BPM</span>` : ''}
                </div>
                <p class="riddim-description">${riddim.description}</p>
                <div class="voicings-section">
                    <button class="voicings-toggle" onclick="toggleVoicings('${cardId}')">
                        <span>Voir les voicings</span>
                        <span class="arrow" id="arrow-${cardId}">&#9660;</span>
                    </button>
                    <div class="voicings-list" id="voicings-${cardId}">
                        ${sortedVoicings.map((v, i) => {
                            const pct = (v.views / maxViews * 100).toFixed(1);
                            const rankClass = i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : '';
                            return `
                                <div class="voicing-row">
                                    <span class="voicing-rank ${rankClass}">${i + 1}</span>
                                    <div class="voicing-details">
                                        <div class="voicing-title">${highlightText(v.title, query)}</div>
                                        <div class="voicing-artist">${highlightText(v.artist, query)}</div>
                                    </div>
                                    <div class="voicing-bar-container">
                                        <div class="voicing-bar" style="width: ${pct}%"></div>
                                    </div>
                                    <span class="voicing-views">${formatViews(v.views)}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function toggleVoicings(cardId) {
    const list = document.getElementById(`voicings-${cardId}`);
    const arrow = document.getElementById(`arrow-${cardId}`);
    const toggle = list.previousElementSibling;

    list.classList.toggle('open');
    arrow.classList.toggle('open');

    if (list.classList.contains('open')) {
        toggle.querySelector('span:first-child').textContent = 'Masquer les voicings';
    } else {
        toggle.querySelector('span:first-child').textContent = 'Voir les voicings';
    }
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('genreFilter').addEventListener('change', applyFilters);
document.getElementById('typeFilter').addEventListener('change', applyFilters);
document.getElementById('decadeFilter').addEventListener('change', applyFilters);
document.getElementById('sortBy').addEventListener('change', applyFilters);

// Init
loadRiddims();
