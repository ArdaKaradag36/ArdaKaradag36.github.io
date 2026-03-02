document.addEventListener('DOMContentLoaded', () => {
    if (typeof initTheme === 'function') {
        initTheme();
    }
    if (typeof initLanguage === 'function') {
        initLanguage();
    }
});

