// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerLeft = document.querySelector('.hamburger-left');
  const hamburgerRight = document.querySelector('.hamburger-right');
  if (hamburgerLeft) {
    hamburgerLeft.addEventListener('click', () => {
      const menu = document.getElementById('nav-menu-left');
      menu.classList.toggle('active');
    });
  }
  if (hamburgerRight) {
    hamburgerRight.addEventListener('click', () => {
      const menu = document.getElementById('nav-menu-right');
      menu.classList.toggle('active');
    });
  }

  // Set active navigation link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu-left a, .nav-menu-right a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
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
  } else {
    console.error(`Tab with ID ${tabId} not found`);
  }
}

// Enhanced search functionality with highlighting
function searchItems() {
  const searchTerm = document.getElementById('search').value.toLowerCase().trim();
  console.log(`Searching for: ${searchTerm}`);
  const lists = document.querySelectorAll('.list');
  lists.forEach(list => {
    const items = Array.from(list.querySelectorAll('.episode'));
    items.forEach(item => {
      const header = item.querySelector('.header');
      const content = item.querySelector('.content');
      const headerText = header.textContent.toLowerCase();
      const contentText = content ? content.textContent.toLowerCase() : '';

      // Highlight function
      const highlightText = (text, term) => {
        if (!term) return text;
        return text.replace(new RegExp(`(${term})`, 'gi'), '<span style="background-color: #FFD700; color: #333333;">$1</span>');
      };

      if (searchTerm) {
        // Check if search term is in header (title)
        const isTitleMatch = headerText.includes(searchTerm);
        // Check if search term is in content
        const isContentMatch = contentText.includes(searchTerm);
        if (isTitleMatch || isContentMatch) {
          // Update header with highlighted text
          header.innerHTML = highlightText(headerText.replace(/<[^>]+>/g, ''), searchTerm);
          // Update content with highlighted text
          if (content) {
            let contentHTML = content.innerHTML;
            contentHTML = highlightText(contentHTML.replace(/<[^>]+>/g, ''), searchTerm);
            content.innerHTML = contentHTML;
          }
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      } else {
        // Reset to original content if no search term
        populateList(list.id);
        item.style.display = 'block';
      }
    });

    // Sort items: title matches first, then content matches
    items.sort((a, b) => {
      const aHeader = a.querySelector('.header').textContent.toLowerCase();
      const bHeader = b.querySelector('.header').textContent.toLowerCase();
      const aMatch = aHeader.includes(searchTerm);
      const bMatch = bHeader.includes(searchTerm);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return aHeader.localeCompare(bHeader); // Alphabetical for ties
    });
    items.forEach(item => list.appendChild(item));
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
