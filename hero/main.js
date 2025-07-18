// main.js

// Initialize sorted arrays
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

// Category mapping for tabs
const categories = {
    pray: sortedLessons,
    walk: sortedPeople,
    root: [...sortedTopics, ...sortedArticles, ...sortedSections]
};

// Debounce timeout for search
let debounceTimeout;

// Populate content for a given category
function populateList(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (category === 'pray') {
        // Clear existing lesson cards
        container.querySelectorAll('.lesson-card').forEach(el => el.remove());

        // Populate lessons under respective sections
        const section1 = container.querySelectorAll('.section')[0];
        const section2 = container.querySelectorAll('.section')[1];
        section1.innerHTML = '<h2>Trust The Creator And His Word</h2>';
        section2.innerHTML = '<h2>Worship With Truth Not Tradition</h2>';

        sortedLessons.forEach((lesson, index) => {
            const lessonNum = index + 1;
            const targetSection = lessonNum <= 30 ? section1 : section2;

            const lessonCard = document.createElement('div');
            lessonCard.className = 'lesson lesson-card';
            lessonCard.id = `lesson-${lessonNum}`;
            lessonCard.innerHTML = `
                <div class="lesson-number">${lessonNum}</div>
                <h3>${lesson.title}</h3>
                <div class="scripture-section"><ul>${lesson.scriptures.map(s => `<li>${s}</li>`).join('')}</ul></div>
                <div class="description-section">${lesson.description}</div>
                <p><strong>Question:</strong> ${lesson.question}</p>
                <textarea placeholder="Write your answer here..."></textarea>
            `;
            targetSection.appendChild(lessonCard);

            // Load saved answers
            const textarea = lessonCard.querySelector('textarea');
            const savedAnswer = localStorage.getItem(`lesson-${lessonNum}`);
            if (savedAnswer) {
                textarea.value = savedAnswer;
                if (savedAnswer.trim()) lessonCard.dataset.clicked = true;
            }

            // Save answers on input
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
    } else if (category === 'walk') {
        container.innerHTML = '';
        sortedPeople.forEach(item => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';
            itemWrapper.innerHTML = `
                <h3>${item.T}</h3>
                <div class="scripture-section"><ul>${item.S.map(s => `<li>${s}</li>`).join('')}</ul></div>
                <div class="description-section">${item.D}</div>
            `;
            container.appendChild(itemWrapper);
        });
    } else if (category === 'root') {
        container.innerHTML = '';
        [...sortedTopics, ...sortedArticles, ...sortedSections].forEach(item => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';
            const title = item.T || item.title;
            const scriptures = item.S ? item.S.map(s => `<li>${s}</li>`).join('') : '';
            const description = item.D || item.content || '';
            itemWrapper.innerHTML = `
                <h3>${title}</h3>
                ${scriptures ? `<div class="scripture-section"><ul>${scriptures}</ul></div>` : ''}
                <div class="description-section">${description}</div>
            `;
            container.appendChild(itemWrapper);
        });
    }
}

// Update progress tracker
function updateProgress() {
    const completedLessons = document.querySelectorAll('.lesson[data-clicked]').length;
    document.getElementById('progress').textContent = `${completedLessons}/60`;
}

// Tab Management
function showTab(category) {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    if (searchTerm) {
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

    if (category === 'pray') {
        populateList('pray', 'pray');
        updateProgress();
    } else if (category === 'walk') {
        populateList('walk', 'walk');
    } else if (category === 'root') {
        populateList('root', 'root');
    }
}

// Search Functionality
function searchItems() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';

        if (!searchTerm) {
            document.querySelectorAll('.list').forEach(list => list.style.display = list.id === 'pray' ? 'block' : 'none');
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[onclick="showTab('pray')"]`).classList.add('active');
            populateList('pray', 'pray');
            updateProgress();
            return;
        }

        const matches = [];
        Object.keys(categories).forEach(category => {
            categories[category].forEach(item => {
                const title = (item.T || item.title || '').toLowerCase();
                const scriptures = (item.S || item.scriptures || []).join(' ').toLowerCase();
                const description = (item.D || item.content || item.description || '').toLowerCase();
                const question = (item.question || '').toLowerCase();

                if (title.includes(searchTerm) || scriptures.includes(searchTerm) || description.includes(searchTerm) || question.includes(searchTerm)) {
                    matches.push({ category, item });
                }
            });
        });

        matches.forEach(({ category, item }) => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';
            const title = item.T || item.title;
            const scriptures = item.S ? item.S.map(s => `<li>${s}</li>`).join('') : '';
            const description = item.D || item.content || item.description || '';
            const question = item.question || '';

            itemWrapper.innerHTML = `
                <h3>${title}</h3>
                ${scriptures ? `<div class="scripture-section"><ul>${scriptures}</ul></div>` : ''}
                <div class="description-section">${description}</div>
                ${question ? `<p><strong>Question:</strong> ${question}</p><textarea placeholder="Write your answer here..."></textarea>` : ''}
            `;
            searchResults.appendChild(itemWrapper);

            if (category === 'pray' && question) {
                const lessonNum = sortedLessons.findIndex(l => l.title === item.title) + 1;
                itemWrapper.id = `lesson-${lessonNum}`;
                const textarea = itemWrapper.querySelector('textarea');
                const savedAnswer = localStorage.getItem(`lesson-${lessonNum}`);
                if (savedAnswer) {
                    textarea.value = savedAnswer;
                    if (savedAnswer.trim()) itemWrapper.dataset.clicked = true;
                }
                textarea.addEventListener('input', () => {
                    localStorage.setItem(`lesson-${lessonNum}`, textarea.value);
                    if (!itemWrapper.dataset.clicked && textarea.value.trim()) {
                        itemWrapper.dataset.clicked = true;
                        updateProgress();
                    } else if (itemWrapper.dataset.clicked && !textarea.value.trim()) {
                        delete itemWrapper.dataset.clicked;
                        updateProgress();
                    }
                });
            }
        });

        document.querySelectorAll('.list').forEach(list => list.style.display = list.id === 'search-results' ? 'block' : 'none');
    }, 300);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    populateList('pray', 'pray');
    populateList('walk', 'walk');
    populateList('root', 'root');
    showTab('pray');
});
