// Hamburger menu functionality
document.querySelector('.hamburger-left').addEventListener('click', () => {
    const menu = document.getElementById('nav-menu-left');
    menu.classList.toggle('active');
});
document.querySelector('.hamburger-right').addEventListener('click', () => {
    const menu = document.getElementById('nav-menu-right');
    menu.classList.toggle('active');
});

// Set active navigation link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu-left a, .nav-menu-right a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Show tab content
function showTab(tabId) {
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
    }
}

// Search functionality
function searchItems() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const lists = document.querySelectorAll('.list');
    lists.forEach(list => {
        const items = list.querySelectorAll('.episode');
        items.forEach(item => {
            const header = item.querySelector('.header').textContent.toLowerCase();
            const content = item.querySelector('.content').textContent.toLowerCase();
            item.style.display = (header.includes(searchTerm) || content.includes(searchTerm)) ? 'block' : 'none';
        });
    });
}

// Populate Truth from truth.js
function populateTruth() {
    const container = document.getElementById('truths');
    if (!container || !window.truths) return;
    container.innerHTML = '';
    window.truths.forEach(truth => {
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

// Populate People from people.js
function populatePeople() {
    const container = document.getElementById('people');
    if (!container || !window.people) return;
    container.innerHTML = '';
    window.people.forEach(person => {
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

// Populate Articles from articles.js
function populateArticles() {
    const container = document.getElementById('articles');
    if (!container || !window.articles) return;
    container.innerHTML = '';
    window.articles.forEach(article => {
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

// Populate Sections from sections.js
function populateSections() {
    const container = document.getElementById('sections');
    if (!container || !window.sections) return;
    container.innerHTML = '';
    window.sections.forEach(section => {
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

// Populate Topics from topics.js
function populateTopics() {
    const container = document.getElementById('topics');
    if (!container || !window.topics) return;
    container.innerHTML = '';
    window.topics.forEach(topic => {
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

// Initialize content on page load
window.onload = () => {
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
