// main.js

// Initialize sorted arrays
let sortedLessons = [];
let sortedPeople = [];
let sortedArticles = [];
let sortedSections = [];
let sortedTopics = [];

try {
    sortedLessons = lessons.slice().sort((a, b) => a.title.localeCompare(b.title));
    sortedPeople = people ? people.slice().sort((a, b) => (a.T || a.title).localeCompare(b.T || b.title)) : [];
    sortedArticles = articles ? articles.slice().sort((a, b) => (a.title || a.T).localeCompare(b.title || b.T)) : [];
    sortedSections = sections ? sections.slice().sort((a, b) => (a.T || a.title).localeCompare(b.T || b.title)) : [];
    sortedTopics = topics ? topics.slice().sort((a, b) => (a.T || a.title).localeCompare(b.T || b.title)) : [];
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
        const section1 = container.querySelector('#section1');
        const section2 = container.querySelector('#section2');
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
    } else {
        // Populate Walk and Root tabs
        container.innerHTML = '';
        const items = categories[category] || [];
        items.forEach(item => {
            if (!item || (!item.T && !item.title)) return;

            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card'; // Reuse lesson-card for styling

            const title = item.T || item.title;
            const scriptures = (item.S || item.scriptures || []).map(s => `<li>${s}</li>`).join('');
            const description = item.D || item.description || item.content || '';

            itemWrapper.innerHTML = `
                <h3>${title}</h3>
                <div class="scripture-section"><ul>${scriptures}</ul></div>
                <div class="description-section">${description}</div>
            `;
            container.appendChild(itemWrapper);
        });
    }
}

// Generate timeline for Pray tab
function generateTimeline() {
    const timelineContainer = document.querySelector('#pray-timeline .timeline-container');
    timelineContainer.innerHTML = '';
    for (let i = 1; i <= 60; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.setAttribute('data-lesson', i);
        button.addEventListener('click', () => scrollToLesson(i));
        timelineContainer.appendChild(button);
    }
}

// Scroll to lesson
function scrollToLesson(lessonNum) {
    const target = document.getElementById(`lesson-${lessonNum}`);
    if (target) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const timelineHeight = document.querySelector('.timeline').offsetHeight;
        const headerOffset = navHeight + timelineHeight + 20;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth'
        });
        updateActiveTimelineButton(lessonNum);
    }
}

// Update active timeline button
function updateActiveTimelineButton(lessonNum) {
    const buttons = document.querySelectorAll('.timeline button');
    buttons.forEach(button => button.classList.remove('active'));
    const activeButton = document.querySelector(`.timeline button[data-lesson="${lessonNum}"]`);
    if (activeButton) activeButton.classList.add('active');
}

// Update progress tracker
function updateProgress() {
    const completedLessons = document.querySelectorAll('.lesson[data-clicked]').length;
    document.getElementById('progress').textContent = `${completedLessons}/60`;
}

// Tab Management
function resetView() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) searchResults.innerHTML = '';

    document.querySelectorAll('.list').forEach(list => (list.style.display = 'none'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active', 'match-highlight'));
    document.getElementById('pray-timeline').style.display = 'none';

    populateList('pray', 'pray');
    populateList('walk', 'walk');
    populateList('root', 'root');
    generateTimeline();
}

function showTab(category) {
    const searchTerm = document.getElementById('search')?.value.toLowerCase() || '';
    const searchResults = document.getElementById('search-results');

    if (searchTerm && searchResults) {
        searchItems();
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[onclick="showTab('${category}')"]`)?.classList.add('active');
        return;
    }

    document.querySelectorAll('.list').forEach(list => (list.style.display = 'none'));
    const selectedList = document.getElementById(category);
    if (selectedList) selectedList.style.display = 'block';
    document.getElementById('pray-timeline').style.display = category === 'pray' ? 'block' : 'none';

    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active', 'match-highlight'));
    document.querySelector(`[onclick="showTab('${category}')"]`)?.classList.add('active');

    if (category === 'pray') {
        generateTimeline();
        updateProgress();
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
            resetView();
            showTab('pray');
            return;
        }

        const matches = [];
        Object.keys(categories).forEach(category => {
            const items = categories[category];
            items.forEach(item => {
                if (!item || (!item.T && !item.title)) return;
                const title = (item.T || item.title).toLowerCase();
                const scripturesText = (item.S || item.scriptures || []).join(' ').toLowerCase();
                const descriptionText = (item.D || item.description || item.content || '').toLowerCase();
                const questionText = item.question ? item.question.toLowerCase() : '';

                if (title.includes(searchTerm) || scripturesText.includes(searchTerm) || descriptionText.includes(searchTerm) || questionText.includes(searchTerm)) {
                    matches.push({ category, item });
                }
            });
        });

        matches.forEach(({ category, item }) => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';

            const title = item.T || item.title;
            const scriptures = (item.S || item.scriptures || []).map(s => `<li>${s}</li>`).join('');
            const description = item.D || item.description || item.content || '';
            const question = item.question || '';

            itemWrapper.innerHTML = `
                <h3>${title}</h3>
                <div class="scripture-section"><ul>${scriptures}</ul></div>
                <div class="description-section">${description}</div>
                ${question ? `<p><strong>Question:</strong> ${question}</p>` : ''}
                ${category === 'pray' ? `<textarea placeholder="Write your answer here..."></textarea>` : ''}
            `;
            searchResults.appendChild(itemWrapper);

            if (category === 'pray') {
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

        document.querySelectorAll('.list').forEach(list => (list.style.display = list.id === 'search-results' ? 'block' : 'none'));
        document.getElementById('pray-timeline').style.display = 'none';
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    }, 300);
}

// Scroll tracking for timeline
window.addEventListener('scroll', () => {
    if (document.getElementById('pray').style.display !== 'block') return;
    const lessons = document.querySelectorAll('.lesson');
    let currentLesson = null;
    lessons.forEach(lesson => {
        const rect = lesson.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            currentLesson = lesson.id;
        }
    });
    if (currentLesson && currentLesson.startsWith('lesson-')) {
        const lessonNum = parseInt(currentLesson.split('-')[1]);
        updateActiveTimelineButton(lessonNum);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    resetView();
    showTab('pray');
});
