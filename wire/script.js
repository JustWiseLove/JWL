// Load sidebar dynamically
function loadSidebar() {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-placeholder').innerHTML = data;
            // Set active class based on current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.sidebar ul li a').forEach(link => {
                if (link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Error loading sidebar:', error));
}

// Collapsible sections
document.addEventListener('click', function(event) {
    if (event.target.closest('.header')) {
        const header = event.target.closest('.header');
        const content = header.nextElementSibling;
        content.classList.toggle('show');
    }
});

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
        header.innerHTML = `<i class="${truth.icon}"></i> ${truth.title}`;
        const content = document.createElement('div');
        content.className = 'content';
        let contentHTML = `<div class="block"><div class="text">${truth.summary}</div>`;
        if (truth.scriptures.length) {
            contentHTML += `<div class="scripture-section"><ul>`;
            truth.scriptures.forEach(scripture => {
                contentHTML += `<li title="${scripture.tooltip}">${scripture.text} <span class="ref">(${scripture.reference})</span></li>`;
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
        const content = document.createElement('div');
        content.className = 'content';
        let contentHTML = `<div class="block"><div class="description-section">${person.D}</div>`;
        if (person.S.length) {
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
        const content = document.createElement('div');
        content.className = 'content';
        let contentHTML = `<div class="block"><div class="description-section">${section.D}</div>`;
        if (section.S.length) {
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
        const content = document.createElement('div');
        content.className = 'content';
        let contentHTML = `<div class="block"><div class="description-section">${topic.D}</div>`;
        if (topic.S.length) {
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

// Search functionality across all pages
document.addEventListener('input', function(event) {
    if (event.target.matches('#search')) {
        const searchTerm = event.target.value.toLowerCase();
        const episodes = event.target.closest('.content').querySelectorAll('.episode');
        episodes.forEach(episode => {
            const header = episode.querySelector('.header').textContent.toLowerCase();
            const text = episode.querySelector('.content').textContent.toLowerCase();
            episode.style.display = (header.includes(searchTerm) || text.includes(searchTerm)) ? 'block' : 'none';
        });
    }
});

// Initialize content on page load
window.onload = () => {
    loadSidebar();
    populateTruth();
    populatePeople();
    populateArticles();
    populateSections();
    populateTopics();
};
