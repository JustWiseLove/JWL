// main.js
let sortedLessons = [];
let sortedPeople = [];
let sortedArticles = [];
let sortedSections = [];
let sortedTopics = [];

try {
    sortedLessons = lessons.slice().sort((a, b) => a.title.localeCompare(b.title));
    sortedPeople = people.slice().sort((a, b) => a.T.localeCompare(b.T));
    sortedArticles = articles.slice().sort((a, b) => a.title.localeCompare(b.title));
    sortedSections = sections.slice().sort((a, b) => a.T.localeCompare(b.T));
    sortedTopics = topics.slice().sort((a, b) => a.T.localeCompare(b.T));
} catch (e) {
    console.error('Error initializing sorted arrays:', e);
}

const categories = {
    just: sortedLessons,
    wise: sortedPeople,
    love: [...sortedTopics, ...sortedArticles, ...sortedSections].sort((a, b) => (a.T || a.title).localeCompare(b.T || b.title))
};

let debounceTimeout;

function highlightText(text, searchTerm) {
    if (!searchTerm || !text) return text;
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function populateList(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (category === 'just') {
        container.querySelectorAll('.lesson-card').forEach(el => el.remove());
        const section = container.querySelector('.section');
        section.innerHTML = '';

        sortedLessons.forEach((lesson, index) => {
            const lessonNum = index + 1;
            const lessonCard = document.createElement('div');
            lessonCard.className = 'lesson lesson-card';
            lessonCard.id = `lesson-${lessonNum}`;
            lessonCard.innerHTML = `
                <div class="lesson-header">
                    <div class="lesson-number">${lessonNum}</div>
                    <h3>${lesson.title}</h3>
                </div>
                <div class="lesson-content" style="display: none;">
                    <div class="scripture-section"><ul>${lesson.scriptures.map(s => `<li>${s}</li>`).join('')}</ul></div>
                    <div class="description-section">${lesson.description}</div>
                    <p><strong>Question:</strong> ${lesson.question}</p>
                    <textarea placeholder="Write your answer here..."></textarea>
                </div>
            `;
            section.appendChild(lessonCard);

            const header = lessonCard.querySelector('.lesson-header');
            const content = lessonCard.querySelector('.lesson-content');
            const textarea = lessonCard.querySelector('textarea');
            const savedAnswer = localStorage.getItem(`lesson-${lessonNum}`);
            if (savedAnswer) {
                textarea.value = savedAnswer;
                if (savedAnswer.trim()) lessonCard.dataset.clicked = true;
            }

            header.addEventListener('click', () => {
                const isExpanded = content.style.display === 'block';
                content.style.display = isExpanded ? 'none' : 'block';
                lessonCard.dataset.expanded = !isExpanded;
            });

            textarea.addEventListener('input', () => {
                localStorage.setItem(`lesson-${lessonNum}`, textarea.value);
                if (!lessonCard.dataset.clicked && textarea.value.trim()) {
                    lessonCard.dataset.clicked = true;
                    updateProgress();
                } else if (lessonCard.dataset.clicked && !textarea.value.trim()) {
                    delete lessonCard.dataset.clicked;
                    updateProgress();
                }
            });
        });

        updateProgress();
    } else if (category === 'wise') {
        container.innerHTML = '';
        sortedPeople.forEach(item => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';
            itemWrapper.innerHTML = `
                <div class="lesson-header">
                    <h3>${item.T}</h3>
                </div>
                <div class="lesson-content" style="display: none;">
                    <div class="scripture-section"><ul>${item.S.map(s => `<li>${s}</li>`).join('')}</ul></div>
                    <div class="description-section">${item.D}</div>
                </div>
            `;
            container.appendChild(itemWrapper);

            const header = itemWrapper.querySelector('.lesson-header');
            const content = itemWrapper.querySelector('.lesson-content');
            header.addEventListener('click', () => {
                const isExpanded = content.style.display === 'block';
                content.style.display = isExpanded ? 'none' : 'block';
                itemWrapper.dataset.expanded = !isExpanded;
            });
        });
    } else if (category === 'love') {
        container.innerHTML = '';
        categories.love.forEach(item => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';
            const title = item.T || item.title;
            const scriptures = item.S ? item.S.map(s => `<li>${s}</li>`).join('') : '';
            const description = item.D || item.content || '';
            itemWrapper.innerHTML = `
                <div class="lesson-header">
                    <h3>${title}</h3>
                </div>
                <div class="lesson-content" style="display: none;">
                    ${scriptures ? `<div class="scripture-section"><ul>${scriptures}</ul></div>` : ''}
                    <div class="description-section">${description}</div>
                </div>
            `;
            container.appendChild(itemWrapper);

            const header = itemWrapper.querySelector('.lesson-header');
            const content = itemWrapper.querySelector('.lesson-content');
            header.addEventListener('click', () => {
                const isExpanded = content.style.display === 'block';
                content.style.display = isExpanded ? 'none' : 'block';
                itemWrapper.dataset.expanded = !isExpanded;
            });
        });
    }
}

