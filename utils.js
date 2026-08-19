// Shared helpers used by home.js, script.js and riddim.js (requires i18n.js)

function formatViews(n) {
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return n.toString();
}

function getTotalViews(riddim) {
    return riddim.voicings.reduce((sum, v) => sum + v.views, 0);
}

function translateType(type) {
    const t = getT();
    const map = { classique: t.typeClassique, ragga: t.typeRagga, digital: t.typeDigital };
    return map[type] || type;
}

function translateGenre(genre) {
    const t = getT();
    const map = { reggae: t.genreReggae, dancehall: t.genreDancehall, 'lovers rock': t.genreLovers };
    return map[genre] || genre;
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
