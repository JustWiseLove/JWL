// Generate timeline buttons dynamically
document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.querySelector('.timeline-container');
    for (let i = 1; i <= 60; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.setAttribute('onclick', `scrollToSection('lesson-${i}')`);
        button.setAttribute('data-lesson', i);
        timelineContainer.appendChild(button);
    }
});

// Scroll to section or lesson
function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
        const navHeight = document.querySelector('nav').offsetHeight; // Dynamic nav height
        const timelineHeight = document.querySelector('.timeline').offsetHeight; // Dynamic timeline height
        const headerOffset = navHeight + timelineHeight + 20; // Add buffer
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth'
        });
        updateActiveTimelineButton(id);
    }
}

// Update active timeline button
function updateActiveTimelineButton(id) {
    const buttons = document.querySelectorAll('.timeline button');
    buttons.forEach(button => button.classList.remove('active'));
    if (id.startsWith('lesson-')) {
        const lessonNum = parseInt(id.split('-')[1]);
        const activeButton = document.querySelector(`.timeline button[data-lesson="${lessonNum}"]`);
        if (activeButton) activeButton.classList.add('active');
    }
}

// Lesson toggle
document.querySelectorAll('.section h2').forEach(header => {
    header.addEventListener('click', () => {
        const lessons = header.parentElement.querySelectorAll('.lesson');
        lessons.forEach(lesson => {
            lesson.classList.toggle('active');
        });
    });
});

// Progress tracker
let completedLessons = 0;
document.querySelectorAll('.lesson textarea').forEach(textarea => {
    textarea.addEventListener('input', () => {
        const lesson = textarea.closest('.lesson');
        if (!lesson.dataset.clicked && textarea.value.trim()) {
            completedLessons++;
            lesson.dataset.clicked = true;
            document.getElementById('progress').textContent = `${completedLessons}/60`;
        }
    });
});

// Highlight active lesson in timeline on scroll
window.addEventListener('scroll', () => {
    const lessons = document.querySelectorAll('.lesson');
    let currentLesson = null;
    lessons.forEach(lesson => {
        const rect = lesson.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            currentLesson = lesson.id;
        }
    });
    if (currentLesson) {
        updateActiveTimelineButton(currentLesson);
    }
});
