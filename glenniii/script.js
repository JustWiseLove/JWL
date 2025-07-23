// script.js
import top from './top.js';

// Function to merge (Expanded) entries with their originals
function mergeExpandedEntries(items) {
  const mergedItems = [];
  const seenTitles = new Set();
  
  // Create a map to group originals and their (Expanded) versions
  const titleMap = new Map();
  items.forEach(item => {
    const baseTitle = item.T.replace(' (Expanded)', '').trim();
    if (!titleMap.has(baseTitle)) {
      titleMap.set(baseTitle, { original: null, expanded: null });
    }
    if (item.T.includes('(Expanded)')) {
      titleMap.get(baseTitle).expanded = item;
    } else {
      titleMap.get(baseTitle).original = item;
    }
  });

  // Process each base title
  titleMap.forEach((entry, baseTitle) => {
    if (entry.expanded && entry.original) {
      // Merge original and expanded
      const mergedScriptures = [
        ...new Set([
          ...(entry.original.S || []),
          ...(entry.expanded.S || [])
        ])
      ].filter(s => s); // Remove duplicates and empty scriptures
      const mergedDescription = [
        entry.original.D[0], // Original description
        entry.expanded.D[0]  // Expanded description
      ].join(' ').split(' ').slice(0, 200).join(' '); // Trim to ~200 words
      
      mergedItems.push({
        T: baseTitle,
        S: mergedScriptures.slice(0, 7), // Limit to 7 scriptures
        D: [mergedDescription]
      });
      seenTitles.add(baseTitle);
    } else if (entry.original) {
      // Keep original if no expanded version
      mergedItems.push(entry.original);
      seenTitles.add(baseTitle);
    } else if (entry.expanded && !seenTitles.has(baseTitle)) {
      // Keep expanded if no original (unlikely in your data)
      mergedItems.push({
        T: baseTitle,
        S: entry.expanded.S.slice(0, 7),
        D: entry.expanded.D
      });
      seenTitles.add(baseTitle);
    }
  });

  // Add remaining items that don’t have (Expanded) versions
  items.forEach(item => {
    const baseTitle = item.T.replace(' (Expanded)', '').trim();
    if (!seenTitles.has(baseTitle)) {
      mergedItems.push(item);
      seenTitles.add(baseTitle);
    }
  });

  // Sort merged items alphabetically
  return mergedItems.sort((a, b) => a.T.localeCompare(b.T));
}

// Make functions globally available for onclick
window.searchItems = function () {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  const results = document.getElementById('results');
  const currentTopic = document.getElementById('current-topic');
  results.innerHTML = '';
  currentTopic.classList.add('hidden');

  // Reset filter buttons
  document.querySelectorAll('.filter-buttons button').forEach(btn => {
    btn.classList.remove('active');
    btn.disabled = false;
  });
  document.getElementById('daily-topic-btn').disabled = false;

  // Use merged items
  const mergedTop = mergeExpandedEntries(top);

  // Highlight filter buttons and collect matches
  const ranges = [
    { id: 'A-H', start: 'A', end: 'H' },
    { id: 'I-P', start: 'I', end: 'P' },
    { id: 'Q-Z', start: 'Q', end: 'Z' }
  ];

  const titleMatches = [];
  const contentMatches = [];

  if (searchTerm) {
    document.querySelectorAll('.filter-buttons button').forEach(btn => btn.disabled = true);
    document.getElementById('daily-topic-btn').disabled = true;

    ranges.forEach(range => {
      const hasMatch = mergedTop.some(item => {
        const firstLetter = item.T[0].toUpperCase();
        return firstLetter >= range.start && firstLetter <= range.end &&
               (item.T.toLowerCase().includes(searchTerm) || item.D.join(' ').toLowerCase().includes(searchTerm));
      });
      if (hasMatch) {
        const button = document.querySelector(`button[onclick="filterItems('${range.id}')"]`);
        if (button !== null) button.classList.add('active'); // Fixed syntax
      }
    });

    mergedTop.forEach(item => {
      if (item.T.toLowerCase().includes(searchTerm)) {
        titleMatches.push(item);
      } else if (item.D.join(' ').toLowerCase().includes(searchTerm)) {
        contentMatches.push(item);
      }
    });
  } else {
    const filteredItems = currentFilter === 'all' ? mergedTop :
      mergedTop.filter(item =>
        currentFilter === 'A-H' && item.T[0].toUpperCase() >= 'A' && item.T[0].toUpperCase() <= 'H' ||
        currentFilter === 'I-P' && item.T[0].toUpperCase() >= 'I' && item.T[0].toUpperCase() <= 'P' ||
        currentFilter === 'Q-Z' && item.T[0].toUpperCase() >= 'Q' && item.T[0].toUpperCase() <= 'Z'
      );
    filteredItems.forEach(item => {
      titleMatches.push(item);
    });
  }

  const filteredItems = [...titleMatches, ...contentMatches];

  if (filteredItems.length > 0) {
    filteredItems.forEach(item => {
      const div = document.createElement('div');
      div.className = 'result';
      div.innerHTML = `
        <h2 onclick="toggleDropdown(this)">${highlightText(item.T, searchTerm)}</h2>
        <div class="result-content">
          ${item.S.filter(s => s).map(s => `<p class="scripture">${highlightText(s, searchTerm)}</p>`).join('')}
          ${item.D.map(d => `<p class="description">${highlightText(d, searchTerm)}</p>`).join('')}
        </div>
      `;
      results.appendChild(div);
    });
  } else if (searchTerm) {
    results.innerHTML = '<p class="no-results">No matches found.</p>';
  }
};

