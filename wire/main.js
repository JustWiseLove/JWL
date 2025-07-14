// Set active navigation link (removed sidebar-specific logic)
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  // No sidebar links to check, so this is a no-op unless you add other nav elements
});

// Show tab content
function showTab(tabId) {
  console.log(`Showing tab: ${tabId}`);
  document.querySelectorAll('.list').forEach(list => {
    list.style.display = 'none';
    list.classList.remove('active');
  });
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });
  const tab = document.getElementById(tabId);
  if (tab) {
    tab.style.display = 'block';
    tab.classList.add('active');
    document.querySelector(`button[onclick="showTab('${tabId}')"]`).classList.add('active');
    populateList(tabId); // Repopulate to reset content
  } else {
    console.error(`Tab with ID ${tabId} not found`);
  }
}

// Enhanced cross-array search functionality with highlighting
function searchItems() {
  const searchTerm = document.getElementById('search').value.toLowerCase().trim();
  console.log(`Searching for: ${searchTerm}`);
  const lists = {
    truths: document.getElementById('truths'),
    people: document.getElementById('people'),
    articles: document.getElementById('articles'),
    sections: document.getElementById('sections'),
    topics: document.getElementById('topics')
  };

  // Clear all lists
  Object.values(lists).forEach(list => {
    if (list) list.innerHTML = '';
  });

  if (!searchTerm) {
    // Reset to original tab content
    Object.keys(lists).forEach(listId => populateList(listId));
    return;
  }

  // Highlight function (preserve original case)
  const highlightText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, match => `<span style="background-color: #FFD700; color: #333333;">${match}</span>`);
  };

  // Arrays to search
  const arrays = {
    truths: window.truths || [],
    people: window.people || [],
    articles: window.articles || [],
    sections: window.sections || [],
    topics: window.topics || []
  };

  // Collect all matching items
  const allMatches = [];
  Object.entries(arrays).forEach(([arrayName, array]) => {
    array.forEach(item => {
      const title = (item.title || item.T || '').toLowerCase();
      const isTitleMatch = title.includes(searchTerm);
      let hasKeyword = isTitleMatch;

      // Check content based on array type
      let contentText = '';
      if (arrayName === 'truths') {
        contentText = (item.summary || '').toLowerCase();
        hasKeyword = hasKeyword || contentText.includes(searchTerm);
        item.scriptures?.forEach(s => hasKeyword = hasKeyword || (s.text || '').toLowerCase().includes(searchTerm));
      } else if (arrayName === 'people' || arrayName === 'sections' || arrayName === 'topics') {
        contentText = (item.D || '').toLowerCase();
        hasKeyword = hasKeyword || contentText.includes(searchTerm);
        item.S?.forEach(s => hasKeyword = hasKeyword || s.toLowerCase().includes(searchTerm));
      } else if (arrayName === 'articles') {
        contentText = (item.content || '').toLowerCase();
        hasKeyword = hasKeyword || contentText.includes(searchTerm);
      }

      if (hasKeyword) {
        const episode = document.createElement('div');
        episode.className = 'episode';
        const header = document.createElement('div');
        header.className = 'header';
        const titleText = item.title || item.T || '';
        header.innerHTML = `<i class="${item.icon || 'fas fa-question-circle'}"></i> ${highlightText(titleText, searchTerm)}`;
        header.addEventListener('click', () => {
          const content = header.nextElementSibling;
          content.classList.toggle('show');
        });

        const content = document.createElement('div');
        content.className = 'content';
        let contentHTML = '<div class="block">';
        if (isTitleMatch) {
          // Display entire content if title matches
          if (arrayName === 'truths') {
            contentHTML += `<div class="text">${highlightText(item.summary || '', searchTerm)}</div>`;
            if (item.scriptures?.length) {
              contentHTML += `<div class="scripture-section"><ul>`;
              item.scriptures.forEach(s => {
                contentHTML += `<li title="${s.tooltip || ''}">${highlightText(s.text || '', searchTerm)} <span class="ref">(${s.reference})</span></li>`;
              });
              contentHTML += `</ul></div>`;
            }
          } else if (arrayName === 'people' || arrayName === 'sections' || arrayName === 'topics') {
            contentHTML += `<div class="description-section">${highlightText(item.D || '', searchTerm)}</div>`;
            if (item.S?.length) {
              contentHTML += `<div class="scripture-section"><ul>`;
              item.S.forEach(s => contentHTML += `<li>${highlightText(s, searchTerm)}</li>`);
              contentHTML += `</ul></div>`;
            }
          } else if (arrayName === 'articles') {
            contentHTML += `${highlightText(item.content || '', searchTerm)}`;
          }
        } else {
          // Display only paragraphs with the keyword
          if (arrayName === 'truths' && contentText.includes(searchTerm)) {
            contentHTML += `<div class="text">${highlightText(item.summary || '', searchTerm)}</div>`;
            item.scriptures?.forEach(s => {
              if ((s.text || '').toLowerCase().includes(searchTerm)) {
                contentHTML += `<div class="scripture-section"><ul><li title="${s.tooltip || ''}">${highlightText(s.text || '', searchTerm)} <span class="ref">(${s.reference})</span></li></ul></div>`;
              }
            });
          } else if ((arrayName === 'people' || arrayName === 'sections' || arrayName === 'topics') && contentText.includes(searchTerm)) {
            contentHTML += `<div class="description-section">${highlightText(item.D || '', searchTerm)}</div>`;
            item.S?.forEach(s => {
              if (s.toLowerCase().includes(searchTerm)) {
                contentHTML += `<div class="scripture-section"><ul><li>${highlightText(s, searchTerm)}</li></ul></div>`;
              }
            });
          } else if (arrayName === 'articles' && contentText.includes(searchTerm)) {
            contentHTML += `${highlightText(item.content || '', searchTerm)}`;
          }
        }
        contentHTML += '</div>';
        content.innerHTML = contentHTML;
        episode.appendChild(header);
        episode.appendChild(content);
        allMatches.push({ episode, arrayName });
      }
    });
  });

  // Populate all lists with matches
  Object.entries(lists).forEach(([listId, list]) => {
    if (list) {
      list.innerHTML = '';
      const matchesForList = allMatches.filter(m => m.arrayName === listId);
      matchesForList.forEach(m => list.appendChild(m.episode));
    }
  });
}

