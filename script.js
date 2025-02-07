document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    const submitButton = document.getElementById('submit');
    const scoreDisplay = document.getElementById('score');

    // Load progress from session storage
    const progress = JSON.parse(sessionStorage.getItem('progress')) || {};
    for (const [key, value] of Object.entries(progress)) {
        const radio = document.querySelector(`input[name="${key}"][value="${value}"]`);
        if (radio) {
            radio.checked = true;
        }
    }

    // Save progress on change
    questions.forEach(question => {
        const inputs = question.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                progress[question.querySelector('p').innerText] = input.value;
                sessionStorage.setItem('progress', JSON.stringify(progress));
            });
        });
    });

    // Handle quiz submission
    submitButton.addEventListener('click', () => {
        let score = 0;
        const correctAnswers = {
            "Question 1: What is the capital of France?": "C",
            "Question 2: What is 2 + 2?": "B",
            "Question 3: What is the largest planet in our solar system?": "B",
            "Question 4: Who wrote 'Hamlet'?": "B",
            "Question 5: What is the chemical symbol for water?": "B"
        };

        for (const question of questions) {
            const questionText = question.querySelector('p').innerText;
            const selectedAnswer = question.querySelector('input[type="radio"]:checked');
            if (selectedAnswer && selectedAnswer.value === correctAnswers[questionText]) {
                score++;
            }
        }

        scoreDisplay.innerText = `Your score is ${score} out of 5.`;
        localStorage.setItem('score', score);
    });

    // Load score from local storage if available
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
        scoreDisplay.innerText = `Your last score was ${savedScore} out of 5.`;
    }
});
