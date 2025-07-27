// script.js
import top from './top.js';
import fam from './fam.js';

// Function to merge (Expanded) entries with their originals
function mergeExpandedEntries(items) {
  const mergedItems = [];
  const seenTitles = new Set();
  
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

  titleMap.forEach((entry, baseTitle) => {
    if (entry.expanded && entry.original) {
      const mergedScriptures = [
        ...new Set([
          ...(entry.original.S || []),
          ...(entry.expanded.S || [])
        ])
      ].filter(s => s);
      const mergedDescription = [
        entry.original.D[0],
        entry.expanded.D[0]
      ].join(' ').split(' ').slice(0, 200).join(' ');
      
      mergedItems.push({
        T: baseTitle,
        S: mergedScriptures.slice(0, 7),
        D: [mergedDescription]
      });
      seenTitles.add(baseTitle);
    } else if (entry.original) {
      mergedItems.push(entry.original);
      seenTitles.add(baseTitle);
    } else if (entry.expanded && !seenTitles.has(baseTitle)) {
      mergedItems.push({
        T: baseTitle,
        S: entry.expanded.S.slice(0, 7),
        D: entry.expanded.D
      });
      seenTitles.add(baseTitle);
    }
  });

  items.forEach(item => {
    const baseTitle = item.T.replace(' (Expanded)', '').trim();
    if (!seenTitles.has(baseTitle)) {
      mergedItems.push(item);
      seenTitles.add(baseTitle);
    }
  });

  return mergedItems.sort((a, b) => a.T.localeCompare(b.T));
}

// Function to determine Eastern Time offset (EST/EDT)
function getEasternTimeOffset(date) {
  const year = date.getFullYear();
  const march = new Date(year, 2, 1);
  const secondSundayMarch = new Date(march.setDate(14 - (march.getDay() || 7)));
  const november = new Date(year, 10, 1);
  const firstSundayNovember = new Date(november.setDate(7 - (november.getDay() || 7)));
  
  return (date >= secondSundayMarch && date < firstSundayNovember) ? -4 : -5;
}

// Function to get the next Friday's date and topics
function getNextFridayInfo() {
  const now = new Date();
  const easternOffset = getEasternTimeOffset(now) * 60 * 60 * 1000; // Convert hours to milliseconds
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const easternNow = new Date(utc + easternOffset);
  const easternDayOfWeek = easternNow.getDay();

  let nextFriday = new Date(easternNow);
  let daysToNextFriday;

  if (easternDayOfWeek === 6) {
    daysToNextFriday = 6; // Saturday, so next Friday is in 6 days
  } else {
    daysToNextFriday = (5 - easternDayOfWeek + 7) % 7 || 7;
  }
  
  nextFriday.setDate(easternNow.getDate() + daysToNextFriday);
  nextFriday.setHours(0, 0, 0, 0);

  // Format nextFriday to match fam.js date strings (e.g., "August 1, 2025")
  const formattedNextFriday = nextFriday.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Find matching entry in fam.js
  let currentEntry = fam.find(item => item.D === formattedNextFriday);
  
  // If no entry found, check if beyond schedule and use first entry
  const lastScheduleDate = new Date(fam[fam.length - 1].D);
  if (!currentEntry && nextFriday > lastScheduleDate) {
    currentEntry = fam[0];
    const year = nextFriday.getFullYear() + 1;
    nextFriday = new Date(`${fam[0].D.split(', ')[0]}, ${year}`);
  }

  return {
    date: nextFriday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    entry: currentEntry || null
  };
}