// Populate functions with alphabetical sorting
function populateTruth() {
  const container = document.getElementById('truths');
  if (!container) {
    console.error('Truths container not found');
    return;
  }
  if (!window.truths) {
    console.error('window.truths is undefined');
    return;
  }
  console.log('Populating truths:', window.truths);
  container.innerHTML = '';
  const sortedTruths = [...window.truths].sort((a, b) => a.title.localeCompare(b.title));
  sortedTruths.forEach(truth => {
    const episode = document.createElement('div');
    episode.className = 'episode';
    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = `<i class="${truth.icon || 'fas fa-question-circle'}"></i> ${truth.title}`;
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.classList.toggle('show');
    });
    const content = document.createElement('div');
    content.className = 'content';
    let contentHTML = `<div class="block"><div class="text">${truth.summary}</div>`;
    if (truth.scriptures && truth.scriptures.length) {
      contentHTML += `<div class="scripture-section"><ul>`;
      truth.scriptures.forEach(scripture => {
        contentHTML += `<li title="${scripture.tooltip || ''}">${scripture.text} <span class="ref">(${scripture.reference})</span></li>`;
      });
      contentHTML += `</ul></div>`;
    }
    contentHTML += `</div>`;
    content.innerHTML = contentHTML;
    episode.appendChild(header);
    episode.appendChild(content);
    container.appendChild(episode);
  });
}

function populatePeople() {
  const container = document.getElementById('people');
  if (!container) {
    console.error('People container not found');
    return;
  }
  if (!window.people) {
    console.error('window.people is undefined');
    return;
  }
  console.log('Populating people:', window.people);
  container.innerHTML = '';
  const sortedPeople = [...window.people].sort((a, b) => a.T.localeCompare(b.T));
  sortedPeople.forEach(person => {
    const episode = document.createElement('div');
    episode.className = 'episode';
    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = `<i class="fas fa-user"></i> ${person.T}`;
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.classList.toggle('show');
    });
    const content = document.createElement('div');
    content.className = 'content';
    let contentHTML = `<div class="block"><div class="description-section">${person.D}</div>`;
    if (person.S && person.S.length) {
      contentHTML += `<div class="scripture-section"><ul>`;
      person.S.forEach(scripture => {
        contentHTML += `<li>${scripture}</li>`;
      });
      contentHTML += `</ul></div>`;
    }
    contentHTML += `</div>`;
    content.innerHTML = contentHTML;
    episode.appendChild(header);
    episode.appendChild(content);
    container.appendChild(episode);
  });
}

