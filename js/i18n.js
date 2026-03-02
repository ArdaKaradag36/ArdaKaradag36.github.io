const I18N_STORAGE_KEY = 'lang';
const I18N_DEFAULT_LANG = 'tr';
const I18N_CACHE = {};

function detectInitialLanguage() {
    const saved = localStorage.getItem(I18N_STORAGE_KEY);
    if (saved === 'tr' || saved === 'en') {
        return saved;
    }

    const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (navLang.startsWith('tr')) {
        return 'tr';
    }
    if (navLang.startsWith('en')) {
        return 'en';
    }

    return I18N_DEFAULT_LANG;
}

async function loadLanguage(lang) {
    try {
        const targetLang = lang === 'en' ? 'en' : 'tr';

        if (!I18N_CACHE[targetLang]) {
            const res = await fetch(`data/i18n/${targetLang}.json`, { cache: 'no-store' });
            if (!res.ok) {
                throw new Error(`Dil dosyası yüklenemedi: ${targetLang}`);
            }
            I18N_CACHE[targetLang] = await res.json();
        }

        applyTranslations(I18N_CACHE[targetLang]);
        localStorage.setItem(I18N_STORAGE_KEY, targetLang);
        document.documentElement.lang = targetLang;
    } catch (err) {
        console.error(err);
    }
}

function applyTranslations(map) {
    // Basit text içerikler
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        const value = map[key];
        if (typeof value === 'string') {
            el.textContent = value;
        }
    });

    // Placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (!key) return;
        const value = map[key];
        if (typeof value === 'string') {
            el.setAttribute('placeholder', value);
        }
    });

    // Aria-label
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
        const key = el.getAttribute('data-i18n-aria');
        if (!key) return;
        const value = map[key];
        if (typeof value === 'string') {
            el.setAttribute('aria-label', value);
        }
    });

    // HTML içeren alanlar
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.getAttribute('data-i18n-html');
        if (!key) return;
        const value = map[key];
        if (typeof value === 'string') {
            el.innerHTML = value;
        }
    });
}

function initLanguage() {
    const initialLang = detectInitialLanguage();
    loadLanguage(initialLang);

    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const current = localStorage.getItem(I18N_STORAGE_KEY) || I18N_DEFAULT_LANG;
        const next = current === 'tr' ? 'en' : 'tr';
        loadLanguage(next);
    });
}

