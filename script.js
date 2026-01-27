
const startBtn = document.getElementById("startBtn");
const homeSection = document.getElementById("home");
const subjectSection = document.getElementById("subject-selection");


startBtn.addEventListener("click", function () {
  homeSection.style.display = "none";
  subjectSection.style.display = "block";
});

const quizSection = document.getElementById("quiz-section");


const subjectButtons = document.querySelectorAll("#subject-selection button");


subjectButtons.forEach(button => {
  button.addEventListener("click", function() {
    subjectSection.style.display = "none";  
    quizSection.style.display = "block";    

    
    const selectedSubject = this.innerText;
    console.log("Selected Subject:", selectedSubject);
  });
});

const questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5"],
    answer: "4"
  },
  {
    question: "What is the capital of England?",
    options: ["London", "Paris", "Rome"],
    answer: "London"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Earth", "Jupiter"],
    answer: "Mars"
  }
];


let currentQuestionIndex = 0;


const questionText = document.getElementById("question-text");
const optionList = document.querySelectorAll("#question-box li span");

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  
  
  questionText.innerText = currentQuestion.question;
  
  
  optionList.forEach((option, index) => {
    option.innerText = currentQuestion.options[index];
    
    
    option.previousElementSibling.checked = false;
  });
}

displayQuestion();

const nextBtn = document.getElementById("nextBtn");


let score = 0;

nextBtn.addEventListener("click", function() {
  
  const selectedOption = document.querySelector(
    '#question-box input[name="option"]:checked'
  );

  if (!selectedOption) {
    alert("Please select an option!");
    return;
  }

  
  const answerText = selectedOption.nextElementSibling.innerText;
  if (answerText === questions[currentQuestionIndex].answer) {
    score++;
  }


  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion(); 
  } else {
   
    quizSection.style.display = "none";
    const resultSection = document.getElementById("result-section");
    resultSection.style.display = "block";

    
    document.getElementById("score").innerText = `Your Score: ${score} / ${questions.length}`;

    let performanceText = "";
    if (score === questions.length) {
      performanceText = "Excellent!";
    } else if (score >= 3) {
      performanceText = "Good!";
    } else {
      performanceText = "Needs Improvement!";
    }
    document.getElementById("performance").innerText = `Performance: ${performanceText}`;
  }
});

const restartBtn = document.querySelector("#result-section button");

restartBtn.addEventListener("click", function() {
  
  currentQuestionIndex = 0;
  score = 0;

  
  document.getElementById("result-section").style.display = "none";

  
  homeSection.style.display = "block";
});
let timer = 60;
const timerDisplay = document.createElement('p');
timerDisplay.id = 'timer';
quizSection.prepend(timerDisplay);
setInterval(() => {
  if(timer >= 0) timerDisplay.innerText = `Time left: ${timer--}s`;
}, 1000);
