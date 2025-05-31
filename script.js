// Group items by alphabetical range
const categories = {
    'a-e': items.filter(item => /^[a-e]/i.test(item.T)),
    'f-j': items.filter(item => /^[f-j]/i.test(item.T)),
    'k-o': items.filter(item => /^[k-o]/i.test(item.T)),
    'p-t': items.filter(item => /^[p-t]/i.test(item.T)),
    'u-z': items.filter(item => /^[u-z]/i.test(item.T))
};

// Function to reset the view
function resetView() {
    console.log('Resetting view');
    document.getElementById('search').value = ''; // Clear search input
    Object.keys(categories).forEach(category => {
        const items = document.getElementById(category).querySelectorAll('.item');
        items.forEach(itemDiv => {
            itemDiv.style.display = '';
            const content = itemDiv.querySelector('.content');
            const button = itemDiv.querySelector('.item-button');
            const item = categories[category][Array.from(items).indexOf(itemDiv)];
            content.innerHTML = `
                <div class="scripture-section"><ul>${item.S.map(scripture => `<li>${scripture}</li>`).join('')}</ul></div>
                <div class="description-section">${item.D}</div>
            `;
            button.innerHTML = item.T;
            content.style.display = 'none';
        });
    });
    // Clear the "All" tab
    const allList = document.getElementById('all');
    allList.innerHTML = '';
    showTab('all'); // Switch to default "All" tab
}

// Generate item lists for each category
Object.keys(categories).forEach(category => {
    const itemList = document.getElementById(category);
    categories[category].forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        const itemButton = document.createElement('button');
        itemButton.className = 'item-button';
        itemButton.textContent = item.T;

        const content = document.createElement('div');
        content.className = 'content';
        content.innerHTML = `
            <div class="scripture-section"><ul>${item.S.map(scripture => `<li>${scripture}</li>`).join('')}</ul></div>
            <div class="description-section">${item.D}</div>
        `;

        itemDiv.appendChild(itemButton);
        itemDiv.appendChild(content);
        itemList.appendChild(itemDiv);

        itemButton.addEventListener('click', () => {
            console.log(`Clicked ${item.T}, isOpen: ${content.style.display === 'block'}`);
            const isOpen = content.style.display === 'block';
            document.querySelectorAll('.content').forEach(c => c.style.display = 'none');
            if (!isOpen) {
                content.style.display = 'block'; // Open the clicked item
            } else if (document.getElementById('search').value) {
                resetView(); // Reset if closing an item and search is active
            }
        });
    });
});

// Tab switching functionality
function showTab(category) {
    console.log(`Switching to tab: ${category}`);
    document.querySelectorAll('.list').forEach(list => list.style.display = 'none');
    document.getElementById(category).style.display = 'grid';
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active', 'match-highlight'));
    document.querySelector(`[onclick="showTab('${category}')"]`).classList.add('active');
}

// Search functionality
let debounceTimeout;
function searchItems() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const input = document.getElementById('search').value.toLowerCase();
        console.log(`Searching for: ${input}`);
        if (!input) {
            resetView();
            return;
        }

        // Clear the "All" tab
        const allList = document.getElementById('all');
        allList.innerHTML = '';

        // Track categories with matches for tab highlighting
        const categoriesWithMatches = new Set();

        // Collect all matching items
        const matchingItems = [];
        Object.keys(categories).forEach(category => {
            const items = document.getElementById(category).querySelectorAll('.item');
            items.forEach((itemDiv, index) => {
                const item = categories[category][index];
                const titleMatch = item.T.toLowerCase().includes(input);
                const scripturesText = item.S.join(' ').toLowerCase();
                const descriptionText = item.D.toLowerCase();
                const contentMatch = scripturesText.includes(input) || descriptionText.includes(input);

                if (titleMatch || contentMatch) {
                    categoriesWithMatches.add(category);
                    matchingItems.push({ item, category });
                    itemDiv.style.display = ''; // Show in original tab
                } else {
                    itemDiv.style.display = 'none'; // Hide in original tab
                }
            });
        });

        // Sort matching items alphabetically by title
        matchingItems.sort((a, b) => a.item.T.localeCompare(b.item.T));

        // Populate the "All" tab with matching items
        matchingItems.forEach(({ item }) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';

            const itemButton = document.createElement('button');
            itemButton.className = 'item-button';
            itemButton.innerHTML = item.T.replace(new RegExp(`(${input})`, 'gi'), '<span class="highlight">$1</span>');

            const content = document.createElement('div');
            content.className = 'content';
            const highlightedScriptures = item.S.map(scripture =>
                scripture.replace(new RegExp(`(${input})`, 'gi'), '<span class="highlight">$1</span>')
            );
            const highlightedDescription = item.D.replace(new RegExp(`(${input})`, 'gi'), '<span class="highlight">$1</span>');
            content.innerHTML = `
                <div class="scripture-section"><ul>${highlightedScriptures.map(s => `<li>${s}</li>`).join('')}</ul></div>
                <div class="description-section">${highlightedDescription}</div>
            `;
            content.style.display = 'block'; // Open content by default

            itemDiv.appendChild(itemButton);
            itemDiv.appendChild(content);
            allList.appendChild(itemDiv);

            itemButton.addEventListener('click', () => {
                console.log(`Clicked ${item.T}, isOpen: ${content.style.display === 'block'}`);
                const isOpen = content.style.display === 'block';
                document.querySelectorAll('.content').forEach(c => c.style.display = 'none');
                if (!isOpen) {
                    content.style.display = 'block';
                } else if (document.getElementById('search').value) {
                    resetView();
                }
            });
        });

        // Highlight tabs with matches
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('match-highlight'));
        categoriesWithMatches.forEach(category => {
            const tabButton = document.querySelector(`[onclick="showTab('${category}')"]`);
            if (tabButton) {
                tabButton.classList.add('match-highlight');
            }
        });

        // Always show the "All" tab during search
        showTab('all');
        // Scroll to the first matching item
        const firstVisibleItem = allList.querySelector('.item');
        if (firstVisibleItem) {
            firstVisibleItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // If no matches, reset to default view
            resetView();
        }
    }, 300);
}

// Reset display when search is cleared
document.getElementById('search').addEventListener('input', () => {
    const input = document.getElementById('search').value;
    console.log(`Search input changed: ${input}`);
    if (!input) {
        resetView();
    } else {
        searchItems();
    }
});
