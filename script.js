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
    renderGrid();
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

function renderGrid() {
    const container = document.getElementById('riddimGrid');

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
        const topArtists = [...riddim.voicings]
            .sort((a, b) => b.views - a.views)
            .slice(0, 3)
            .map(v => v.artist);

        return `
            <a href="riddim.html?id=${riddim.id}" class="riddim-tile">
                <div class="tile-header">
                    <h2 class="tile-name">${riddim.name}</h2>
                    <span class="tile-year">${riddim.year}</span>
                </div>
                <div class="tile-producer">${riddim.producer}</div>
                <div class="tile-tags">
                    <span class="tag tag-genre">${riddim.genre}</span>
                    <span class="tag tag-type">${riddim.type}</span>
                    ${riddim.bpm ? `<span class="tag tag-bpm">${riddim.bpm} BPM</span>` : ''}
                </div>
                <div class="tile-artists">
                    ${topArtists.map(a => `<span class="tile-artist">${a}</span>`).join('')}
                </div>
                <div class="tile-footer">
                    <span class="tile-views">${formatViews(totalViews)} vues</span>
                    <span class="tile-voicings">${riddim.voicings.length} voicings</span>
                </div>
            </a>
        `;
    }).join('');
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('genreFilter').addEventListener('change', applyFilters);
document.getElementById('typeFilter').addEventListener('change', applyFilters);
document.getElementById('decadeFilter').addEventListener('change', applyFilters);
document.getElementById('sortBy').addEventListener('change', applyFilters);

// Init
loadRiddims();
