// main.js

import family from './family.js';

let sortedLessons = [];
let sortedPeople = [];
let sortedArticles = [];
let sortedSections = [];
let sortedTopics = [];
let sortedFamily = family.slice().sort((a, b) => new Date(a.D) - new Date(b.D));

try {
    sortedLessons = (lessons || []).slice().sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    sortedPeople = (people || []).slice().sort((a, b) => (a.T || '').localeCompare(b.T || ''));
    sortedArticles = (articles || []).slice().sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    sortedSections = (sections || []).slice().sort((a, b) => (a.T || '').localeCompare(b.T || ''));
    sortedTopics = (topics || []).slice().sort((a, b) => (a.T || '').localeCompare(b.T || ''));
} catch (e) {
    console.error('Error initializing sorted arrays:', e);
}

const categories = {
    just: sortedLessons,
    wise: sortedPeople,
    love: [...sortedTopics, ...sortedArticles, ...sortedSections].sort((a, b) => (a.T || a.title || '').localeCompare(b.T || b.title || ''))
};

let debounceTimeout;

function highlightText(text, searchTerm) {
    if (!searchTerm || !text) return text || '';
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function getNextFriday() {
    const today = new Date();
    const day = today.getDay();
    const daysUntilFriday = (5 - day + 7) % 7 || 7; // Next Friday (5 is Friday)
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    return nextFriday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getFamilyEntryForDate(dateStr) {
    return sortedFamily.find(entry => entry.D === dateStr) || { D: dateStr, T: 'No Content', R: 'No content available for this date.' };
}

function populateWorshipSection(dateStr = getNextFriday()) {
    const worshipDate = document.getElementById('worship-date');
    const worshipContent = document.getElementById('worship-content');
    if (!worshipDate || !worshipContent) {
        console.error('Worship section elements not found');
        return;
    }

    worshipDate.textContent = dateStr;
    const entry = getFamilyEntryForDate(dateStr);
    
    worshipContent.innerHTML = '';
    const topics = [
        { T: entry.T, R: entry.R },
        entry.T1 && entry.R1 ? { T: entry.T1, R: entry.R1 } : null,
        entry.T2 && entry.R2 ? { T: entry.T2, R: entry.R2 } : null,
        entry.T3 && entry.R3 ? { T: entry.T3, R: entry.R3 } : null,
        entry.T4 && entry.R4 ? { T: entry.T4, R: entry.R4 } : null
    ].filter(Boolean);

    topics.forEach(topic => {
        const topicWrapper = document.createElement('div');
        topicWrapper.className = 'lesson lesson-card';
        topicWrapper.innerHTML = `
            <div class="lesson-header">
                <h3>${topic.T}</h3>
            </div>
            <div class="lesson-content" style="display: none;">
                <div class="description-section">${topic.R}</div>
            </div>
        `;
        worshipContent.appendChild(topicWrapper);

        const header = topicWrapper.querySelector('.lesson-header');
        const content = topicWrapper.querySelector('.lesson-content');
        header.addEventListener('click', () => {
            const isExpanded = content.style.display === 'block';
            content.style.display = isExpanded ? 'none' : 'block';
            topicWrapper.dataset.expanded = !isExpanded;
        });
    });
}

function populateAllDates() {
    const allDates = document.getElementById('all-dates');
    const expandCollapseBtn = document.getElementById('expand-collapse-btn');
    if (!allDates || !expandCollapseBtn) {
        console.error('All dates or button element not found');
        return;
    }

    if (allDates.style.display === 'block') {
        allDates.style.display = 'none';
        allDates.innerHTML = '';
        expandCollapseBtn.textContent = 'EXPAND';
        populateWorshipSection();
    } else {
        allDates.style.display = 'block';
        allDates.innerHTML = '';
        sortedFamily.forEach(entry => {
            const dateItem = document.createElement('div');
            dateItem.className = 'lesson lesson-card';
            dateItem.innerHTML = `
                <div class="lesson-header">
                    <h3>${entry.D}</h3>
                </div>
                <div class="lesson-content" style="display: none;"></div>
            `;
            allDates.appendChild(dateItem);

            const header = dateItem.querySelector('.lesson-header');
            const content = dateItem.querySelector('.lesson-content');
            header.addEventListener('click', () => {
                const isExpanded = content.style.display === 'block';
                if (!isExpanded) {
                    content.innerHTML = '';
                    const topics = [
                        { T: entry.T, R: entry.R },
                        entry.T1 && entry.R1 ? { T: entry.T1, R: entry.R1 } : null,
                        entry.T2 && entry.R2 ? { T: entry.T2, R: entry.R2 } : null,
                        entry.T3 && entry.R3 ? { T: entry.T3, R: entry.R3 } : null,
                        entry.T4 && entry.R4 ? { T: entry.T4, R: entry.R4 } : null
                    ].filter(Boolean);

                    topics.forEach(topic => {
                        const topicWrapper = document.createElement('div');
                        topicWrapper.className = 'lesson lesson-card';
                        topicWrapper.innerHTML = `
                            <div class="lesson-header">
                                <h3>${topic.T}</h3>
                            </div>
                            <div class="lesson-content" style="display: none;">
                                <div class="description-section">${topic.R}</div>
                            </div>
                        `;
                        content.appendChild(topicWrapper);

                        const topicHeader = topicWrapper.querySelector('.lesson-header');
                        const topicContent = topicWrapper.querySelector('.lesson-content');
                        topicHeader.addEventListener('click', () => {
                            const isTopicExpanded = topicContent.style.display === 'block';
                            topicContent.style.display = isTopicExpanded ? 'none' : 'block';
                            topicWrapper.dataset.expanded = !isTopicExpanded;
                        });
                    });
                }
                content.style.display = isExpanded ? 'none' : 'block';
                dateItem.dataset.expanded = !isExpanded;
            });
        });
        expandCollapseBtn.textContent = 'COLLAPSE';
    }
}

function scheduleDateUpdate() {
    const now = new Date();
    const nextSaturday = new Date(now);
    const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7;
    nextSaturday.setDate(now.getDate() + daysUntilSaturday);
    nextSaturday.setHours(9, 0, 0, 0); // 9 AM EST

    const timeUntilUpdate = nextSaturday - now;
    if (timeUntilUpdate > 0) {
        setTimeout(() => {
            populateWorshipSection();
            setInterval(() => populateWorshipSection(), 7 * 24 * 60 * 60 * 1000); // Weekly update
        }, timeUntilUpdate);
    }
}

function populateList(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID ${containerId} not found`);
        return;
    }

    container.innerHTML = '';
    if (category === 'just') {
        const section = document.createElement('div');
        section.className = 'section';
        container.appendChild(section);

        sortedLessons.forEach((lesson, index) => {
            const lessonNum = index + 1;
            const lessonCard = document.createElement('div');
            lessonCard.className = 'lesson lesson-card';
            lessonCard.id = `lesson-${lessonNum}`;
            lessonCard.innerHTML = `
                <div class="lesson-header">
                    <div class="lesson-number">${lessonNum}</div>
                    <h3>${lesson.title || 'Untitled'}</h3>
                </div>
                <div class="lesson-content" style="display: none;">
                    <div class="scripture-section"><ul>${(lesson.scriptures || []).map(s => `<li>${s}</li>`).join('')}</ul></div>
                    <div class="description-section">${lesson.description || ''}</div>
                    <p><strong>Question:</strong> ${lesson.question || ''}</p>
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
        if (!sortedPeople.length) {
            console.warn('No data available for wise category');
            container.innerHTML = '<p>No content available for Wise category.</p>';
            return;
        }
        sortedPeople.forEach(item => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';
            itemWrapper.innerHTML = `
                <div class="lesson-header">
                    <h3>${item.T || 'Untitled'}</h3>
                </div>
                <div class="lesson-content" style="display: none;">
                    <div class="scripture-section"><ul>${(item.S || []).map(s => `<li>${s}</li>`).join('')}</ul></div>
                    <div class="description-section">${item.D || ''}</div>
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
        if (!categories.love.length) {
            console.warn('No data available for love category');
            container.innerHTML = '<p>No content available for Love category.</p>';
            return;
        }
        categories.love.forEach(item => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';
            const title = item.T || item.title || 'Untitled';
            itemWrapper.innerHTML = `
                <div class="lesson-header">
                    <h3>${title}</h3>
                </div>
                <div class="lesson-content" style="display: none;">
                    <div class="description-section">${item.D || item.description || ''}</div>
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
    const totalLessons = sortedLessons.length;
    const completedLessons = document.querySelectorAll('.lesson-card[data-clicked="true"]').length;
    const progressCounter = document.getElementById('progress-counter');
    if (progressCounter) {
        progressCounter.textContent = `${completedLessons}/${totalLessons}`;
    }
}

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-button');
    const lists = document.querySelectorAll('.list');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    lists.forEach(list => list.style.display = 'none');
    
    const activeTab = document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`);
    const activeList = document.getElementById(tabId);
    
    if (activeTab && activeList) {
        activeTab.classList.add('active');
        activeList.style.display = 'block';
        if (tabId === 'just') {
            populateList('just', 'just');
        } else if (tabId === 'wise') {
            populateList('wise', 'wise');
        } else if (tabId === 'love') {
            populateList('love', 'love');
        }
    }
}

function searchItems() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const searchTerm = document.getElementById('search-input-text')?.value.trim().toLowerCase();
        const searchResults = document.getElementById('search-results');
        if (!searchResults) {
            console.error('Search results container not found');
            return;
        }

        searchResults.innerHTML = '';
        if (!searchTerm) {
            showTab('home');
            return;
        }

        showTab('search-results');
        const allItems = [...sortedLessons, ...sortedPeople, ...sortedArticles, ...sortedSections, ...sortedTopics];
        const filteredItems = allItems.filter(item => {
            const title = (item.T || item.title || '').toLowerCase();
            const description = (item.D || item.description || '').toLowerCase();
            const scriptures = (item.S || item.scriptures || []).join(' ').toLowerCase();
            return title.includes(searchTerm) || description.includes(searchTerm) || scriptures.includes(searchTerm);
        });

        if (!filteredItems.length) {
            searchResults.innerHTML = '<p>No results found.</p>';
            return;
        }

        filteredItems.forEach(item => {
            const resultWrapper = document.createElement('div');
            resultWrapper.className = 'search-result';
            const title = highlightText(item.T || item.title || 'Untitled', searchTerm);
            const description = highlightText(item.D || item.description || '', searchTerm);
            const scriptures = (item.S || item.scriptures || []).map(s => `<li>${highlightText(s, searchTerm)}</li>`).join('');
            resultWrapper.innerHTML = `
                <h3>${title}</h3>
                ${scriptures ? `<ul>${scriptures}</ul>` : ''}
                <p>${description}</p>
            `;
            searchResults.appendChild(resultWrapper);
        });
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    populateWorshipSection();
    scheduleDateUpdate();
    document.getElementById('expand-collapse-btn')?.addEventListener('click', populateAllDates);

    const themeToggle = document.getElementById('theme-toggle');
    const stylesheet = document.getElementById('theme-stylesheet');
    if (themeToggle && stylesheet) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.dataset.theme;
            document.body.dataset.theme = currentTheme === 'dark' ? 'light' : 'dark';
            stylesheet.href = currentTheme === 'dark' ? 'light.css' : 'dark.css';
        });
    }

    document.querySelectorAll('.paradise-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.paradise-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Add logic to update timeline content based on tab
        });
    });

    document.querySelectorAll('.spotlight-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.spotlight-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Add logic to update spotlight content
        });
    });

    document.querySelectorAll('.timeline-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            document.querySelectorAll('.timeline-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            // Add logic to update timeline description
        });
    });
});
