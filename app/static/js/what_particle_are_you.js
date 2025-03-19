document.addEventListener("DOMContentLoaded", () => {
    fetch('/static/data/quizzes/what_particle_are_you.json')
        .then(response => response.json())
        .then(data => runParticleQuiz(data));
});

function runParticleQuiz(data) {
    const questions = data.questions;
    const results = data.results;
    const container = document.getElementById("question-box");
    const resultBox = document.getElementById("quiz-result");
    const resultName = document.getElementById("result-name");
    const resultDescription = document.getElementById("result-description");
    const resultQuote = document.getElementById("result-quote");

    let currentQuestion = 0;
    let votes = {};

    // Initialize vote counts
    Object.keys(results).forEach(p => votes[p] = 0);

    function showQuestion(index) {
        const q = questions[index];
        let html = `<h3 class="text-2xl font-bold text-indigo-700 mb-6">${q.question}</h3>`;
        html += `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`;

        q.options.forEach((opt, i) => {
            html += `
                <button class="answer-btn p-4 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition text-left"
                    data-index="${i}">
                    ${opt.text}
                </button>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;

        document.querySelectorAll(".answer-btn").forEach((btn, i) => {
            btn.addEventListener("click", () => {
                const chosen = q.options[i];
                // Increment votes for each assigned particle
                chosen.votes.forEach(p => {
                    if (votes[p] !== undefined) votes[p]++;
                });

                currentQuestion++;
                if (currentQuestion < questions.length) {
                    showQuestion(currentQuestion);
                } else {
                    showResult();
                }
            });
        });
    }

    function showResult() {
        container.classList.add("hidden");
        resultBox.classList.remove("hidden");

        // Find the particle with most votes
        let maxVotes = 0;
        let topParticle = "";

        for (const [particle, count] of Object.entries(votes)) {
            if (count > maxVotes) {
                maxVotes = count;
                topParticle = particle;
            }
        }

        const result = results[topParticle];
        resultName.textContent = topParticle.toUpperCase();
        resultDescription.textContent = result.description;
        resultQuote.textContent = `"${result.quote}"`;
    }

    showQuestion(currentQuestion);
}