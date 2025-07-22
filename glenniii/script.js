// script.js
import top from './top.js';

// Make functions globally available for onclick
window.toggleTheme = function () {
  const stylesheet = document.getElementById('theme-stylesheet');
  const currentTheme = stylesheet.getAttribute('href');
  const newTheme = currentTheme === 'black.css' ? 'white.css' : 'black.css';
  stylesheet.setAttribute('href', newTheme);
  localStorage.setItem('theme', newTheme);
};

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

  // Highlight filter buttons and collect matches
  const ranges = [
    { id: 'A-H', start: 'A', end: 'H' },
    { id: 'I-Q', start: 'I', end: 'Q' },
    { id: 'Q-Z', start: 'Q', end: 'Z' }
  ];

  const titleMatches = [];
  const contentMatches = [];

  if (searchTerm) {
    // Disable filter and daily topic buttons during search
    document.querySelectorAll('.filter-buttons button').forEach(btn => btn.disabled = true);
    document.getElementById('daily-topic-btn').disabled = true;

    // Collect matches and highlight buttons
    ranges.forEach(range => {
      const hasMatch = top.some(item => {
        const firstLetter = item.T[0].toUpperCase();
        return firstLetter >= range.start && firstLetter <= range.end &&
               (item.T.toLowerCase().includes(searchTerm) || item.D.join(' ').toLowerCase().includes(searchTerm));
      });
      if (hasMatch) {
        const button = document.querySelector(`button[onclick="filterItems('${range.id}')"]`);
        if (button) button.classList.add('active');
      }
    });

    // Sort alphabetically
    const sortedItems = [...top].sort((a, b) => a.T.localeCompare(b.T));

    // Separate title and content matches
    sortedItems.forEach(item => {
      if (item.T.toLowerCase().includes(searchTerm)) {
        titleMatches.push(item);
      } else if (item.D.join(' ').toLowerCase().includes(searchTerm)) {
        contentMatches.push(item);
      }
    });
  } else {
    // No search term: show filtered items or all if no filter
    const filteredItems = currentFilter === 'all' ? top :
      top.filter(item =>
        currentFilter === 'A-H' && item.T[0].toUpperCase() >= 'A' && item.T[0].toUpperCase() <= 'H' ||
        currentFilter === 'I-Q' && item.T[0].toUpperCase() >= 'I' && item.T[0].toUpperCase() <= 'Q' ||
        currentFilter === 'Q-Z' && item.T[0].toUpperCase() >= 'Q' && item.T[0].toUpperCase() <= 'Z'
      );
    filteredItems.sort((a, b) => a.T.localeCompare(b.T)).forEach(item => {
      titleMatches.push(item);
    });
  }

  // Combine all matches into a single list
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
    results.innerHTML = '<p style="text-align: center; color: #FFFFFF;">No matches found.</p>';
  }
};

window.filterItems = function (filter) {
  const searchTerm = document.getElementById('search-bar').value;
  if (searchTerm) return; // Ignore filter if search term exists
  currentFilter = filter;
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  const button = document.querySelector(`button[onclick="filterItems('${filter}')"]`);
  if (button) button.classList.add('active');
  document.getElementById('current-topic').classList.add('hidden');
  searchItems();
};

window.showDailyTopic = function () {
  const searchTerm = document.getElementById('search-bar').value;
  if (searchTerm) return; // Ignore if search term exists
  currentFilter = 'daily';
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  document.getElementById('daily-topic-btn').classList.add('active');
  document.getElementById('results').innerHTML = '';

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const seed = today.getTime();
  const randomIndex = Math.floor(seed / (24 * 60 * 60 * 1000)) % top.length;
  const currentItem = top[randomIndex];

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

  // Close all other dropdowns and remove active class
  document.querySelectorAll('.result-content.active').forEach(activeContent => {
    activeContent.classList.remove('active');
    activeContent.parentElement.classList.remove('active');
  });

  // Toggle the clicked dropdown
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
  const savedTheme = localStorage.getItem('theme') || 'black.css';
  document.getElementById('theme-stylesheet').setAttribute('href', savedTheme);
  showDailyTopic();
});
