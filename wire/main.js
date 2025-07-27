// main.js

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

// Function to get the next Friday's date
function getNextFriday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    return nextFriday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// Function to schedule Saturday 9 AM EST update
function scheduleSaturdayUpdate() {
    const now = new Date();
    const nextSaturday = new Date(now);
    nextSaturday.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7 || 7));
    nextSaturday.setHours(9, 0, 0, 0); // Set to 9 AM EST
    const timeUntilSaturday = nextSaturday - now;

    if (timeUntilSaturday <= 0) {
        // If it's past 9 AM Saturday, schedule for next week
        nextSaturday.setDate(nextSaturday.getDate() + 7);
    }

    setTimeout(() => {
        populateFamilyWorship(false); // Update to next Friday
        setInterval(() => {
            populateFamilyWorship(false); // Weekly update
        }, 7 * 24 * 60 * 60 * 1000); // Every week
    }, timeUntilSaturday);
}

// Function to populate Family Worship section
function populateFamilyWorship(isExpanded = false) {
    const familySection = document.getElementById('family-worship-section');
    const dateDisplay = document.getElementById('family-worship-date');
    const contentDisplay = document.getElementById('family-worship-content');
    const toggleButton = document.getElementById('family-worship-toggle');

    if (!familySection || !dateDisplay || !contentDisplay || !toggleButton) {
        console.error('Family worship elements not found:', {
            familySection: !!familySection,
            dateDisplay: !!dateDisplay,
            contentDisplay: !!contentDisplay,
            toggleButton: !!toggleButton
        });
        return;
    }

    console.log('Populating Family Worship, isExpanded:', isExpanded);

    const nextFriday = getNextFriday();
    dateDisplay.textContent = nextFriday;

    contentDisplay.innerHTML = '';

    if (isExpanded) {
        // Display all dates, each expandable
        sortedFamily.forEach(item => {
            const dateWrapper = document.createElement('div');
            dateWrapper.className = 'lesson lesson-card';
            dateWrapper.innerHTML = `
                <div class="lesson-header">
                    <h3>${item.D}</h3>
                </div>
                <div class="lesson-content" style="display: none;">
                    ${item.T && item.R ? `<h4>${item.T}</h4><p>${item.R}</p>` : ''}
                    ${item.T1 && item.R1 ? `<h4>${item.T1}</h4><p>${item.R1}</p>` : ''}
                    ${item.T2 && item.R2 ? `<h4>${item.T2}</h4><p>${item.R2}</p>` : ''}
                    ${item.T3 && item.R3 ? `<h4>${item.T3}</h4><p>${item.R3}</p>` : ''}
                    ${item.T4 && item.R4 ? `<h4>${item.T4}</h4><p>${item.R4}</p>` : ''}
                </div>
            `;
            contentDisplay.appendChild(dateWrapper);

            const header = dateWrapper.querySelector('.lesson-header');
            const content = dateWrapper.querySelector('.lesson-content');
            header.addEventListener('click', () => {
                const isContentExpanded = content.style.display === 'block';
                content.style.display = isContentExpanded ? 'none' : 'block';
                dateWrapper.dataset.expanded = !isContentExpanded;
                console.log('Toggled date:', item.D, 'Expanded:', !isContentExpanded);
            });
        });
        toggleButton.textContent = 'COLLAPSE';
    } else {
        // Display only the upcoming Friday's content
        const targetItem = sortedFamily.find(item => item.D === nextFriday) || sortedFamily[0];
        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'lesson lesson-card';
        itemWrapper.innerHTML = `
            <div class="lesson-content" style="display: block;">
                ${targetItem.T && targetItem.R ? `<h4>${targetItem.T}</h4><p>${targetItem.R}</p>` : ''}
                ${targetItem.T1 && targetItem.R1 ? `<h4>${targetItem.T1}</h4><p>${targetItem.R1}</p>` : ''}
                ${targetItem.T2 && targetItem.R2 ? `<h4>${targetItem.T2}</h4><p>${targetItem.R2}</p>` : ''}
                ${targetItem.T3 && targetItem.R3 ? `<h4>${targetItem.T3}</h4><p>${targetItem.R3}</p>` : ''}
                ${targetItem.T4 && targetItem.R4 ? `<h4>${targetItem.T4}</h4><p>${targetItem.R4}</p>` : ''}
            </div>
        `;
        contentDisplay.appendChild(itemWrapper);
        toggleButton.textContent = 'EXPAND';
    }

    // Use addEventListener to ensure robust event handling
    toggleButton.removeEventListener('click', toggleButton._clickHandler); // Remove any existing listener
    toggleButton._clickHandler = () => {
        console.log('Toggle button clicked, current isExpanded:', isExpanded);
        populateFamilyWorship(!isExpanded);
    };
    toggleButton.addEventListener('click', toggleButton._clickHandler);
}

