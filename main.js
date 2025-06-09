// main.js

// Global variables and initialization
// Sorted categories for display
let sortedLaunch = [];
let sortedTopics = [];
let sortedPeople = [];

try {
    sortedLaunch = launch.slice().sort((a, b) => a.T.localeCompare(b.T));
    sortedTopics = topics.slice().sort((a, b) => a.T.localeCompare(b.T));
    sortedPeople = people.slice().sort((a, b) => a.T.localeCompare(b.T));
} catch (e) {
    console.error('Error initializing sorted arrays:', e);
}

// Category mapping for easy access
const categories = {
    'launch': sortedLaunch,
    'topics': sortedTopics,
    'people': sortedPeople
};

// Debounce timeout for search input
let debounceTimeout;

// Hamburger Menu Functions
// Toggles visibility of the specified hamburger menu
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
}

// Closes hamburger menus when clicking outside
function closeMenusOnOutsideClick(event) {
    const menus = document.querySelectorAll('.hamburger-menu');
    const hamburgers = document.querySelectorAll('.hamburger');
    let clickInside = false;
    hamburgers.forEach(hamburger => {
        if (hamburger.contains(event.target)) clickInside = true;
    });
    if (!clickInside) {
        menus.forEach(menu => menu.style.display = 'none');
    }
}

// Navigation Functions
// Redirects to the home page
function goToHome() {
    window.location.href = 'index.html';
}

// Tab Management Functions
// Resets the view to show no tabs by default
function resetView() {
    console.log('Resetting view');
    const searchResults = document.getElementById('search-results');
    if (searchResults) searchResults.remove();
    const searchTerm = document.getElementById('search')?.value.toLowerCase() || '';

    // Populate each category with items
    Object.keys(categories).forEach(category => {
        const itemList = document.getElementById(category);
        if (!itemList) return;
        itemList.innerHTML = ''; // Clear existing items
        categories[category].forEach(item => {
            if (!item || !item.T) return; // Skip invalid items
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            const itemButton = document.createElement('button');
            itemButton.className = 'item-button';
            itemButton.innerHTML = searchTerm ? 
                item.T.replace(new RegExp(`(${searchTerm})`, 'gi'), '<span class="highlight">$1</span>') : 
                item.T;
            const content = document.createElement('div');
            content.className = 'content';
            const scriptures = (item.S || []).map(scripture => 
                searchTerm ? 
                    scripture.replace(new RegExp(`(${searchTerm})`, 'gi'), '<span class="highlight">$1</span>') : 
                    scripture
            );
            const description = searchTerm && item.D ? 
                item.D.replace(new RegExp(`(${searchTerm})`, 'gi'), '<span class="highlight">$1</span>') : 
                item.D || '';
            content.innerHTML = `
                <div class="scripture-section"><ul>${scriptures.map(s => `<li>${s}</li>`).join('')}</ul></div>
                <div class="description-section">${description}</div>
            `;
            content.style.display = 'none';
            itemDiv.appendChild(itemButton);
            itemList.appendChild(itemDiv);
            itemList.appendChild(content);
            itemButton.addEventListener('click', () => {
                console.log(`Clicked ${item.T}, isOpen: ${content.style.display === 'block'}`);
                const isOpen = content.style.display === 'block';
                document.querySelectorAll('.content').forEach(c => {
                    c.style.display = 'none';
                });
                if (!isOpen) {
                    content.style.display = 'block';
                }
            });
        });
    });

    // Hide all tabs and remove active/highlight classes
    document.querySelectorAll('.list').forEach(section => section.style.display = 'none');
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active', 'match-highlight'));
}

// Switches to the specified tab and handles search state
function showTab(category) {
    console.log(`Switching to tab: ${category}`);
    const searchTerm = document.getElementById('search')?.value.toLowerCase() || '';
    const searchResults = document.getElementById('search-results');

    // If there's a search term and results, update tab buttons only
    if (searchTerm && searchResults) {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active', 'match-highlight'));
        const tabButton = document.querySelector(`[onclick="showTab('${category}')"]`);
        if (tabButton) tabButton.classList.add('active');
        highlightMatchingTabs(searchTerm);
        return;
    }

    // Normal tab switching: hide all content, show selected tab
    document.querySelectorAll('.content').forEach(c => {
        c.style.display = 'none';
    });
    if (searchResults) searchResults.remove();
    document.querySelectorAll('.list').forEach(section => section.style.display = 'none');
    const selectedTab = document.getElementById(category);
    if (selectedTab) selectedTab.style.display = 'grid';
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active', 'match-highlight'));
    const tabButton = document.querySelector(`[onclick="showTab('${category}')"]`);
    if (tabButton) tabButton.classList.add('active');

    // Highlight tabs with matching content if search term exists
    if (searchTerm) {
        highlightMatchingTabs(searchTerm);
    }
}

