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
        // Clear existing content except sections and progress tracker
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
            itemWrapper.className = 'item';

            const itemButton = document.createElement('button');
            itemButton.className = 'item-button';
            itemButton.textContent = item.T || item.title;

            const content = document.createElement('div');
            content.className = 'content';
            content.style.display = 'none';

            if (category === 'walk' || (category === 'root' && (item.S || item.scriptures))) {
                const scriptures = (item.S || item.scriptures || []).map(s => `<li>${s}</li>`).join('');
                const description = item.D || item.description || '';
                content.innerHTML = `
                    <div class="scripture-section"><ul>${scriptures}</ul></div>
                    <div class="description-section">${description}</div>
                `;
            } else if (category === 'root' && item.content) {
                content.innerHTML = item.content || '';
            }

            itemWrapper.appendChild(itemButton);
            itemWrapper.appendChild(content);
            container.appendChild(itemWrapper);

            itemButton.addEventListener('click', () => {
                const isOpen = content.style.display === 'block';
                document.querySelectorAll('.content').forEach(c => (c.style.display = 'none'));
                content.style.display = isOpen ? 'none' : 'block';
            });
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
        const navHeight = document.querySelector('.tabs').offsetHeight;
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
    if (searchResults) searchResults.remove();

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
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[onclick="showTab('${category}')"]`)?.classList.add('active');
        highlightMatchingTabs(searchTerm);
        return;
    }

    document.querySelectorAll('.content').forEach(c => (c.style.display = 'none'));
    if (searchResults) searchResults.remove();

    const selectedList = document.getElementById(category);
    document.querySelectorAll('.list').forEach(list => (list.style.display = 'none'));
    if (selectedList) selectedList.style.display = 'flex';
    document.getElementById('pray-timeline').style.display = category === 'pray' ? 'block' : 'none';

    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active', 'match-highlight'));
    document.querySelector(`[onclick="showTab('${category}')"]`)?.classList.add('active');

    if (category === 'pray') {
        generateTimeline();
        updateProgress();
    }

    if (searchTerm) highlightMatchingTabs(searchTerm);
}

// Highlight matching tabs for search
function highlightMatchingTabs(searchTerm) {
    const categoriesWithMatches = new Set();
    Object.keys(categories).forEach(cat => {
        const items = categories[cat];
        items.forEach(item => {
            if (!item || (!item.T && !item.title)) return;
            const title = item.T || item.title;
            const titleMatch = title.toLowerCase().includes(searchTerm);
            let contentMatch = false;

            if (item.content) {
                contentMatch = item.content.toLowerCase().includes(searchTerm);
            } else {
                const scripturesText = (item.scriptures || item.S || []).join(' ').toLowerCase();
                const descriptionText = (item.description || item.D || '').toLowerCase();
                const questionText = (item.question || '').toLowerCase();
                contentMatch = scripturesText.includes(searchTerm) || descriptionText.includes(searchTerm) || questionText.includes(searchTerm);
            }

            if (titleMatch || contentMatch) categoriesWithMatches.add(cat);
        });
    });

    categoriesWithMatches.forEach(cat => {
        document.querySelector(`[onclick="showTab('${cat}')"]`)?.classList.add('match-highlight');
    });
}

// Search Functionality
function createSearchResults() {
    const allList = document.createElement('div');
    allList.className = 'list';
    allList.id = 'search-results';
    const main = document.querySelector('.main-content');
    const existingResults = document.getElementById('search-results');
    if (existingResults) existingResults.remove();
    main.insertBefore(allList, main.querySelector('.section-wrapper'));
    return allList;
}

function searchItems() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        if (!searchTerm) {
            resetView();
            return;
        }

        const allList = createSearchResults();
        const matches = [];

        Object.keys(categories).forEach(category => {
            const items = categories[category];
            items.forEach(item => {
                if (!item || (!item.T && !item.title)) return;
                const title = item.T || item.title;
                const titleMatch = title.toLowerCase().includes(searchTerm);
                let contentMatch = false;

                if (item.content) {
                    contentMatch = item.content.toLowerCase().includes(searchTerm);
                } else {
                    const scripturesText = (item.scriptures || item.S || []).join(' ').toLowerCase();
                    const descriptionText = (item.description || item.D || '').toLowerCase();
                    const questionText = (item.question || '').toLowerCase();
                    contentMatch = scripturesText.includes(searchTerm) || descriptionText.includes(searchTerm) || questionText.includes(searchTerm);
                }

                if (titleMatch || contentMatch) {
                    matches.push({ category, item });
                }
            });
        });

        allList.innerHTML = '';
        matches.forEach(({ category, item }) => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'item';

            const itemButton = document.createElement('button');
            itemButton.className = 'item-button';
            itemButton.textContent = item.T || item.title;

            const content = document.createElement('div');
            content.className = 'content';
            content.style.display = 'none';

            if (category === 'pray') {
                content.innerHTML = `
                    <div class="scripture-section"><ul>${item.scriptures.map(s => `<li>${s}</li>`).join('')}</ul></div>
                    <div class="description-section">${item.description}</div>
                    <p><strong>Question:</strong> ${item.question}</p>
                `;
            } else if (category === 'walk' || (category === 'root' && (item.S || item.scriptures))) {
                const scriptures = (item.S || item.scriptures || []).map(s => `<li>${s}</li>`).join('');
                const description = item.D || item.description || '';
                content.innerHTML = `
                    <div class="scripture-section"><ul>${scriptures}</ul></div>
                    <div class="description-section">${description}</div>
                `;
            } else if (category === 'root' && item.content) {
                content.innerHTML = item.content;
            }

            itemWrapper.appendChild(itemButton);
            itemWrapper.appendChild(content);
            allList.appendChild(itemWrapper);

            itemButton.addEventListener('click', () => {
                const isOpen = content.style.display === 'block';
                document.querySelectorAll('.content').forEach(c => (c.style.display = 'none'));
                content.style.display = isOpen ? 'none' : 'block';
            });
        });

        document.querySelectorAll('.list').forEach(list => (list.style.display = list.id === 'search-results' ? 'flex' : 'none'));
        document.getElementById('pray-timeline').style.display = 'none';
        highlightMatchingTabs(searchTerm);
    }, 300);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    resetView();
    showTab('pray');
});