// Ensure filterItems is globally defined
window.filterItems = function (filter) {
  const searchTerm = document.getElementById('search-bar').value;
  if (searchTerm) return;
  currentFilter = filter;
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  const button = document.querySelector(`button[onclick="filterItems('${filter}')"]`);
  if (button) button.classList.add('active');
  document.getElementById('current-topic').classList.add('hidden');
  searchItems();
};

// Ensure showDailyTopic is globally defined
window.showDailyTopic = function () {
  const searchTerm = document.getElementById('search-bar').value;
  if (searchTerm) return;
  currentFilter = 'daily';
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  document.getElementById('daily-topic-btn').classList.add('active');
  document.getElementById('results').innerHTML = '';

  // Use merged items
  const mergedTop = mergeExpandedEntries(top);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const seed = today.getTime();
  const randomIndex = Math.floor(seed / (24 * 60 * 60 * 1000)) % mergedTop.length;
  const currentItem = mergedTop[randomIndex];

  const currentTopicDiv = document.getElementById('current-topic');
  currentTopicDiv.classList.remove('hidden');
  currentTopicDiv.innerHTML = `
    <p class="date">Daily Topic for ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}:</p>
    <h2>${currentItem.T}</h2>
    <div class="result-content active">
      ${currentItem.S.filter(s => s).map(s => `<p class="scripture">${s}</p>`).join('')}
      ${currentItem.D.map(d => `<p class="description">${d}</p>`).join('')}
    </div>
  `;
};

window.toggleDropdown = function (header) {
  const parent = header.parentElement;
  const content = header.nextElementSibling;
  const isActive = content.classList.contains('active');

  document.querySelectorAll('.result-content.active').forEach(activeContent => {
    activeContent.classList.remove('active');
    activeContent.parentElement.classList.remove('active');
  });

  if (!isActive) {
    content.classList.add('active');
    parent.classList.add('active');
  }
};

window.highlightText = function (text, searchTerm) {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
};

// Initialize
let currentFilter = 'daily';
document.addEventListener('DOMContentLoaded', () => {
  // Ensure global functions are defined before DOM interactions
  if (typeof window.filterItems !== 'function') {
    window.filterItems = function (filter) {
      const searchTerm = document.getElementById('search-bar').value;
      if (searchTerm) return;
      currentFilter = filter;
      document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
      const button = document.querySelector(`button[onclick="filterItems('${filter}')"]`);
      if (button) button.classList.add('active');
      document.getElementById('current-topic').classList.add('hidden');
      searchItems();
    };
  }

  if (typeof window.showDailyTopic !== 'function') {
    window.showDailyTopic = function () {
      const searchTerm = document.getElementById('search-bar').value;
      if (searchTerm) return;
      currentFilter = 'daily';
      document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
      document.getElementById('daily-topic-btn').classList.add('active');
      document.getElementById('results').innerHTML = '';

      // Use merged items
      const mergedTop = mergeExpandedEntries(top);

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const seed = today.getTime();
      const randomIndex = Math.floor(seed / (24 * 60 * 60 * 1000)) % mergedTop.length;
      const currentItem = mergedTop[randomIndex];

      const currentTopicDiv = document.getElementById('current-topic');
      currentTopicDiv.classList.remove('hidden');
      currentTopicDiv.innerHTML = `
        <p class="date">Daily Topic for ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}:</p>
        <h2>${currentItem.T}</h2>
        <div class="result-content active">
          ${currentItem.S.filter(s => s).map(s => `<p class="scripture">${s}</p>`).join('')}
          ${currentItem.D.map(d => `<p class="description">${d}</p>`).join('')}
        </div>
      `;
    };
  }

  showDailyTopic();
});
