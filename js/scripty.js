document.addEventListener('DOMContentLoaded', () => {
    // Parallax background
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const bg = document.querySelector('.bg-animation');
        if (bg) {
            bg.style.transform = `translate(-${x * 20}px, -${y * 20}px) scale(1.1)`;
        }
    });

    // TR / EN language switcher
    const langMap = {
        'index.html':       'home.html',
        'home.html':        'index.html',
        'hakkimda.html':    'about.html',
        'about.html':       'hakkimda.html',
        'calismalarim.html':'projects.html',
        'projects.html':    'calismalarim.html',
        'sertifikalar.html':'certificates.html',
        'certificates.html':'sertifikalar.html',
        'deneyim.html':     'experience.html',
        'experience.html':  'deneyim.html',
        'yapayzeka.html':   'ai.html',
        'ai.html':          'yapayzeka.html',
        'iletisim.html':    'contact.html',
        'contact.html':     'iletisim.html',
    };

    const trPages = new Set([
        'index.html', 'hakkimda.html', 'calismalarim.html',
        'sertifikalar.html', 'deneyim.html', 'yapayzeka.html', 'iletisim.html'
    ]);

    const page = window.location.pathname.split('/').pop() || 'index.html';
    const isTr = trPages.has(page);
    const otherPage = langMap[page] || page;

    const switcher = document.createElement('div');
    switcher.className = 'lang-switcher';
    switcher.innerHTML =
        `<a href="${isTr ? page : otherPage}" class="lang-btn${isTr ? ' lang-active' : ''}">TR</a>` +
        `<a href="${isTr ? otherPage : page}" class="lang-btn${!isTr ? ' lang-active' : ''}">EN</a>`;
    document.body.appendChild(switcher);

    // Yukarı çık — tüm sayfalar (SVG ok: FA yüklenmese de görünür)
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.type = 'button';
    scrollTopBtn.className = 'scroll-to-top';
    const topLabel = isTr ? 'Sayfanın başına dön' : 'Back to top';
    scrollTopBtn.setAttribute('aria-label', topLabel);
    scrollTopBtn.setAttribute('title', topLabel);
    scrollTopBtn.innerHTML =
        '<svg class="scroll-to-top-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(scrollTopBtn);

    const getScrollY = () =>
        window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;

    const toggleScrollTopBtn = () => {
        if (getScrollY() > 200) {
            scrollTopBtn.classList.add('scroll-to-top--visible');
        } else {
            scrollTopBtn.classList.remove('scroll-to-top--visible');
        }
    };
    window.addEventListener('scroll', toggleScrollTopBtn, { passive: true });
    toggleScrollTopBtn();

    scrollTopBtn.addEventListener('click', () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    // Modal — sadece bu sayfada modal varsa dinleyici ekle
    const modal = document.getElementById('imageModal');
    if (modal) {
        document.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeModal();
        });
    }
});

// Modal functions (onclick attribute'larından global erişim için dışarıda kalmalı)
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    if (modal && modalImg) {
        modal.style.display = 'flex';
        modalImg.src = imageSrc;
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}
