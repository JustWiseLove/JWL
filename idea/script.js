// Lesson toggle
document.querySelectorAll('.section h2').forEach(header => {
    header.addEventListener('click', () => {
        const lessons = header.parentElement.querySelectorAll('.lesson');
        lessons.forEach(lesson => {
            lesson.classList.toggle('active');
        });
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Progress tracker
let completedLessons = 0;
document.querySelectorAll('.lesson').forEach(lesson => {
    lesson.addEventListener('click', () => {
        if (!lesson.dataset.clicked) {
            completedLessons++;
            lesson.dataset.clicked = true;
            document.getElementById('progress').textContent = `${completedLessons}/88`;
        }
    });
});
