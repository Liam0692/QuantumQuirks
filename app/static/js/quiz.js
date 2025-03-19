document.addEventListener("DOMContentLoaded", () => {
    // Load quiz questions from a JSON file
    fetch('/static/data/quizzes/quantum_basics.json')
        .then(response => response.json())
        .then(data => startQuiz(data));
});

function startQuiz(data) {
    const questions = data.questions;
    let currentQuestion = 0;
    let score = 0;
    let wrongAnswers = [];

    const questionBox = document.getElementById("question-box");
    const nextBtn = document.getElementById("next-btn");
    const resultsBox = document.getElementById("quiz-results");
    const finalScore = document.getElementById("final-score");

    function showQuestion(index) {
        const q = questions[index];
        let html = `
            <h3 class="text-2xl font-bold text-indigo-600 mb-4">${index + 1}. ${q.question}</h3>
            <ul class="space-y-3">`;

        q.options.forEach((option, i) => {
            html += `
                <li>
                    <button class="option-btn w-full text-left px-4 py-3 border rounded-lg hover:bg-indigo-50 transition" data-index="${i}">
                        ${option}
                    </button>
                </li>`;
        });

        html += `</ul>`;
        questionBox.innerHTML = html;

        document.querySelectorAll(".option-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const selected = parseInt(e.currentTarget.dataset.index);
                disableOptions();
                if (selected === q.correct_answer) {
                    e.currentTarget.classList.add("bg-green-100", "border-green-300");
                    score++;
                } else {
                    e.currentTarget.classList.add("bg-red-100", "border-red-300");
                    // Record wrong answer for future resource suggestions
                    wrongAnswers.push({
                        question: q.question,
                        selected: q.options[selected],
                        correct: q.options[q.correct_answer],
                        resource: q.resource
                    });
                }
                nextBtn.classList.remove("hidden");
            });
        });
    }

    function disableOptions() {
        document.querySelectorAll(".option-btn").forEach(btn => {
            btn.disabled = true;
            btn.classList.add("cursor-not-allowed");
        });
    }

    nextBtn.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion);
            nextBtn.classList.add("hidden");
        } else {
            showResults();
        }
    });

    function showResults() {
        questionBox.classList.add("hidden");
        nextBtn.classList.add("hidden");
        resultsBox.classList.remove("hidden");
        finalScore.innerHTML = `You scored <strong>${score}/${questions.length}</strong>!`;

        // TODO: Future feature - show resources for wrong answers
        /*
        wrongAnswers.forEach(item => {
            // Append resource links here in future
        });
        */
    }

    showQuestion(currentQuestion);
}