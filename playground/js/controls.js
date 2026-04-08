/**
 * Playground Controls Engine
 * Handles Navigation, Theme Switching, States, and Grid Overlays
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Grid Overlay Toggle
    const gridBtn = document.getElementById('toggle-grid');
    const gridOverlay = document.getElementById('grid-overlay');

    gridBtn.addEventListener('click', () => {
        gridOverlay.classList.toggle('active');
        gridBtn.classList.toggle('text-neon-primary');
        gridBtn.classList.toggle('border-neon-primary/40');
    });

    // 2. Theme Switching (Dynamic Accent Colors)
    const themeBtn = document.getElementById('theme-switch');
    const themes = ['default', 'purple', 'emerald', 'orange', 'rose'];
    let currentThemeIndex = 0;

    // Retrieve from localStorage if exists
    const savedTheme = localStorage.getItem('liquid-theme');
    if (savedTheme && themes.includes(savedTheme)) {
        currentThemeIndex = themes.indexOf(savedTheme);
        if (savedTheme !== 'default') {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }

    themeBtn.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const nextTheme = themes[currentThemeIndex];
        
        if (nextTheme === 'default') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', nextTheme);
        }
        
        localStorage.setItem('liquid-theme', nextTheme);
        
        // Brief visual flash to acknowledge
        themeBtn.classList.add('text-neon-primary');
        setTimeout(() => themeBtn.classList.remove('text-neon-primary'), 300);
    });

    // 2.5 Day/Night Mode Toggle
    const modeBtn = document.getElementById('mode-switch');
    const modeIcon = modeBtn.querySelector('.mode-icon');
    const modeText = modeBtn.querySelector('.mode-text');
    
    const MOON_PATH = 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z';
    const SUN_PATH = 'M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z';

    const savedMode = localStorage.getItem('liquid-daylight');
    if (savedMode === 'light') {
        document.documentElement.setAttribute('data-mode', 'light');
        modeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${SUN_PATH}" />`;
        modeText.textContent = 'DAY';
    }

    modeBtn.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-mode') === 'light';
        if (isLight) {
            document.documentElement.removeAttribute('data-mode');
            localStorage.setItem('liquid-daylight', 'dark');
            modeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${MOON_PATH}" />`;
            modeText.textContent = 'NIGHT';
        } else {
            document.documentElement.setAttribute('data-mode', 'light');
            localStorage.setItem('liquid-daylight', 'light');
            modeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${SUN_PATH}" />`;
            modeText.textContent = 'DAY';
        }
    });

    // 2b. Sidebar Toggle & Persistence
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const body = document.body;

    if (localStorage.getItem('sidebar-collapsed') === 'true') {
        body.classList.add('sidebar-collapsed');
    }

    sidebarToggle.addEventListener('click', () => {
        body.classList.toggle('sidebar-collapsed');
        localStorage.setItem('sidebar-collapsed', body.classList.contains('sidebar-collapsed'));
    });

    // 2c. Topbar Scroll Effect
    const stageHeader = document.querySelector('.stage-toolbar');
    window.addEventListener('scroll', () => {
       if (window.scrollY > 10) {
           stageHeader.classList.add('scrolled');
       } else {
           stageHeader.classList.remove('scrolled');
       }
    });

    // 3. Navigation Handling (Dynamic Loading)
    const navLinks = document.querySelectorAll('.nav-link');
    const pageTitle = document.getElementById('current-page-title');
    const viewport = document.getElementById('content-viewport');
    
    // Cache the welcome section
    const welcomeSection = document.getElementById('welcome-section').outerHTML;

    async function navigate(hash) {
        if (!hash || hash === '#welcome') {
            viewport.innerHTML = '<div id="grid-overlay"></div>' + welcomeSection;
            return;
        }

        const pageName = hash.replace('#', '');
        const url = `pages/${pageName}.html`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Page not found');
            
            const html = await response.text();

            // Extract scripts from the HTML string before injection
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const scripts = doc.querySelectorAll('script');
            
            // Inject content
            viewport.innerHTML = '<div id="grid-overlay"></div>' + html;
            
            // Execute scripts manually
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                document.body.appendChild(newScript);
                // Clean up to prevent DOM bloat
                newScript.parentNode.removeChild(newScript);
            });
            
            // Reinstate grid overlay if active
            const overlay = document.getElementById('grid-overlay');
            if (gridBtn.classList.contains('text-neon-primary')) {
                overlay.classList.add('active');
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error('Navigation Error:', err);
            viewport.innerHTML = `
                <div class="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                    <div class="glass-1 p-10 rounded-2xl text-center">
                        <h3 class="text-xl font-bold text-red-400">Section Under Construction</h3>
                        <p class="text-white/40 mt-2">The "${pageName}" module has not been implemented yet.</p>
                        <a href="#welcome" class="mt-6 inline-block text-xs font-bold text-neon-primary uppercase tracking-widest hover:underline">Return Home</a>
                    </div>
                </div>
            `;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const hash = link.getAttribute('href');
            
            // Soft update Active Link UI
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update Header Title
            const category = link.parentElement.querySelector('h2').textContent;
            pageTitle.textContent = `${category} / ${link.textContent}`;

            navigate(hash);
        });
    });

    // Check for initial hash
    if (window.location.hash) {
        navigate(window.location.hash);
        // Find link and set active
        const activeLink = document.querySelector(`.nav-link[href="${window.location.hash}"]`);
        if (activeLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        }
    }

});
