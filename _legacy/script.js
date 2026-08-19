// Explorer page script with i18n
let riddims = [];
let filteredRiddims = [];

const t = getT();

// Init UI text
document.title = `${t.navExplorer} - ${t.siteTitle}`;
document.querySelector('meta[name="description"]').content = t.metaDescExplorer;
document.getElementById('tagline').textContent = t.taglineExplorer;
document.getElementById('mainNav').innerHTML = `
    <a href="index.html" class="nav-link">${t.navHome}</a>
    <a href="explorer.html" class="nav-link active">${t.navExplorer}</a>
    ${buildLangSwitcher()}
`;
document.getElementById('footer').innerHTML = `
    <p>&copy; 2026 ${t.siteTitle} &mdash; ${t.footerText}</p>
    <p class="footer-note">${t.footerNote}</p>
`;

// Build controls
document.getElementById('controls').innerHTML = `
    <div class="search-bar">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" id="searchInput" placeholder="${t.searchPlaceholder}">
    </div>
    <div class="filters">
        <div class="filter-group">
            <label for="genreFilter">${t.filterGenre}</label>
            <select id="genreFilter">
                <option value="">${t.filterAll}</option>
                <option value="reggae">${t.genreReggae}</option>
                <option value="dancehall">${t.genreDancehall}</option>
                <option value="lovers rock">${t.genreLovers}</option>
                <option value="soca">${t.genreSoca}</option>
            </select>
        </div>
        <div class="filter-group">
            <label for="typeFilter">${t.filterType}</label>
            <select id="typeFilter">
                <option value="">${t.filterAll}</option>
                <option value="classique">${t.typeClassique}</option>
                <option value="ragga">${t.typeRagga}</option>
                <option value="digital">${t.typeDigital}</option>
            </select>
        </div>
        <div class="filter-group">
            <label for="decadeFilter">${t.filterDecade}</label>
            <select id="decadeFilter">
                <option value="">${t.filterAllFem}</option>
                <option value="1960">${t.decade1960}</option>
                <option value="1970">${t.decade1970}</option>
                <option value="1980">${t.decade1980}</option>
                <option value="1990">${t.decade1990}</option>
                <option value="2000">${t.decade2000}</option>
                <option value="2010">${t.decade2010}</option>
            </select>
        </div>
        <div class="filter-group">
            <label for="sortBy">${t.filterSort}</label>
            <select id="sortBy">
                <option value="views">${t.sortViews}</option>
                <option value="name">${t.sortName}</option>
                <option value="year">${t.sortYear}</option>
                <option value="voicings">${t.sortVoicings}</option>
            </select>
        </div>
    </div>
`;

async function loadRiddims() {
    const response = await fetch('../data/riddims.json');
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

function translateType(type) {
    const map = { classique: t.typeClassique, ragga: t.typeRagga, digital: t.typeDigital };
    return map[type] || type;
}

function translateGenre(genre) {
    const map = { reggae: t.genreReggae, dancehall: t.genreDancehall, 'lovers rock': t.genreLovers, soca: t.genreSoca };
    return map[genre] || genre;
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
            <span class="stat-label">${t.statsRiddimsShort}</span>
        </div>
        <div class="stat">
            <span class="stat-value">${totalVoicings}</span>
            <span class="stat-label">${t.statsVoicingsShort}</span>
        </div>
        <div class="stat">
            <span class="stat-value">${formatViews(totalViews)}</span>
            <span class="stat-label">${t.statsViewsShort}</span>
        </div>
        <div class="stat">
            <span class="stat-value">${genres.size}</span>
            <span class="stat-label">${t.statsGenresShort}</span>
        </div>
    `;
}

function renderGrid() {
    const container = document.getElementById('riddimGrid');

    if (filteredRiddims.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>${t.noResults}</h3>
                <p>${t.noResultsHint}</p>
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
                    <span class="tag tag-genre">${translateGenre(riddim.genre)}</span>
                    <span class="tag tag-type">${translateType(riddim.type)}</span>
                    ${riddim.bpm ? `<span class="tag tag-bpm">${riddim.bpm} BPM</span>` : ''}
                </div>
                <div class="tile-artists">
                    ${topArtists.map(a => `<span class="tile-artist">${a}</span>`).join('')}
                </div>
                <div class="tile-footer">
                    <span class="tile-views">${formatViews(totalViews)} ${t.views}</span>
                    <span class="tile-voicings">${riddim.voicings.length} ${t.voicings}</span>
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

// Share button
buildShareButton();

// Init
loadRiddims();
