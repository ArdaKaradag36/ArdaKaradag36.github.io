function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
        return saved;
    }

    const systemPrefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (systemPrefersDark) {
        return 'dark';
    }

    return 'light';
}

function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function initTheme() {
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
    });
}

