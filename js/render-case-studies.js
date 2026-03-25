const page = window.location.pathname.split('/').pop() || '';
const isEn = page === 'experience.html';

const jsonFile = isEn ? 'data/case-studies-en.json' : 'data/case-studies.json';

const labels = isEn ? {
    summary:        'Summary',
    problem:        'Problem Statement',
    architecture:   'System Architecture',
    implementation: 'Implementation Details',
    performance:    'Performance & Optimisation',
    engineering:    'Engineering Practices',
    demo:           'Live Demo',
    error:          'Case study content could not be loaded. Please try again later.'
} : {
    summary:        'Özet',
    problem:        'Problem Tanımı',
    architecture:   'Sistem Mimarisi',
    implementation: 'Uygulama Detayları',
    performance:    'Performans & Optimizasyon',
    engineering:    'Mühendislik Pratikleri',
    demo:           'Canlı Demo',
    error:          'Şu anda case study içeriği yüklenemiyor. Lütfen daha sonra tekrar deneyin.'
};

async function loadCaseStudies() {
    const container = document.getElementById('case-studies-root');
    if (!container) return;

    try {
        const response = await fetch(jsonFile, { cache: 'no-store' });
        if (!response.ok) throw new Error(labels.error);

        const caseStudies = await response.json();
        caseStudies.forEach((item, index) => {
            container.appendChild(createCaseStudyElement(item, index));
        });
    } catch (error) {
        console.error(error);
        container.textContent = labels.error;
    }
}

function createCaseStudyElement(data, idx) {
    const article = document.createElement('article');
    article.className = 'glass-card case-study';

    const titleId = `case-study-title-${idx}`;
    article.setAttribute('aria-labelledby', titleId);

    const header = document.createElement('header');
    header.className = 'case-study-header';

    const title = document.createElement('h2');
    title.id = titleId;
    title.className = 'case-study-title';
    title.textContent = data.title;

    const meta = document.createElement('div');
    meta.className = 'case-study-meta';

    if (data.role) {
        const roleItem = document.createElement('div');
        roleItem.className = 'case-study-meta-item';
        roleItem.innerHTML = `<i class="fas fa-user-tie" aria-hidden="true"></i><span>${data.role}</span>`;
        meta.appendChild(roleItem);
    }

    if (data.timeline) {
        const timeItem = document.createElement('div');
        timeItem.className = 'case-study-meta-item';
        timeItem.innerHTML = `<i class="fas fa-calendar-alt" aria-hidden="true"></i><span>${data.timeline}</span>`;
        meta.appendChild(timeItem);
    }

    if (Array.isArray(data.stack) && data.stack.length > 0) {
        const stackWrapper = document.createElement('div');
        stackWrapper.className = 'case-study-stack';
        data.stack.forEach((tech) => {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = tech;
            stackWrapper.appendChild(badge);
        });
        header.appendChild(stackWrapper);
    }

    header.appendChild(title);
    header.appendChild(meta);
    article.appendChild(header);

    appendSection(article, labels.summary, data.description);
    appendSection(article, labels.problem, data.problem);
    appendSection(article, labels.architecture, data.architecture);

    if (data.implementation) {
        const implWrapper = document.createElement('div');

        const implTitle = document.createElement('h3');
        implTitle.className = 'case-study-section-title';
        implTitle.textContent = labels.implementation;
        implWrapper.appendChild(implTitle);

        ['backend', 'frontend', 'database'].forEach((key) => {
            if (data.implementation[key]) {
                const subTitle = document.createElement('h4');
                subTitle.className = 'case-study-section-title';
                subTitle.style.textTransform = 'none';
                subTitle.style.opacity = '0.8';
                subTitle.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                implWrapper.appendChild(subTitle);

                const text = document.createElement('p');
                text.className = 'case-study-text';
                text.textContent = data.implementation[key];
                implWrapper.appendChild(text);
            }
        });

        article.appendChild(implWrapper);
    }

    appendSection(article, labels.performance, data.performance);
    appendSection(article, labels.engineering, data.engineering);

    const linksWrapper = document.createElement('div');
    linksWrapper.className = 'case-study-links';

    if (data.github) {
        const githubLink = document.createElement('a');
        githubLink.href = data.github;
        githubLink.target = '_blank';
        githubLink.rel = 'noopener noreferrer';
        githubLink.className = 'case-study-link';
        githubLink.innerHTML = `<i class="fab fa-github" aria-hidden="true"></i><span>GitHub</span>`;
        linksWrapper.appendChild(githubLink);
    }

    if (data.demo) {
        const demoLink = document.createElement('a');
        demoLink.href = data.demo;
        demoLink.target = '_blank';
        demoLink.rel = 'noopener noreferrer';
        demoLink.className = 'case-study-link';
        demoLink.innerHTML = `<i class="fas fa-external-link-alt" aria-hidden="true"></i><span>${labels.demo}</span>`;
        linksWrapper.appendChild(demoLink);
    }

    if (linksWrapper.children.length > 0) {
        article.appendChild(linksWrapper);
    }

    return article;
}

function appendSection(parent, label, text) {
    if (!text) return;

    const title = document.createElement('h3');
    title.className = 'case-study-section-title';
    title.textContent = label;

    const paragraph = document.createElement('p');
    paragraph.className = 'case-study-text';
    paragraph.textContent = text;

    parent.appendChild(title);
    parent.appendChild(paragraph);
}

document.addEventListener('DOMContentLoaded', () => {
    loadCaseStudies();
});