// Highlights tabs that have items matching the search term
function highlightMatchingTabs(searchTerm) {
    const categoriesWithMatches = new Set();
    Object.keys(categories).forEach(cat => {
        const items = categories[cat];
        items.forEach(item => {
            if (!item || !item.T) return;
            const titleMatch = item.T.toLowerCase().includes(searchTerm);
            const scripturesText = (item.S || []).join(' ').toLowerCase();
            const descriptionText = (item.D || '').toLowerCase();
            const contentMatch = scripturesText.includes(searchTerm) || descriptionText.includes(searchTerm);
            if (titleMatch || contentMatch) {
                categoriesWithMatches.add(cat);
            }
        });
    });
    categoriesWithMatches.forEach(cat => {
        const tabButton = document.querySelector(`[onclick="showTab('${cat}')"]`);
        if (tabButton) tabButton.classList.add('match-highlight');
    });
}

// Search Functions
// Creates and appends a search results list
function createSearchResults(input) {
    const allList = document.createElement('div');
    allList.className = 'list';
    allList.id = 'search-results';
    const main = document.querySelector('.main-content');
    const existingResults = document.getElementById('search-results');
    if (existingResults) existingResults.remove();
    
    // Find the Bear Book image and insert the search results before it
    const bearImage = main?.querySelector('img[src="BEAR.PNG"]');
    if (bearImage && main) {
        main.insertBefore(allList, bearImage);
    } else {
        // Fallback: append to main content if image or main isn't found
        main?.appendChild(allList);
    }
    return allList;
}

// Filters and sorts items based on search input
function filterAndSortItems(input) {
    const categoriesWithMatches = new Set();
    const matchingItems = [];
    Object.keys(categories).forEach(category => {
        const items = categories[category];
        items.forEach(item => {
            if (!item || !item.T) return;
            const titleMatch = item.T.toLowerCase().includes(input);
            const scripturesText = (item.S || []).join(' ').toLowerCase();
            const descriptionText = (item.D || '').toLowerCase();
            const contentMatch = scripturesText.includes(input) || descriptionText.includes(input);

            if (titleMatch || contentMatch) {
                categoriesWithMatches.add(category);
                // Determine matching content for partial display
                let matchingScriptures = [];
                let matchingDescription = '';
                if (!titleMatch && contentMatch) {
                    // Find matching scriptures
                    matchingScriptures = (item.S || []).filter(s => s.toLowerCase().includes(input));
                    // Split description into paragraphs and find matches
                    const paragraphs = (item.D || '').split('\n').filter(p => p.trim() !== '');
                    matchingDescription = paragraphs.filter(p => p.toLowerCase().includes(input)).join('\n');
                }
                matchingItems.push({ item, category, titleMatch, matchingScriptures, matchingDescription });
            }
        });
        const itemList = document.getElementById(category);
        if (itemList) {
            itemList.querySelectorAll('.item').forEach(itemDiv => {
                const itemTitle = itemDiv.querySelector('.item-button')?.textContent;
                const item = categories[category].find(i => i.T === itemTitle);
                if (!item) return;
                const titleMatch = item.T.toLowerCase().includes(input);
                const scripturesText = (item.S || []).join(' ').toLowerCase();
                const descriptionText = (item.D || '').toLowerCase();
                itemDiv.style.display = (titleMatch || scripturesText.includes(input) || descriptionText.includes(input)) ? '' : 'none';
            });
        }
    });

    // Sort items: exact matches first, then alphabetically
    matchingItems.sort((a, b) => {
        const aText = `${a.item.T} ${(a.item.S || []).join(' ')} ${a.item.D || ''}`.toLowerCase();
        const bText = `${b.item.T} ${(b.item.S || []).join(' ')} ${b.item.D || ''}`.toLowerCase();
        const aIsExact = aText === input || a.item.T.toLowerCase() === input || (a.item.S || []).some(s => s.toLowerCase() === input) || (a.item.D || '').toLowerCase() === input;
        const bIsExact = bText === input || b.item.T.toLowerCase() === input || (b.item.S || []).some(s => s.toLowerCase() === input) || (b.item.D || '').toLowerCase() === input;
        if (aIsExact && !bIsExact) return -1;
        if (!aIsExact && bIsExact) return 1;
        return a.item.T.localeCompare(b.item.T);
    });

    return { matchingItems, categoriesWithMatches };
}

