// Sayfa Yüklendiğinde Çalışacak İşlemler
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animasyonu
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
            }
        });
    }, observerOptions);

    const hiddenSections = document.querySelectorAll('.hidden-section');
    hiddenSections.forEach(el => observer.observe(el));

    // 2. Mouse Hareketiyle Arka Plan Etkileşimi
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const bg = document.querySelector('.bg-animation');
        if (bg) {
            bg.style.transform = `translate(-${x * 20}px, -${y * 20}px) scale(1.1)`;
        }
    });

});

// Modal (Popup) Fonksiyonları
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    
    if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = imageSrc;
        document.body.style.overflow = "hidden"; // Scroll'u engelle
    }
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Scroll'u geri getir
    }
}

// Modal dışına tıklayınca kapatma
window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        closeModal();
    }
}

// ESC tuşu ile modal kapatma
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});