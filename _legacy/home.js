// Home page script with i18n
(function() {
    const t = getT();

    // Meta
    document.title = `${t.siteTitle} - ${t.taglineHome}`;
    document.querySelector('meta[name="description"]').content = t.metaDescHome;

    // Tagline
    document.getElementById('tagline').textContent = t.taglineHome;

    // Nav
    document.getElementById('mainNav').innerHTML = `
        <a href="index.html" class="nav-link active">${t.navHome}</a>
        <a href="explorer.html" class="nav-link">${t.navExplorer}</a>
        ${buildLangSwitcher()}
    `;

    // Hero
    document.getElementById('heroSection').innerHTML = `
        <h2 class="hero-title">${t.heroTitle1}<br>${t.heroTitle2}<br><span>${t.heroTitle3}</span></h2>
        <p class="hero-text">${t.heroText}</p>
        <a href="explorer.html" class="cta-button">
            ${t.ctaExplore}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        </a>
    `;

    // What is a riddim
    document.getElementById('whatSection').innerHTML = `
        <h2 class="section-title">${t.whatTitle}</h2>
        <div class="content-grid">
            <div class="content-block">
                <p>${t.whatP1}</p>
                <p>${t.whatP2}</p>
            </div>
            <div class="content-block">
                <p>${t.whatP3}</p>
                <p>${t.whatP4}</p>
            </div>
        </div>
    `;

    // Genres
    document.getElementById('genresSection').innerHTML = `
        <h2 class="section-title">${t.genresTitle}</h2>
        <div class="genre-grid">
            <div class="genre-card">
                <div class="genre-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
                        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                    </svg>
                </div>
                <h3>${t.genreReggae}</h3>
                <p>${t.genreReggaeDesc}</p>
            </div>
            <div class="genre-card">
                <div class="genre-icon genre-icon-dancehall">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
                        <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13"/>
                    </svg>
                </div>
                <h3>${t.genreDancehall}</h3>
                <p>${t.genreDancehallDesc}</p>
            </div>
            <div class="genre-card">
                <div class="genre-icon genre-icon-lovers">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </div>
                <h3>${t.genreLovers}</h3>
                <p>${t.genreLoversDesc}</p>
            </div>
            <div class="genre-card">
                <div class="genre-icon genre-icon-soca">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                </div>
                <h3>${t.genreSoca}</h3>
                <p>${t.genreSocaDesc}</p>
            </div>
        </div>
    `;

    // How to
    document.getElementById('howSection').innerHTML = `
        <h2 class="section-title">${t.howTitle}</h2>
        <div class="steps-grid">
            <div class="step-card">
                <div class="step-number">1</div>
                <h3>${t.howStep1Title}</h3>
                <p>${t.howStep1Desc}</p>
            </div>
            <div class="step-card">
                <div class="step-number">2</div>
                <h3>${t.howStep2Title}</h3>
                <p>${t.howStep2Desc}</p>
            </div>
            <div class="step-card">
                <div class="step-number">3</div>
                <h3>${t.howStep3Title}</h3>
                <p>${t.howStep3Desc}</p>
            </div>
        </div>
    `;

    // CTA
    document.getElementById('ctaSection').innerHTML = `
        <h2>${t.ctaReadyTitle}</h2>
        <p>${t.ctaReadyText}</p>
        <a href="explorer.html" class="cta-button">
            ${t.ctaAccess}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        </a>
    `;

    // Footer
    document.getElementById('footer').innerHTML = `
        <p>&copy; 2026 ${t.siteTitle} &mdash; ${t.footerText}</p>
        <p class="footer-note">${t.footerNote}</p>
    `;

    // Share button
    buildShareButton();

    // Load stats
    loadHomeStats();

    async function loadHomeStats() {
        const response = await fetch('../data/riddims.json');
        const riddims = await response.json();
        const totalRiddims = riddims.length;
        const totalVoicings = riddims.reduce((s, r) => s + r.voicings.length, 0);
        const totalViews = riddims.reduce((s, r) => s + r.voicings.reduce((vs, v) => vs + v.views, 0), 0);
        const genres = new Set(riddims.map(r => r.genre));
        const decades = new Set(riddims.map(r => Math.floor(r.year / 10) * 10 + 's'));

        function formatViews(n) {
            if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
            if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
            if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
            return n.toString();
        }

        document.getElementById('homeStats').innerHTML = `
            <div class="home-stat">
                <span class="home-stat-value">${totalRiddims}</span>
                <span class="home-stat-label">${t.statsRiddims}</span>
            </div>
            <div class="home-stat">
                <span class="home-stat-value">${totalVoicings}</span>
                <span class="home-stat-label">${t.statsVoicings}</span>
            </div>
            <div class="home-stat">
                <span class="home-stat-value">${formatViews(totalViews)}</span>
                <span class="home-stat-label">${t.statsViews}</span>
            </div>
            <div class="home-stat">
                <span class="home-stat-value">${genres.size}</span>
                <span class="home-stat-label">${t.statsGenres}</span>
            </div>
            <div class="home-stat">
                <span class="home-stat-value">${decades.size}</span>
                <span class="home-stat-label">${t.statsDecades}</span>
            </div>
        `;
    }
})();
