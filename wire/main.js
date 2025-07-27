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
    const progressElement = document.getElementById('progress');
    if (progressElement) {
        progressElement.textContent = `${completedLessons}/60`;
    }
}

function showTab(category) {
    document.querySelectorAll('.list').forEach(list => list.style.display = 'none');
    const selectedList = document.getElementById(category);
    if (selectedList) selectedList.style.display = 'block';

    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`[onclick="showTab('${category}')"]`);
    if (activeButton) activeButton.classList.add('active');

    if (category === 'just') {
        populateList('just', 'just');
        updateProgress();
    } else if (category === 'wise') {
        populateList('wise', 'wise');
    } else if (category === 'love') {
        populateList('love', 'love');
    } else if (category === 'home') {
        initializeTimelines();
        populateWorshipSection();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function searchItems() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const searchTerm = document.getElementById('search').value.trim().toLowerCase();
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';

        if (!searchTerm) {
            showTab('home');
            return;
        }

        const matches = [];
        ['just', 'wise', 'love'].forEach(category => {
            categories[category].forEach(item => {
                const title = (item.T || item.title || '').toLowerCase();
                const scriptures = (item.S || []).join(' ').toLowerCase();
                const description = (item.D || item.content || item.description || '').toLowerCase();

                if (title.includes(searchTerm)) {
                    matches.push({ category, item, isTitleMatch: true });
                } else if (scriptures.includes(searchTerm) || description.includes(searchTerm)) {
                    matches.push({ category, item, isTitleMatch: false });
                }
            });
        });

        // Include family.js in search
        sortedFamily.forEach(item => {
            const date = (item.D || '').toLowerCase();
            const topics = [
                item.T, item.T1, item.T2, item.T3, item.T4
            ].filter(Boolean).join(' ').toLowerCase();
            const research = [
                item.R, item.R1, item.R2, item.R3, item.R4
            ].filter(Boolean).join(' ').toLowerCase();

            if (date.includes(searchTerm) || topics.includes(searchTerm) || research.includes(searchTerm)) {
                matches.push({ category: 'family', item, isTitleMatch: date.includes(searchTerm) });
            }
        });

        matches.sort((a, b) => {
            if (a.isTitleMatch && !b.isTitleMatch) return -1;
            if (!a.isTitleMatch && b.isTitleMatch) return 1;
            const titleA = (a.item.T || a.item.title || a.item.D || '').toLowerCase();
            const titleB = (b.item.T || b.item.title || b.item.D || '').toLowerCase();
            return titleA.localeCompare(titleB);
        });

        matches.forEach(({ category, item }) => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';
            let title, scriptures, description;
            if (category === 'family') {
                title = item.D || 'Untitled';
                description = [
                    item.T && item.R ? `<strong>${item.T}</strong>: ${item.R}` : '',
                    item.T1 && item.R1 ? `<strong>${item.T1}</strong>: ${item.R1}` : '',
                    item.T2 && item.R2 ? `<strong>${item.T2}</strong>: ${item.R2}` : '',
                    item.T3 && item.R3 ? `<strong>${item.T3}</strong>: ${item.R3}` : '',
                    item.T4 && item.R4 ? `<strong>${item.T4}</strong>: ${item.R4}` : ''
                ].filter(Boolean).join('<br><br>');
                scriptures = '';
            } else {
                title = item.T || item.title || 'Untitled';
                scriptures = item.S ? item.S.map(s => `<li>${highlightText(s, searchTerm)}</li>`).join('') : '';
                description = item.D || item.content || item.description || '';
            }
            itemWrapper.innerHTML = `
                <div class="lesson-header">
                    <h3>${highlightText(title, searchTerm)}</h3>
                </div>
                <div class="lesson-content" style="display: none;">
                    ${scriptures ? `<div class="scripture-section"><ul>${scriptures}</ul></div>` : ''}
                    <div class="description-section">${highlightText(description, searchTerm)}</div>
                    ${category === 'just' && item.question ? `<p><strong>Question:</strong> ${highlightText(item.question, searchTerm)}</p><textarea placeholder="Write your answer here..."></textarea>` : ''}
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

            if (category === 'just') {
                const textarea = itemWrapper.querySelector('textarea');
                if (textarea) {
                    const lessonNum = sortedLessons.indexOf(item) + 1;
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
            }
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

function initializeTimelines() {
    const paradiseSection = document.getElementById('paradise-section');
    const featuredSection = document.getElementById('featured-section');
    const spotlightSection = document.getElementById('spotlight-section');

    if (!paradiseSection || !featuredSection || !spotlightSection) {
        console.error('One or more timeline sections not found');
        return;
    }

    const paradiseTabs = paradiseSection.querySelectorAll('.paradise-tab');
    const paradiseDots = paradiseSection.querySelectorAll('.timeline-dot');
    const paradiseDescription = document.getElementById('paradise-description');
    let currentParadiseTab = 'creation';
    let currentParadiseIndex = 0;

    const featuredDots = featuredSection.querySelectorAll('.timeline-dot');
    const featuredDescription = document.getElementById('featured-description');
    let currentFeaturedIndex = 0;

    const spotlightTabs = spotlightSection.querySelectorAll('.spotlight-tab');
    const spotlightDots = spotlightSection.querySelectorAll('.timeline-dot');
    const spotlightDescription = document.getElementById('spotlight-description');
    let currentSpotlightTab = 'inspired';
    let currentSpotlightIndex = 0;

    function updateParadiseTimeline() {
        if (!window.paradiseEvents || !window.paradiseEvents[currentParadiseTab]) {
            console.error(`Invalid or missing paradiseEvents for tab: ${currentParadiseTab}`, window.paradiseEvents);
            paradiseDescription.innerHTML = `
                <h3 class="timeline-event-title">No Content</h3>
                <p>No content available for this selection.</p>
            `;
            paradiseDots.forEach(dot => dot.classList.remove('active'));
            if (paradiseDots[0]) paradiseDots[0].classList.add('active');
            return;
        }
        const events = window.paradiseEvents[currentParadiseTab];
        if (!events[currentParadiseIndex]) {
            console.warn(`No event at index ${currentParadiseIndex} for tab ${currentParadiseTab}`);
            currentParadiseIndex = 0; // Reset to first event
        }
        paradiseDots.forEach(dot => dot.classList.remove('active'));
        if (paradiseDots[currentParadiseIndex]) {
            paradiseDots[currentParadiseIndex].classList.add('active');
        }
        const event = events[currentParadiseIndex] || { title: 'No Content', text: 'No content available.' };
        paradiseDescription.style.opacity = '0';
        setTimeout(() => {
            paradiseDescription.innerHTML = `
                <h3 class="timeline-event-title">${event.title || 'No Title'}</h3>
                <p>${event.text || event.description || 'No description available.'}</p>
            `;
            paradiseDescription.style.opacity = '1';
        }, 300);
    }

    function updateFeaturedTimeline() {
        if (!window.featuredEvents || !window.featuredEvents.length) {
            console.error('Invalid or missing featuredEvents', window.featuredEvents);
            featuredDescription.innerHTML = `
                <h3 class="timeline-event-title">No Content</h3>
                <p>No content available for this selection.</p>
            `;
            featuredDots.forEach(dot => dot.classList.remove('active'));
            if (featuredDots[0]) featuredDots[0].classList.add('active');
            return;
        }
        const events = window.featuredEvents;
        if (!events[currentFeaturedIndex]) {
            console.warn(`No event at index ${currentFeaturedIndex} for featuredEvents`);
            currentFeaturedIndex = 0; // Reset to first event
        }
        featuredDots.forEach(dot => dot.classList.remove('active'));
        if (featuredDots[currentFeaturedIndex]) {
            featuredDots[currentFeaturedIndex].classList.add('active');
        }
        const event = events[currentFeaturedIndex] || { title: 'No Content', text: 'No content available.' };
        featuredDescription.style.opacity = '0';
        setTimeout(() => {
            featuredDescription.innerHTML = `
                <h3 class="timeline-event-title">${event.title || 'No Title'}</h3>
                <p>${event.text || event.description || 'No description available.'}</p>
            `;
            featuredDescription.style.opacity = '1';
        }, 300);
    }

    function updateSpotlightTimeline() {
        if (!window.spotlightEvents || !window.spotlightEvents[currentSpotlightTab]) {
            console.error(`Invalid or missing spotlightEvents for tab: ${currentSpotlightTab}`, window.spotlightEvents);
            spotlightDescription.innerHTML = `
                <h3 class="timeline-event-title">No Content</h3>
                <p>No content available for this selection.</p>
            `;
            spotlightDots.forEach(dot => dot.classList.remove('active'));
            if (spotlightDots[0]) spotlightDots[0].classList.add('active');
            return;
        }
        const events = window.spotlightEvents[currentSpotlightTab];
        if (!events[currentSpotlightIndex]) {
            console.warn(`No event at index ${currentSpotlightIndex} for tab ${currentSpotlightTab}`);
            currentSpotlightIndex = 0; // Reset to first event
        }
        spotlightDots.forEach(dot => dot.classList.remove('active'));
        if (spotlightDots[currentSpotlightIndex]) {
            spotlightDots[currentSpotlightIndex].classList.add('active');
        }
        const event = events[currentSpotlightIndex] || { title: 'No Content', text: 'No content available.' };
        spotlightDescription.style.opacity = '0';
        setTimeout(() => {
            spotlightDescription.innerHTML = `
                <h3 class="timeline-event-title">${event.title || 'No Title'}</h3>
                <p>${event.text || event.description || 'No description available.'}</p>
            `;
            spotlightDescription.style.opacity = '1';
        }, 300);
    }

    function toggleGlow(section) {
        [paradiseSection, featuredSection, spotlightSection].forEach(s => s.removeAttribute('data-glow'));
        section.setAttribute('data-glow', 'true');
        setTimeout(() => section.removeAttribute('data-glow'), 300);
    }

    paradiseTabs.forEach(tab => {
        tab.style.pointerEvents = 'auto';
        tab.style.zIndex = '10';
        tab.addEventListener('click', () => {
            paradiseTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentParadiseTab = tab.getAttribute('data-tab');
            currentParadiseIndex = 0;
            updateParadiseTimeline();
            toggleGlow(paradiseSection);
        });
    });

    paradiseDots.forEach(dot => {
        dot.style.pointerEvents = 'auto';
        dot.style.zIndex = '10';
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            const events = window.paradiseEvents && window.paradiseEvents[currentParadiseTab] ? window.paradiseEvents[currentParadiseTab] : [];
            if (index < events.length) {
                currentParadiseIndex = index;
                updateParadiseTimeline();
            }
        });
    });

    featuredDots.forEach(dot => {
        dot.style.pointerEvents = 'auto';
        dot.style.zIndex = '10';
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            const events = window.featuredEvents || [];
            if (index < events.length) {
                currentFeaturedIndex = index;
                updateFeaturedTimeline();
            }
        });
    });

    spotlightTabs.forEach(tab => {
        tab.style.pointerEvents = 'auto';
        tab.style.zIndex = '10';
        tab.addEventListener('click', () => {
            spotlightTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentSpotlightTab = tab.getAttribute('data-tab');
            currentSpotlightIndex = 0;
            updateSpotlightTimeline();
            toggleGlow(spotlightSection);
        });
    });

    spotlightDots.forEach(dot => {
        dot.style.pointerEvents = 'auto';
        dot.style.zIndex = '10';
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            const events = window.spotlightEvents && window.spotlightEvents[currentSpotlightTab] ? window.spotlightEvents[currentSpotlightTab] : [];
            if (index < events.length) {
                currentSpotlightIndex = index;
                updateSpotlightTimeline();
            }
        });
    });

    // Initialize timelines with first tabs active
    if (paradiseTabs[0]) paradiseTabs[0].classList.add('active');
    if (spotlightTabs[0]) spotlightTabs[0].classList.add('active');
    updateParadiseTimeline();
    updateFeaturedTimeline();
    updateSpotlightTimeline();

    // Ensure sections are interactive
    paradiseSection.style.pointerEvents = 'auto';
    paradiseSection.style.zIndex = '5';
    featuredSection.style.pointerEvents = 'auto';
    featuredSection.style.zIndex = '5';
    spotlightSection.style.pointerEvents = 'auto';
    spotlightSection.style.zIndex = '5';
}

document.addEventListener('DOMContentLoaded', () => {
    if (sortedLessons.length) {
        populateList('just', 'just');
    }
    showTab('home');
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('copyright').addEventListener('click', () => {
        const year = new Date().getFullYear();
        const copyright = document.getElementById('copyright');
        if (copyright.textContent.includes('All rights reserved')) {
            copyright.textContent = `© ${year} Just Wise Love`;
        } else {
            copyright.textContent = `© ${year} Just Wise Love. All rights reserved.`;
        }
    });
    document.querySelectorAll('.intro-link').forEach(link => {
        link.addEventListener('click', () => showTab(link.textContent.toLowerCase()));
        link.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') showTab(link.textContent.toLowerCase());
        });
    });

    // Initialize Weekly Family Worship
    populateWorshipSection();
    scheduleDateUpdate();
    const expandCollapseBtn = document.getElementById('expand-collapse-btn');
    if (expandCollapseBtn) {
        expandCollapseBtn.addEventListener('click', populateAllDates);
    }
});

// Make theme stay when the page is refreshed
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const themeStylesheet = document.getElementById('theme-stylesheet');
    document.body.setAttribute('data-theme', savedTheme);
    themeStylesheet.setAttribute('href', `${savedTheme}.css`);
});
