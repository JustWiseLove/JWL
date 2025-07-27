// main.js

import lessons from './lessons.js';
import people from './people.js';
import articles from './articles.js';
import sections from './sections.js';
import topics from './topics.js';
import family from './family.js';
import featuredEvents from './featured.js';

let sortedLessons = [];
let sortedPeople = [];
let sortedArticles = [];
let sortedSections = [];
let sortedTopics = [];
let sortedFamily = [];

try {
    sortedLessons = (lessons || []).slice().sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    sortedPeople = (people || []).slice().sort((a, b) => (a.T || '').localeCompare(b.T || ''));
    sortedArticles = (articles || []).slice().sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    sortedSections = (sections || []).slice().sort((a, b) => (a.T || '').localeCompare(b.T || ''));
    sortedTopics = (topics || []).slice().sort((a, b) => (a.T || '').localeCompare(b.T || ''));
    sortedFamily = (family || []).slice().sort((a, b) => new Date(a.D) - new Date(b.D));
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
    const now = new Date();
    const estOffset = -5 * 60; // EST is UTC-5
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const estNow = new Date(utc + (estOffset * 60000));

    // Check if it's Saturday after 9 AM EST
    const isSaturdayAfter9AM = estNow.getDay() === 6 && estNow.getHours() >= 9;

    // Find next Friday
    let daysUntilFriday = (5 - estNow.getDay() + 7) % 7;
    if (daysUntilFriday === 0) {
        daysUntilFriday = isSaturdayAfter9AM ? 7 : 0; // If today is Friday after 9 AM, use next Friday
    }
    const nextFriday = new Date(estNow);
    nextFriday.setDate(estNow.getDate() + daysUntilFriday);

    // Format date as "Month Day, Year"
    return nextFriday.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

function populateFamilyWorship() {
    const familyContent = document.getElementById('family-content');
    const toggleButton = document.getElementById('family-toggle');
    if (!familyContent || !toggleButton) {
        console.error('Family content or toggle button not found');
        return;
    }

    const nextFriday = getNextFriday();
    familyContent.innerHTML = '';

    // Find the entry for the next Friday
    const upcomingEntry = sortedFamily.find(item => item.D === nextFriday) || { D: nextFriday, T: 'No Topic', R: 'No content available.' };

    // Populate upcoming Friday's content
    const upcomingItem = document.createElement('div');
    upcomingItem.className = 'family-item upcoming';
    upcomingItem.innerHTML = `
        <div class="family-date">${upcomingEntry.D}</div>
        <h3>${upcomingEntry.T || 'No Topic'}</h3>
        <p>${upcomingEntry.R || 'No content available.'}</p>
        ${upcomingEntry.T1 ? `<h3>${upcomingEntry.T1}</h3><p>${upcomingEntry.R1}</p>` : ''}
        ${upcomingEntry.T2 ? `<h3>${upcomingEntry.T2}</h3><p>${upcomingEntry.R2}</p>` : ''}
        ${upcomingEntry.T3 ? `<h3>${upcomingEntry.T3}</h3><p>${upcomingEntry.R3}</p>` : ''}
        ${upcomingEntry.T4 ? `<h3>${upcomingEntry.T4}</h3><p>${upcomingEntry.R4}</p>` : ''}
    `;
    familyContent.appendChild(upcomingItem);

    // Add event listener for toggle button
    toggleButton.addEventListener('click', () => {
        const isExpanded = familyContent.classList.contains('expanded');
        familyContent.classList.toggle('expanded');
        familyContent.classList.toggle('collapsed', !isExpanded);
        toggleButton.textContent = isExpanded ? 'EXPAND' : 'COLLAPSE';

        if (isExpanded) {
            // Remove all but upcoming item
            familyContent.innerHTML = '';
            familyContent.appendChild(upcomingItem);
        } else {
            // Populate all dates
            familyContent.innerHTML = '';
            sortedFamily.forEach(item => {
                const itemWrapper = document.createElement('div');
                itemWrapper.className = `family-item ${item.D === nextFriday ? 'upcoming' : ''}`;
                itemWrapper.innerHTML = `
                    <div class="family-date">${item.D}</div>
                    <div class="family-content-details" style="display: none;">
                        <h3>${item.T || 'No Topic'}</h3>
                        <p>${item.R || 'No content available.'}</p>
                        ${item.T1 ? `<h3>${item.T1}</h3><p>${item.R1}</p>` : ''}
                        ${item.T2 ? `<h3>${item.T2}</h3><p>${item.R2}</p>` : ''}
                        ${item.T3 ? `<h3>${item.T3}</h3><p>${item.R3}</p>` : ''}
                        ${item.T4 ? `<h3>${item.T4}</h3><p>${item.R4}</p>` : ''}
                    </div>
                `;
                familyContent.appendChild(itemWrapper);

                // Add click event to toggle details
                const dateHeader = itemWrapper.querySelector('.family-date');
                const contentDetails = itemWrapper.querySelector('.family-content-details');
                dateHeader.addEventListener('click', () => {
                    const isExpanded = contentDetails.style.display === 'block';
                    contentDetails.style.display = isExpanded ? 'none' : 'block';
                    itemWrapper.dataset.expanded = !isExpanded;
                });
            });
        }
    });

    // Initialize as collapsed
    familyContent.classList.add('collapsed');
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
        populateFamilyWorship();
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
        ['just', 'wise', 'love', 'family'].forEach(category => {
            const items = category === 'family' ? sortedFamily : categories[category];
            items.forEach(item => {
                const title = (item.T || item.title || '').toLowerCase();
                const scriptures = (item.S || []).join(' ').toLowerCase();
                const description = (item.D || item.content || item.description || item.R || '').toLowerCase();
                const additionalTitles = [item.T1, item.T2, item.T3, item.T4].filter(t => t).join(' ').toLowerCase();
                const additionalResearch = [item.R1, item.R2, item.R3, item.R4].filter(r => r).join(' ').toLowerCase();

                if (title.includes(searchTerm) || additionalTitles.includes(searchTerm)) {
                    matches.push({ category, item, isTitleMatch: true });
                } else if (scriptures.includes(searchTerm) || description.includes(searchTerm) || additionalResearch.includes(searchTerm)) {
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
            const title = item.T || item.title || 'Untitled';
            const scriptures = item.S ? item.S.map(s => `<li>${highlightText(s, searchTerm)}</li>`).join('') : '';
            const description = item.D || item.content || item.description || item.R || '';
            itemWrapper.innerHTML = `
                <div class="lesson-header">
                    <h3>${highlightText(title, searchTerm)}</h3>
                    ${category === 'family' ? `<div class="family-date">${item.D}</div>` : ''}
                </div>
                <div class="lesson-content" style="display: none;">
                    ${scriptures ? `<div class="scripture-section"><ul>${scriptures}</ul></div>` : ''}
                    <div class="description-section">${highlightText(description, searchTerm)}</div>
                    ${category === 'family' && item.T1 ? `<h3>${highlightText(item.T1, searchTerm)}</h3><p>${highlightText(item.R1, searchTerm)}</p>` : ''}
                    ${category === 'family' && item.T2 ? `<h3>${highlightText(item.T2, searchTerm)}</h3><p>${highlightText(item.R2, searchTerm)}</p>` : ''}
                    ${category === 'family' && item.T3 ? `<h3>${highlightText(item.T3, searchTerm)}</h3><p>${highlightText(item.R3, searchTerm)}</p>` : ''}
                    ${category === 'family' && item.T4 ? `<h3>${highlightText(item.T4, searchTerm)}</h3><p>${highlightText(item.R4, searchTerm)}</p>` : ''}
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

function scheduleFamilyWorshipUpdate() {
    const now = new Date();
    const estOffset = -5 * 60; // EST is UTC-5
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const estNow = new Date(utc + (estOffset * 60000));

    // Calculate time until next Saturday 9 AM EST
    const targetDay = 6; // Saturday
    let daysUntilSaturday = (targetDay - estNow.getDay() + 7) % 7;
    if (daysUntilSaturday === 0 && estNow.getHours() >= 9) {
        daysUntilSaturday = 7; // If today is Saturday after 9 AM, schedule for next week
    }
    const nextSaturday = new Date(estNow);
    nextSaturday.setDate(estNow.getDate() + daysUntilSaturday);
    nextSaturday.setHours(9, 0, 0, 0);

    const msUntilUpdate = nextSaturday.getTime() - estNow.getTime();

    setTimeout(() => {
        populateFamilyWorship();
        // Schedule the next update (weekly)
        setInterval(() => {
            populateFamilyWorship();
        }, 7 * 24 * 60 * 60 * 1000); // Every week
    }, msUntilUpdate);
}

document.addEventListener('DOMContentLoaded', () => {
    if (sortedLessons.length) {
        populateList('just', 'just');
    }
    showTab('home');
    scheduleFamilyWorshipUpdate();
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
});

// Make theme stay when the page is refreshed
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark if no theme is saved
    const themeStylesheet = document.getElementById('theme-stylesheet');
    document.body.setAttribute('data-theme', savedTheme);
    themeStylesheet.setAttribute('href', `${savedTheme}.css`);
});
