const questionElement = document.getElementById('question');
const questionNumberElement = document.getElementById('question-number');
const correctAnswersElement = document.getElementById('p-correct');
const answerButtons = document.querySelectorAll('.button-answer');

let currentQuestionIndex = 0;
let correctAnswers = 0;
let questions = [];

async function fetchQuizzData() {
    try {
        console.log("Envoi de la requête...");
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple');
        const data = await response.json();
        console.log("Données récupérées :", data);

        questions = data.results; 
        showQuestion(questions[currentQuestionIndex]); 
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

function showQuestion(questionData) {
    questionNumberElement.textContent = `Q ${currentQuestionIndex + 1}/10`; 
    questionElement.innerHTML = questionData.question; 

    let answers = [...questionData.incorrect_answers, questionData.correct_answer]; 
    answers.sort(() => Math.random() - 0.5); 

    answerButtons.forEach((button, index) => {
        button.textContent = answers[index]; 
        button.onclick = () => checkAnswer(button.textContent, questionData.correct_answer);
    });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        correctAnswers++;
        correctAnswersElement.textContent = `Correct Answers = ${correctAnswers}`;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]); 
    } else {
        alert(`Quiz terminé ! Score: ${correctAnswers}/10`);
    }
}


fetchQuizzData();