// Search function
window.searchItems = function () {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase().trim();
  const results = document.getElementById('results');
  const currentTopic = document.getElementById('current-topic');
  const familyWorship = document.getElementById('family-worship');
  results.innerHTML = '';

  const mergedTop = mergeExpandedEntries(top);

  const titleMatches = [];
  const contentMatches = [];

  if (searchTerm) {
    currentTopic.classList.add('hidden');
    familyWorship.classList.add('hidden');
    mergedTop.forEach(item => {
      if (item.T.toLowerCase().includes(searchTerm)) {
        titleMatches.push(item);
      } else if (item.D.join(' ').toLowerCase().includes(searchTerm)) {
        contentMatches.push(item);
      }
    });
  } else {
    currentTopic.classList.remove('hidden');
    familyWorship.classList.remove('hidden');
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

// Show daily topic
function displayDailyTopic() {
  const mergedTop = mergeExpandedEntries(top);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const seed = today.getTime();
  const randomIndex = Math.floor(seed / (24 * 60 * 60 * 1000)) % mergedTop.length;
  const currentItem = mergedTop[randomIndex];

  const currentTopicDiv = document.getElementById('current-topic');
  currentTopicDiv.classList.remove('hidden');
  currentTopicDiv.innerHTML = `
    <p class="date">Daily Topic For ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}:</p>
    <h2>${currentItem.T}</h2>
    <div class="result-content active">
      ${currentItem.S.filter(s => s).map(s => `<p class="scripture">${s}</p>`).join('')}
      ${currentItem.D.map(d => `<p class="description">${d}</p>`).join('')}
    </div>
    <button class="expand-btn" onclick="toggleDailyTopics(this)">Expand</button>
  `;
}

// Show Family Worship topic
function displayFamilyWorship() {
  const { date, entry } = getNextFridayInfo();
  const familyWorshipDiv = document.getElementById('family-worship');
  familyWorshipDiv.classList.remove('hidden');

  let content = `<p class="date">Family Worship For ${date}:</p>`;
  if (!entry) {
    content += `<p>No Family Worship topics scheduled for this date.</p>`;
    content += `<button class="expand-btn" onclick="toggleFamilySchedule(this)">Expand</button>`;
    familyWorshipDiv.innerHTML = content;
    return;
  }

  // Check if it's a broadcast entry
  if (Object.keys(entry).length === 2 && entry.T === "Broadcast" && entry.R === "BROADCAST") {
    content += `
      <h2>Broadcast</h2>
      <div class="result-content active">
        <p class="description">Broadcast</p>
      </div>
    `;
  } else {
    // Collect all T and R pairs
    const topics = [];
    let topicCount = 0;
    Object.keys(entry).forEach(key => {
      if (key.startsWith('T') && entry[key]) {
        const researchKey = `R${topicCount ? topicCount : ''}`;
        if (entry[researchKey]) {
          topics.push({ topic: entry[key], research: entry[researchKey] });
        }
        topicCount++;
      }
    });

    topics.forEach(({ topic, research }) => {
      content += `
        <h2>${topic}</h2>
        <div class="result-content active">
          <p class="description">${research}</p>
        </div>
      `;
    });
  }

  content += `<button class="expand-btn" onclick="toggleFamilySchedule(this)">Expand</button>`;
  familyWorshipDiv.innerHTML = content;
}

// Toggle daily topics (Expand/Collapse)
window.toggleDailyTopics = function (button) {
  const currentTopicDiv = document.getElementById('current-topic');
  let expandedContent = currentTopicDiv.querySelector('.expanded-content');

  if (expandedContent) {
    // Collapse
    expandedContent.remove();
    button.textContent = 'Expand';
    button.onclick = () => toggleDailyTopics(button);
  } else {
    // Expand
    const mergedTop = mergeExpandedEntries(top);
    expandedContent = document.createElement('div');
    expandedContent.className = 'expanded-content';
    mergedTop.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'result';
      itemDiv.innerHTML = `
        <h2 onclick="toggleDropdown(this)">${item.T}</h2>
        <div class="result-content">
          ${item.S.filter(s => s).map(s => `<p class="scripture">${s}</p>`).join('')}
          ${item.D.map(d => `<p class="description">${d}</p>`).join('')}
        </div>
      `;
      expandedContent.appendChild(itemDiv);
    });
    currentTopicDiv.appendChild(expandedContent);
    button.textContent = 'Collapse';
    button.onclick = () => toggleDailyTopics(button);
  }
};

// Toggle Family Worship schedule (Expand/Collapse)
window.toggleFamilySchedule = function (button) {
  const familyWorshipDiv = document.getElementById('family-worship');
  let expandedContent = familyWorshipDiv.querySelector('.expanded-content');

  if (expandedContent) {
    // Collapse
    expandedContent.remove();
    button.textContent = 'Expand';
    button.onclick = () => toggleFamilySchedule(button);
  } else {
    // Expand
    expandedContent = document.createElement('div');
    expandedContent.className = 'expanded-content';
    fam.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'schedule-item';
      let content = `<h2 onclick="toggleDropdown(this)">${item.D}</h2>`;
      content += `<div class="result-content">`;

      // Check if it's a broadcast entry
      if (Object.keys(item).length === 2 && item.T === "Broadcast" && item.R === "BROADCAST") {
        content += `
          <h4>Broadcast</h4>
          <p class="description">Broadcast</p>
        `;
      } else {
        // Collect all T and R pairs
        const topics = [];
        let topicCount = 0;
        Object.keys(item).forEach(key => {
          if (key.startsWith('T') && item[key]) {
            const researchKey = `R${topicCount ? topicCount : ''}`;
            if (item[researchKey]) {
              topics.push({ topic: item[key], research: item[researchKey] });
            }
            topicCount++;
          }
        });

        topics.forEach(({ topic, research }) => {
          content += `
            <h4>${topic}</h4>
            <p class="description">${research}</p>
          `;
        });
      }

      content += `</div>`;
      itemDiv.innerHTML = content;
      expandedContent.appendChild(itemDiv);
    });
    familyWorshipDiv.appendChild(expandedContent);
    button.textContent = 'Collapse';
    button.onclick = () => toggleFamilySchedule(button);
  }
};

window.toggleDropdown = function (header) {
  const parent = header.parentElement;
  const content = header.nextElementSibling;
  const isActive = content.classList.contains('active');

  // Close all other open dropdowns
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

// Check if it's time to update Family Worship (Saturday 9 AM EST)
function checkFamilyWorshipUpdate() {
  const now = new Date();
  const easternOffset = getEasternTimeOffset(now) * 60 * 60 * 1000; // Convert hours to milliseconds
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const easternNow = new Date(utc + easternOffset);
  const day = easternNow.getDay();
  const hours = easternNow.getHours();
  const minutes = easternNow.getMinutes();

  if (day === 6 && hours === 9 && minutes === 0) {
    displayFamilyWorship();
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  displayDailyTopic();
  displayFamilyWorship();
  setInterval(checkFamilyWorshipUpdate, 60000); // Check every minute
});
