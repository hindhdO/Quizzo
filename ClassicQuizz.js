async function fetchQuizzData(){
    const response =await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple');
    const data=await response.json()
    console.log(data);

}

function displayQuestions(questions){
    const quizContainer = document.getElementById('quiz');
    
}