function populateArticles() {
  const container = document.getElementById('articles');
  if (!container) {
    console.error('Articles container not found');
    return;
  }
  if (!window.articles) {
    console.error('window.articles is undefined');
    return;
  }
  console.log('Populating articles:', window.articles);
  container.innerHTML = '';
  const sortedArticles = [...window.articles].sort((a, b) => a.title.localeCompare(b.title));
  sortedArticles.forEach(article => {
    const episode = document.createElement('div');
    episode.className = 'episode';
    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = `<i class="fas fa-file-alt"></i> ${article.title}`;
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.classList.toggle('show');
    });
    const content = document.createElement('div');
    content.className = 'content';
    content.innerHTML = `<div class="block">${article.content}</div>`;
    episode.appendChild(header);
    episode.appendChild(content);
    container.appendChild(episode);
  });
}

function populateSections() {
  const container = document.getElementById('sections');
  if (!container) {
    console.error('Sections container not found');
    return;
  }
  if (!window.sections) {
    console.error('window.sections is undefined');
    return;
  }
  console.log('Populating sections:', window.sections);
  container.innerHTML = '';
  const sortedSections = [...window.sections].sort((a, b) => a.T.localeCompare(b.T));
  sortedSections.forEach(section => {
    const episode = document.createElement('div');
    episode.className = 'episode';
    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = `<i class="fas fa-book"></i> ${section.T}`;
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.classList.toggle('show');
    });
    const content = document.createElement('div');
    content.className = 'content';
    let contentHTML = `<div class="block"><div class="description-section">${section.D}</div>`;
    if (section.S && section.S.length) {
      contentHTML += `<div class="scripture-section"><ul>`;
      section.S.forEach(scripture => {
        contentHTML += `<li>${scripture}</li>`;
      });
      contentHTML += `</ul></div>`;
    }
    contentHTML += `</div>`;
    content.innerHTML = contentHTML;
    episode.appendChild(header);
    episode.appendChild(content);
    container.appendChild(episode);
  });
}

function populateTopics() {
  const container = document.getElementById('topics');
  if (!container) {
    console.error('Topics container not found');
    return;
  }
  if (!window.topics) {
    console.error('window.topics is undefined');
    return;
  }
  console.log('Populating topics:', window.topics);
  container.innerHTML = '';
  const sortedTopics = [...window.topics].sort((a, b) => a.T.localeCompare(b.T));
  sortedTopics.forEach(topic => {
    const episode = document.createElement('div');
    episode.className = 'episode';
    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = `<i class="fas fa-bookmark"></i> ${topic.T}`;
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.classList.toggle('show');
    });
    const content = document.createElement('div');
    content.className = 'content';
    let contentHTML = `<div class="block"><div class="description-section">${topic.D}</div>`;
    if (topic.S && topic.S.length) {
      contentHTML += `<div class="scripture-section"><ul>`;
      topic.S.forEach(scripture => {
        contentHTML += `<li>${scripture}</li>`;
      });
      contentHTML += `</ul></div>`;
    }
    contentHTML += `</div>`;
    content.innerHTML = contentHTML;
    episode.appendChild(header);
    episode.appendChild(content);
    container.appendChild(episode);
  });
}

// Helper function to populate a specific list
function populateList(listId) {
  switch (listId) {
    case 'truths': populateTruth(); break;
    case 'people': populatePeople(); break;
    case 'articles': populateArticles(); break;
    case 'sections': populateSections(); break;
    case 'topics': populateTopics(); break;
    case 'goodnews': break; // Static content, no population needed
  }
}

// Initialize content on page load
window.onload = () => {
  console.log('Initializing page:', window.location.pathname);
  populateTruth();
  populatePeople();
  populateArticles();
  populateSections();
  populateTopics();
  if (window.location.pathname.includes('index.html')) {
    showTab('articles');
  } else if (window.location.pathname.includes('truth.html')) {
    showTab('truths');
  } else if (window.location.pathname.includes('people.html')) {
    showTab('people');
  } else if (window.location.pathname.includes('goodnews.html')) {
    showTab('goodnews');
  } else if (window.location.pathname.includes('articles.html')) {
    showTab('articles');
  } else if (window.location.pathname.includes('sections.html')) {
    showTab('sections');
  } else if (window.location.pathname.includes('topics.html')) {
    showTab('topics');
  }
};