function updateProgress() {
    const completedLessons = document.querySelectorAll('.lesson[data-clicked]').length;
    document.getElementById('progress').textContent = `${completedLessons}/60`;
}

function showTab(category) {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    if (searchTerm && (category === 'wise' || category === 'love')) {
        searchItems();
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[onclick="showTab('${category}')"]`).classList.add('active');
        return;
    }

    document.querySelectorAll('.list').forEach(list => list.style.display = 'none');
    const selectedList = document.getElementById(category);
    if (selectedList) selectedList.style.display = 'block';

    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="showTab('${category}')"]`).classList.add('active');

    if (category === 'just') {
        populateList('just', 'just');
        updateProgress();
    } else if (category === 'wise') {
        populateList('wise', 'wise');
    } else if (category === 'love') {
        populateList('love', 'love');
    }
}

function searchItems() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';

        if (!searchTerm) {
            document.querySelectorAll('.list').forEach(list => list.style.display = list.id === 'just' ? 'block' : 'none');
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[onclick="showTab('just')"]`).classList.add('active');
            populateList('just', 'just');
            updateProgress();
            return;
        }

        const matches = [];
        ['wise', 'love'].forEach(category => {
            categories[category].forEach(item => {
                const title = (item.T || item.title || '').toLowerCase();
                const scriptures = (item.S || []).join(' ').toLowerCase();
                const description = (item.D || item.content || '').toLowerCase();

                if (title.includes(searchTerm)) {
                    matches.push({ category, item, isTitleMatch: true });
                } else if (scriptures.includes(searchTerm) || description.includes(searchTerm)) {
                    matches.push({ category, item, isTitleMatch: false });
                }
            });
        });

        matches.sort((a, b) => {
            if (a.isTitleMatch && !b.isTitleMatch) return -1;
            if (!a.isTitleMatch && b.isTitleMatch) return 1;
            const titleA = (a.item.T || a.item.title || '').toLowerCase();
            const titleB = (b.item.T || b.item.title || '').toLowerCase();
            return titleA.localeCompare(titleB);
        });

        matches.forEach(({ category, item }) => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';
            const title = item.T || item.title;
            const scriptures = item.S ? item.S.map(s => `<li>${highlightText(s, searchTerm)}</li>`).join('') : '';
            const description = item.D || item.content || '';
            itemWrapper.innerHTML = `
                <div class="lesson-header">
                    <h3>${highlightText(title, searchTerm)}</h3>
                </div>
                <div class="lesson-content" style="display: none;">
                    ${scriptures ? `<div class="scripture-section"><ul>${scriptures}</ul></div>` : ''}
                    <div class="description-section">${highlightText(description, searchTerm)}</div>
                </div>
            `;
            searchResults.appendChild(itemWrapper);

            const header = itemWrapper.querySelector('.lesson-header');
            const content = itemWrapper.querySelector('.lesson-content');
            header.addEventListener('click', () => {
                const isExpanded = content.style.display === 'block';
                content.style.display = isExpanded ? 'none' : 'block';
                itemWrapper.dataset.expanded = !isExpanded;
            });
        });

        document.querySelectorAll('.list').forEach(list => list.style.display = list.id === 'search-results' ? 'block' : 'none');
    }, 300);
}

function toggleTheme() {
    const body = document.body;
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'light') {
        themeStylesheet.setAttribute('href', 'dark.css');
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        themeStylesheet.setAttribute('href', 'light.css');
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// This makes the theme stay when the page is refreshed
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeStylesheet = document.getElementById('theme-stylesheet');
    document.body.setAttribute('data-theme', savedTheme);
    themeStylesheet.setAttribute('href', savedTheme === 'dark' ? 'dark.css' : 'light.css');
});

document.addEventListener('DOMContentLoaded', () => {
    populateList('just', 'just');
    populateList('wise', 'wise');
    populateList('love', 'love');
    showTab('just');
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
});
