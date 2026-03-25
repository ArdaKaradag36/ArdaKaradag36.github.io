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
        'anasayfa.html':    'index.html',
        'index.html':       'anasayfa.html',
        'hakkimda.html':    'about.html',
        'about.html':       'hakkimda.html',
        'calismalarim.html':'projects.html',
        'projects.html':    'calismalarim.html',
        'sertifikalar.html':'certificates.html',
        'certificates.html':'sertifikalar.html',
        'deneyim.html':     'experience.html',
        'experience.html':  'deneyim.html',
        'iletisim.html':    'contact.html',
        'contact.html':     'iletisim.html',
    };

    const trPages = new Set([
        'anasayfa.html', 'hakkimda.html', 'calismalarim.html',
        'sertifikalar.html', 'deneyim.html', 'iletisim.html'
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
