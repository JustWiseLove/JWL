// main.js

let sortedLessons = [];
let sortedPeople = [];
let sortedArticles = [];
let sortedSections = [];
let sortedTopics = [];

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

function getNextFriday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const isPastSaturday9AM = dayOfWeek === 6 && (hours > 9 || (hours === 9 && minutes >= 0));
    const daysUntilFriday = isPastSaturday9AM ? (5 + 7 - dayOfWeek) % 7 + 7 : (5 - dayOfWeek + 7) % 7;
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    return nextFriday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function displayFamilyWorship() {
    const dateElement = document.getElementById('family-worship-date');
    const contentElement = document.getElementById('family-worship-content');
    if (!dateElement || !contentElement) {
        console.error('Family worship elements not found');
        return;
    }

    const nextFriday = getNextFriday();
    dateElement.textContent = nextFriday;

    const familyItem = family.find(item => item.D === nextFriday);
    contentElement.innerHTML = '';

    if (!familyItem) {
        contentElement.innerHTML = '<p>No content available for this week.</p>';
        return;
    }

    const topics = [
        { T: familyItem.T, R: familyItem.R },
        familyItem.T1 && familyItem.R1 ? { T: familyItem.T1, R: familyItem.R1 } : null,
        familyItem.T2 && familyItem.R2 ? { T: familyItem.T2, R: familyItem.R2 } : null,
        familyItem.T3 && familyItem.R3 ? { T: familyItem.T3, R: familyItem.R3 } : null,
        familyItem.T4 && familyItem.R4 ? { T: familyItem.T4, R: familyItem.R4 } : null
    ].filter(topic => topic);

    topics.forEach(topic => {
        const topicCard = document.createElement('div');
        topicCard.className = 'lesson lesson-card';
        topicCard.innerHTML = `
            <div class="lesson-header">
                <h3>${topic.T || 'Untitled'}</h3>
            </div>
            <div class="lesson-content" style="display: none;">
                <div class="description-section">${topic.R || ''}</div>
            </div>
        `;
        contentElement.appendChild(topicCard);

        const header = topicCard.querySelector('.lesson-header');
        const content = topicCard.querySelector('.lesson-content');
        header.addEventListener('click', () => {
            const isExpanded = content.style.display === 'block';
            content.style.display = isExpanded ? 'none' : 'block';
            topicCard.dataset.expanded = !isExpanded;
        });
    });
}

function displayAllFamilyDates() {
    const datesElement = document.getElementById('family-worship-dates');
    const expandButton = document.getElementById('family-expand-button');
    if (!datesElement || !expandButton) {
        console.error('Family dates or expand button not found');
        return;
    }

    if (datesElement.style.display === 'block') {
        datesElement.style.display = 'none';
        expandButton.textContent = 'EXPAND';
        displayFamilyWorship();
        return;
    }

    datesElement.innerHTML = '';
    family.forEach(item => {
        const dateCard = document.createElement('div');
        dateCard.className = 'lesson lesson-card';
        dateCard.innerHTML = `
            <div class="lesson-header">
                <h3>${item.D}</h3>
            </div>
            <div class="lesson-content" style="display: none;">
                ${[item.T, item.T1, item.T2, item.T3, item.T4]
                    .filter(t => t)
                    .map((t, i) => `
                        <div class="sub-lesson">
                            <h4>${t}</h4>
                            <p>${item[`R${i > 0 ? i : ''}`] || ''}</p>
                        </div>
                    `).join('')}
            </div>
        `;
        datesElement.appendChild(dateCard);

        const header = dateCard.querySelector('.lesson-header');
        const content = dateCard.querySelector('.lesson-content');
        header.addEventListener('click', () => {
            const isExpanded = content.style.display === 'block';
            content.style.display = isExpanded ? 'none' : 'block';
            dateCard.dataset.expanded = !isExpanded;
        });
    });

    datesElement.style.display = 'block';
    expandButton.textContent = 'COLLAPSE';
}

function highlightText(text, searchTerm) {
    if (!searchTerm || !text) return text || '';
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
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
        displayFamilyWorship();
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

        matches.sort((a, b) => {
            if (a.isTitleMatch && !b.isTitleMatch) return -1;
            if (!a.isTitleMatch && b.isTitleMatch) return 1;
            const titleA = (a.item.T || a.item.title || '').toLowerCase();
            const titleB = (b.item.T || b.title || '').toLowerCase();
            return titleA.localeCompare(titleB);
        });

        matches.forEach(({ category, item }) => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';
            const title = item.T || item.title || 'Untitled';
            const scriptures = item.S ? item.S.map(s => `<li>${highlightText(s, searchTerm)}</li>`).join('') : '';
            const description = item.D || item.content || item.description || '';
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
    const expandButton = document.getElementById('family-expand-button');
    if (expandButton) {
        expandButton.addEventListener('click', displayAllFamilyDates);
    }
    displayFamilyWorship();
});

// Make theme stay when the page is refreshed
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark if no theme is saved
    const themeStylesheet = document.getElementById('theme-stylesheet');
    document.body.setAttribute('data-theme', savedTheme);
    themeStylesheet.setAttribute('href', `${savedTheme}.css`);
});