// Populates search results with matching items
function populateSearchResults(allList, matchingItems, input) {
    if (!allList) return;
    matchingItems.forEach(({ item, category, titleMatch, matchingScriptures, matchingDescription }) => {
        if (!item || !item.T) return;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        const itemButton = document.createElement('button');
        itemButton.className = 'item-button';
        itemButton.innerHTML = item.T.replace(new RegExp(`(${input})`, 'gi'), '<span class="highlight">$1</span>');
        const content = document.createElement('div');
        content.className = 'content';

        if (titleMatch) {
            // Display full content if search term is in the title
            const highlightedScriptures = (item.S || []).map(scripture =>
                scripture.replace(new RegExp(`(${input})`, 'gi'), '<span class="highlight">$1</span>')
            );
            const highlightedDescription = (item.D || '').replace(new RegExp(`(${input})`, 'gi'), '<span class="highlight">$1</span>');
            content.innerHTML = `
                <div class="scripture-section"><ul>${highlightedScriptures.map(s => `<li>${s}</li>`).join('')}</ul></div>
                <div class="description-section">${highlightedDescription}</div>
            `;
        } else {
            // Display only matching scriptures and description paragraphs
            const highlightedScriptures = matchingScriptures.map(scripture =>
                scripture.replace(new RegExp(`(${input})`, 'gi'), '<span class="highlight">$1</span>')
            );
            const paragraphs = matchingDescription.split('\n').filter(p => p.trim() !== '');
            const highlightedDescription = paragraphs.map(p =>
                p.replace(new RegExp(`(${input})`, 'gi'), '<span class="highlight">$1</span>')
            ).map(p => `<p>${p}</p>`).join('');
            content.innerHTML = `
                ${highlightedScriptures.length ? `<div class="scripture-section"><ul>${highlightedScriptures.map(s => `<li>${s}</li>`).join('')}</ul></div>` : ''}
                ${highlightedDescription ? `<div class="description-section">${highlightedDescription}</div>` : ''}
            `;
        }

        content.style.display = 'block'; // Keep content open by default for search results
        itemDiv.appendChild(itemButton);
        allList.appendChild(itemDiv);
        allList.appendChild(content);
        itemButton.addEventListener('click', () => {
            console.log(`Clicked ${item.T}, isOpen: ${content.style.display === 'block'}`);
            const isOpen = content.style.display === 'block';
            document.querySelectorAll('.content').forEach(c => {
                c.style.display = 'none';
            });
            if (!isOpen) {
                content.style.display = 'block';
            }
        });
    });
}

// Main search function with debouncing
function searchItems() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const input = document.getElementById('search')?.value.toLowerCase() || '';
        console.log(`Searching for: ${input}`);
        if (!input) {
            resetView();
            return;
        }

        const allList = createSearchResults(input);
        const { matchingItems, categoriesWithMatches } = filterAndSortItems(input);
        populateSearchResults(allList, matchingItems, input);

        // Update tab highlights
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('match-highlight'));
        categoriesWithMatches.forEach(category => {
            const tabButton = document.querySelector(`[onclick="showTab('${category}')"]`);
            if (tabButton) tabButton.classList.add('match-highlight');
        });

        // Show search results and hide other tabs
        document.querySelectorAll('.list').forEach(section => section.style.display = 'none');
        if (allList) allList.style.display = 'grid';
        if (!matchingItems.length) resetView();
    }, 300);
}

// Event Listeners
// Handle search input changes
document.getElementById('search')?.addEventListener('input', () => {
    const input = document.getElementById('search')?.value || '';
    console.log(`Search input changed: ${input}`);
    if (!input) {
        const searchResults = document.getElementById('search-results');
        if (searchResults) searchResults.remove();
        resetView();
    } else {
        searchItems();
    }
});

// Handle clicks outside hamburger menus
document.addEventListener('click', closeMenusOnOutsideClick);

// Initialize the view on page load
resetView();