function populateList(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID ${containerId} not found`);
        return;
    }

    container.innerHTML = '';
    if (category === 'just') {
        categories[category].forEach((item, index) => {
            const lessonNum = index + 1;
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';
            itemWrapper.innerHTML = `
                <div class="lesson-number">${lessonNum}</div>
                <div class="lesson-header">
                    <h3>${item.title || 'Untitled'}</h3>
                </div>
                <div class="lesson-content" style="display: none;">
                    ${item.S ? `<div class="scripture-section"><ul>${item.S.map(s => `<li>${s}</li>`).join('')}</ul></div>` : ''}
                    <div class="description-section">${item.description || ''}</div>
                    ${item.question ? `<p><strong>Question:</strong> ${item.question}</p><textarea placeholder="Write your answer here..."></textarea>` : ''}
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

            const textarea = itemWrapper.querySelector('textarea');
            if (textarea) {
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
    } else if (category === 'wise' || category === 'love') {
        categories[category].forEach(item => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'lesson lesson-card';
            const title = item.T || item.title || 'Untitled';
            const scriptures = item.S ? item.S.map(s => `<li>${s}</li>`).join('') : '';
            const description = item.D || item.content || item.description || '';
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
    const totalLessons = sortedLessons.length;
    const completedLessons = document.querySelectorAll('.lesson-card[data-clicked]').length;
    const progressElement = document.getElementById('progress');
    if (progressElement) {
        progressElement.textContent = `${completedLessons}/${totalLessons}`;
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
        populateFamilyWorship(false); // Initialize family worship on home tab
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
            const titleB = (b.item.T || b.item.title || '').toLowerCase();
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
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    themeStylesheet.setAttribute('href', `${newTheme}.css`);
    localStorage.setItem('theme', newTheme);
}

function initializeTimelines() {
    const paradiseTabs = document.querySelectorAll('#paradise-section .paradise-tab');
    const paradiseDots = document.querySelectorAll('#paradise-section .timeline-dot');
    const paradiseDescription = document.getElementById('paradise-description');

    const featuredDots = document.querySelectorAll('#featured-section .timeline-dot');
    const featuredDescription = document.getElementById('featured-description');

    const spotlightTabs = document.querySelectorAll('#spotlight-section .spotlight-tab');
    const spotlightDots = document.querySelectorAll('#spotlight-section .timeline-dot');
    const spotlightDescription = document.getElementById('spotlight-description');

    const paradiseContent = {
        creation: {
            title: "The Beginning of Creation",
            description: "Jehovah created Adam and Eve in his image, perfect and with free will, to live in the Garden of Eden forever. Genesis 1:27-28 states, “God created man in his image... and said to them: ‘Be fruitful and become many.’”"
        },
        prophecy: {
            title: "Prophecy of Hope",
            description: "Genesis 3:15 foretells a seed to crush Satan, promising restoration. Jehovah’s purpose unfolds through prophecies like Isaiah 9:6-7, ensuring a Messiah to bring peace, guiding us toward paradise."
        },
        sacrifice: {
            title: "Sacrifice for Salvation",
            description: "Jesus’ ransom sacrifice, foretold in Isaiah 53:5, fulfills Jehovah’s purpose. John 3:16 shows His love, offering eternal life through faith in Christ’s sacrifice, redeeming mankind."
        },
        paradise: {
            title: "Paradise Restored",
            description: "Revelation 21:1-4 promises a new earth with no pain or death. Jehovah will restore paradise, fulfilling His original purpose for a perfect human family living forever."
        }
    };

    const featuredContent = [
        {
            title: "God or Government?",
            description: "Human governments promise security but often lead to oppression and failure, as Psalm 146:3 warns, “Do not put your trust in princes, in whom there is no salvation.” Jehovah’s Kingdom offers eternal peace, fulfilling Daniel 2:44."
        },
        {
            title: "Free Will or Fate?",
            description: "Deuteronomy 30:19 urges choosing life through obedience to Jehovah. Unlike fatalistic beliefs, free will allows us to align with His purpose, securing eternal blessings in paradise."
        },
        {
            title: "Science or Scripture?",
            description: "Romans 1:20 reveals Jehovah’s qualities through creation, harmonizing with true science. Scripture, inspired by God (2 Timothy 3:16), guides us to truth and eternal life."
        },
        {
            title: "Fear or Faith?",
            description: "Psalm 23:4 assures Jehovah’s comfort, overcoming fear. Faith, as Hebrews 11:6 states, trusts His promises, guiding us through trials toward a paradise of peace."
        },
        {
            title: "Money or Meaning?",
            description: "Ecclesiastes 5:10 warns money never satisfies. Matthew 6:33 prioritizes seeking Jehovah’s Kingdom, offering true meaning and eternal life in a restored paradise."
        },
        {
            title: "Death or Deliverance?",
            description: "John 5:28-29 promises resurrection. Jehovah’s deliverance through Christ defeats death, ensuring faithful ones inherit eternal life in a world free of sorrow."
        },
        {
            title: "Hate or Hope?",
            description: "1 John 4:8 teaches God is love, inspiring hope. Unlike worldly hate, Jehovah’s Kingdom brings unity and peace, fulfilling Psalm 37:11 for the meek."
        },
        {
            title: "Chaos or Christ?",
            description: "Colossians 1:16-17 shows Christ’s role in creation and salvation. His rulership brings order, leading to paradise where Jehovah’s purpose triumphs over chaos."
        }
    ];

    const spotlightContent = {
        inspired: {
            title: "Historical Support",
            description: "The Bible’s historical accuracy is confirmed by archaeological evidence like the Tel Dan Stele (2 Samuel 8:13) and Lachish Letters (Jeremiah 34:7), proving its reliability as Jehovah’s Word."
        },
        translated: {
            title: "Accurate Translation",
            description: "The New World Translation restores Jehovah’s name (Psalm 83:18) and reflects original texts, ensuring clarity and truth for millions across 1,100+ languages."
        },
        organized: {
            title: "Global Organization",
            description: "Jehovah’s Witnesses, active in 240 lands, fulfill Matthew 24:14 by preaching the Kingdom. Their unity and love reflect Jehovah’s guidance (John 13:35)."
        },
        restored: {
            title: "Restored Truth",
            description: "Acts 3:21 speaks of restoring truth. Jehovah’s people reject false doctrines, embracing pure worship to prepare for eternal life in paradise."
        }
    };

    paradiseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            paradiseTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabType = tab.getAttribute('data-tab');
            const content = paradiseContent[tabType];
            paradiseDescription.innerHTML = `
                <h3 class="timeline-event-title">${content.title}</h3>
                <p>${content.description}</p>
            `;
            paradiseDots.forEach(dot => dot.classList.remove('active'));
            const dotIndex = Array.from(paradiseTabs).indexOf(tab);
            paradiseDots[dotIndex].classList.add('active');
        });
    });

    paradiseDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            paradiseDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            const tab = paradiseTabs[index];
            tab.click();
        });
    });

    featuredDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            featuredDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            const content = featuredContent[index];
            featuredDescription.innerHTML = `
                <h3 class="timeline-event-title">${content.title}</h3>
                <p>${content.description}</p>
            `;
        });
    });

    spotlightTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            spotlightTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabType = tab.getAttribute('data-tab');
            const content = spotlightContent[tabType];
            spotlightDescription.innerHTML = `
                <h3 class="timeline-event-title">${content.title}</h3>
                <p>${content.description}</p>
            `;
            spotlightDots.forEach(dot => dot.classList.remove('active'));
            const dotIndex = Array.from(spotlightTabs).indexOf(tab);
            spotlightDots[dotIndex].classList.add('active');
        });
    });

    spotlightDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            spotlightDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            const tab = spotlightTabs[index];
            tab.click();
        });
    });
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
    scheduleSaturdayUpdate(); // Start the Saturday update schedule
});

// Make theme stay when the page is refreshed
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const themeStylesheet = document.getElementById('theme-stylesheet');
    document.body.setAttribute('data-theme', savedTheme);
    themeStylesheet.setAttribute('href', `${savedTheme}.css`);
});
