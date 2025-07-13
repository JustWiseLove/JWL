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

// Progress tracker and saving answers
document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('.lesson textarea');
    const totalLessons = textareas.length; // Should be 60
    let completedLessons = 0;

    // Load saved answers from localStorage
    textareas.forEach((textarea, index) => {
        const savedAnswer = localStorage.getItem(`lesson-answer-${index}`);
        if (savedAnswer) {
            textarea.value = savedAnswer;
            if (savedAnswer.trim()) {
                textarea.closest('.lesson').dataset.completed = 'true';
                completedLessons++;
            }
        }
    });

    // Update progress display
    document.getElementById('progress').textContent = `${completedLessons}/${totalLessons}`;

    // Save answers and update progress on input
    textareas.forEach((textarea, index) => {
        textarea.addEventListener('input', () => {
            // Save the answer to localStorage
            localStorage.setItem(`lesson-answer-${index}`, textarea.value);

            // Update progress
            const lesson = textarea.closest('.lesson');
            const isCompleted = textarea.value.trim() !== '';
            if (isCompleted && !lesson.dataset.completed) {
                lesson.dataset.completed = 'true';
                completedLessons++;
            } else if (!isCompleted && lesson.dataset.completed) {
                lesson.dataset.completed = 'false';
                completedLessons--;
            }
            document.getElementById('progress').textContent = `${completedLessons}/${totalLessons}`;
        });
    });
});
