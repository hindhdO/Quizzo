const questionElement = document.getElementById('question');
const questionNumberElement = document.getElementById('question-number');
const correctAnswersElement = document.getElementById('p-correct');
const answerButtons = document.querySelectorAll('.button-answer');
const customButton = document.getElementById("customizeQuiz");
const customStartButton = document.getElementById("button-custom-start");

let currentQuestionIndex = 0;
let correctAnswers = 0;
let questions = [];

async function render(){
    try {
        console.log("Envoi de la requête...");
        
        
        let quizURL = localStorage.getItem("quizURL") || "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";

        const response = await fetch(quizURL);
        const data = await response.json();

        questions = data.results;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

function fetchQuizzData() {
    
    if (questions.length > 0) {
        showQuestion(questions[currentQuestionIndex]); 
    } else {
        alert("Aucune question trouvée avec ces critères. Essayez une autre configuration.");
    }
    
}

function showQuestion(questionData) {
    questionNumberElement.textContent = `Q ${currentQuestionIndex + 1}/${questions.length}`; 
    questionElement.innerHTML = questionData.question; 

    let answers = [...questionData.incorrect_answers, questionData.correct_answer]; 
    answers.sort(() => Math.random() - 0.5); 

    answerButtons.forEach((button, index) => {
        button.textContent = answers[index] || ""; 
        button.style.display = answers[index] ? "block" : "none"; 

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
        alert(`Quiz terminé ! Score: ${correctAnswers}/${questions.length}`);
    }
}




if (customStartButton) {
    customStartButton.addEventListener("click", () => {
        const category = document.getElementById("custom-quiz-category").value;
        const difficulty = document.getElementById("custom-quiz-difficulty").value;
        const amount = document.getElementById("custom-quiz-amount").value;
        const type = document.getElementById("custom-quiz-type").value;

        let URL = `https://opentdb.com/api.php?amount=${amount}`;
        if (category !== "any") URL += `&category=${category}`;
        if (difficulty !== "any") URL += `&difficulty=${difficulty}`;
        if (type !== "any") URL += `&type=${type}`;

        console.log("URL générée :", URL);
        localStorage.setItem("quizURL", URL);
        window.location.href = "./Quizz.html";
    });
}

function startQuiz() {
    localStorage.setItem("quizURL", "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple");
    window.location.href = "./Quizz.html"; 
}

function toggleCustomOptions() {
    const options = document.getElementById("custom-quiz-options");
    options.style.display = options.style.display === "block" ? "none" : "block";
}


async function initQuiz() {
    await render();  
    if (questions.length > 0) {  
        fetchQuizzData(); 
    } else {
        console.error("Aucune question récupérée. Problème avec l'API ?");
    }
}

initQuiz(); 
