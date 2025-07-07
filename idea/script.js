// Scroll to section
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    target.scrollIntoView({ behavior: 'smooth' });
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
            document.getElementById('progress').textContent = `${completedLessons}/45`;
        }
    });
});
