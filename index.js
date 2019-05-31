const domain = "https://pphs-quiz-machine.herokuapp.com";

function getQuizzes() {
  fetch(domain + "/quizzes")
    .then(response => {
      return response.json();
    })
    .then(quizzes => {
      let quizHTML = "";
      for (let i = 0; i < quizzes.length; i++) {
        const quiz = quizzes[i];
        quizHTML += `
            <a href="${domain}/quizzes/${quiz.id}">
              ${quiz.question}
            </a>
            <br>
            Number correct: ${quiz.correct}
            <br>
            Number incorrect: ${quiz.incorrect}
            <br>
            `;
      }
      document.getElementById("quizzes").innerHTML = quizHTML;
    });
}

function submitQuiz(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  fetch(domain + "/quizzes", {
    method: "POST",
    body: formData
  })
    .then(response => {
      return response.text();
    })
    .then(result => {
      alert(result);
    });
}

setInterval(getQuizzes, 1000);
document.getElementById("submitQuiz").onsubmit = submitQuiz;