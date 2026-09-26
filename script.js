/* =========================================
   GET HTML ELEMENTS
========================================= */

const startBtn = document.getElementById("startBtn");

const homeSection = document.getElementById("home");
const subjectSection = document.getElementById("subject-selection");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

const subjectButtons = document.querySelectorAll(".subject-card");

const subjectsLink = document.querySelector(
    '.nav-links a[href="#subject-selection"]'
);

const homeLink = document.querySelector(
    '.nav-links a[href="#home"]'
);

const quizSubject = document.getElementById("quiz-subject");

const questionText = document.getElementById("question-text");

const optionsContainer =
    document.getElementById("options-container");

const currentQuestionDisplay =
    document.getElementById("current-question");

const totalQuestionDisplay =
    document.getElementById("total-question");

const progress =
    document.getElementById("progress");

const progressPercent =
    document.getElementById("progress-percent");

const timerDisplay =
    document.getElementById("timer");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const scoreDisplay =
    document.getElementById("score");

const performanceDisplay =
    document.getElementById("performance");

const resultMessage =
    document.getElementById("result-message");

const resultSubject =
    document.getElementById("result-subject");

const correctAnswers =
    document.getElementById("correct-answers");

const percentageDisplay =
    document.getElementById("percentage");

const restartBtn =
    document.getElementById("restartBtn");

const homeBtn =
    document.getElementById("homeBtn");


/* =========================================
   QUIZ DATA
========================================= */

const quizData = {

    Math: [

        {
            question: "What is 15 + 25?",
            options: ["30", "40", "45", "50"],
            answer: "40"
        },

        {
            question: "What is 12 × 5?",
            options: ["50", "55", "60", "65"],
            answer: "60"
        },

        {
            question: "What is the square of 9?",
            options: ["18", "27", "72", "81"],
            answer: "81"
        },

        {
            question: "What is 100 ÷ 4?",
            options: ["20", "25", "30", "40"],
            answer: "25"
        },

        {
            question: "Which number is a prime number?",
            options: ["12", "15", "17", "21"],
            answer: "17"
        }

    ],


    English: [

        {
            question: "Choose the correct spelling.",
            options: [
                "Beautifull",
                "Beautiful",
                "Beutiful",
                "Beautifal"
            ],
            answer: "Beautiful"
        },

        {
            question: "Choose the synonym of 'Happy'.",
            options: [
                "Sad",
                "Angry",
                "Joyful",
                "Tired"
            ],
            answer: "Joyful"
        },

        {
            question: "Which word is a noun?",
            options: [
                "Run",
                "Beautiful",
                "Teacher",
                "Quickly"
            ],
            answer: "Teacher"
        },

        {
            question: "Choose the correct sentence.",
            options: [
                "She go to school.",
                "She going school.",
                "She goes to school.",
                "She gone school."
            ],
            answer: "She goes to school."
        },

        {
            question: "What is the opposite of 'Ancient'?",
            options: [
                "Old",
                "Modern",
                "Historic",
                "Past"
            ],
            answer: "Modern"
        }

    ],


    "General Knowledge": [

        {
            question: "What is the capital of India?",
            options: [
                "Mumbai",
                "New Delhi",
                "Kolkata",
                "Chennai"
            ],
            answer: "New Delhi"
        },

        {
            question: "Which planet is known as the Red Planet?",
            options: [
                "Earth",
                "Venus",
                "Mars",
                "Jupiter"
            ],
            answer: "Mars"
        },

        {
            question: "How many continents are there?",
            options: [
                "5",
                "6",
                "7",
                "8"
            ],
            answer: "7"
        },

        {
            question: "Which is the largest ocean?",
            options: [
                "Atlantic Ocean",
                "Indian Ocean",
                "Arctic Ocean",
                "Pacific Ocean"
            ],
            answer: "Pacific Ocean"
        },

        {
            question: "Which gas do plants mainly absorb?",
            options: [
                "Oxygen",
                "Nitrogen",
                "Carbon Dioxide",
                "Hydrogen"
            ],
            answer: "Carbon Dioxide"
        }

    ]

};


/* =========================================
   QUIZ VARIABLES
========================================= */

let selectedSubject = "";

let questions = [];

let currentQuestionIndex = 0;

let selectedAnswers = [];

let score = 0;

let timeLeft = 60;

let timer;


/* =========================================
   SHOW SUBJECT SECTION
========================================= */

function showSubjects() {

    /* Hide other sections */

    homeSection.classList.add("hidden");

    quizSection.classList.add("hidden");

    resultSection.classList.add("hidden");


    /* Show subjects */

    subjectSection.classList.remove("hidden");


    /* Stop timer if running */

    clearInterval(timer);


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   HOME NAVBAR LINK
========================================= */

homeLink.addEventListener("click", function (event) {

    event.preventDefault();

    clearInterval(timer);

    quizSection.classList.add("hidden");

    subjectSection.classList.add("hidden");

    resultSection.classList.add("hidden");

    homeSection.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   SUBJECTS NAVBAR LINK
========================================= */

subjectsLink.addEventListener("click", function (event) {

    event.preventDefault();

    showSubjects();

});


/* =========================================
   START EXAMINATION BUTTON
========================================= */

startBtn.addEventListener("click", function () {

    showSubjects();

});


/* =========================================
   SUBJECT SELECTION
========================================= */

subjectButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        /* Get selected subject */

        selectedSubject =
            button.dataset.subject;


        /* Get questions */

        questions =
            quizData[selectedSubject];


        /* Reset quiz */

        currentQuestionIndex = 0;

        score = 0;

        timeLeft = 60;


        /* Create empty answer array */

        selectedAnswers =
            new Array(questions.length).fill(null);


        /* Show subject name */

        quizSubject.innerText =
            selectedSubject;


        /* Show total questions */

        totalQuestionDisplay.innerText =
            questions.length;


        /* Hide subject section */

        subjectSection.classList.add("hidden");


        /* Show quiz */

        quizSection.classList.remove("hidden");


        /* Start timer */

        startTimer();


        /* Display first question */

        displayQuestion();


        /* Scroll to top */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


/* =========================================
   DISPLAY QUESTION
========================================= */

function displayQuestion() {

    const currentQuestion =
        questions[currentQuestionIndex];


    /* Display question */

    questionText.innerText =
        currentQuestion.question;


    /* Clear old options */

    optionsContainer.innerHTML = "";


    /* Create options */

    currentQuestion.options.forEach(
        function (option, index) {

            const optionButton =
                document.createElement("button");


            optionButton.classList.add("option");


            /* Option letter */

            const optionNumber =
                document.createElement("span");


            optionNumber.classList.add(
                "option-number"
            );


            optionNumber.innerText =
                String.fromCharCode(65 + index);


            /* Option text */

            const optionText =
                document.createElement("span");


            optionText.innerText =
                option;


            /* Add elements */

            optionButton.appendChild(
                optionNumber
            );

            optionButton.appendChild(
                optionText
            );


            /* Show previously selected answer */

            if (
                selectedAnswers[currentQuestionIndex]
                === option
            ) {

                optionButton.classList.add(
                    "selected"
                );

            }


            /* Select option */

            optionButton.addEventListener(
                "click",
                function () {

                    selectedAnswers[
                        currentQuestionIndex
                    ] = option;


                    /* Remove selected from all */

                    const allOptions =
                        document.querySelectorAll(
                            ".option"
                        );


                    allOptions.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );


                    /* Add selected */

                    optionButton.classList.add(
                        "selected"
                    );

                }
            );


            /* Add option to page */

            optionsContainer.appendChild(
                optionButton
            );

        }
    );


    /* Update progress */

    updateProgress();


    /* Update navigation */

    updateNavigation();

}


/* =========================================
   UPDATE PROGRESS
========================================= */

function updateProgress() {

    const currentQuestion =
        currentQuestionIndex + 1;


    const totalQuestions =
        questions.length;


    const percentage =
        Math.round(
            (currentQuestion / totalQuestions) * 100
        );


    currentQuestionDisplay.innerText =
        currentQuestion;


    progressPercent.innerText =
        percentage + "%";


    progress.style.width =
        percentage + "%";

}


/* =========================================
   UPDATE NAVIGATION
========================================= */

function updateNavigation() {

    /* Previous button */

    if (currentQuestionIndex === 0) {

        previousBtn.disabled = true;

        previousBtn.style.opacity = "0.5";

        previousBtn.style.cursor =
            "not-allowed";

    } else {

        previousBtn.disabled = false;

        previousBtn.style.opacity = "1";

        previousBtn.style.cursor =
            "pointer";

    }


    /* Next button */

    if (
        currentQuestionIndex ===
        questions.length - 1
    ) {

        nextBtn.innerText =
            "Submit Quiz";

    } else {

        nextBtn.innerText =
            "Next →";

    }

}


/* =========================================
   NEXT BUTTON
========================================= */

nextBtn.addEventListener(
    "click",
    function () {

        /* Check answer */

        if (
            selectedAnswers[currentQuestionIndex]
            === null
        ) {

            alert(
                "Please select an answer before continuing."
            );

            return;

        }


        /* Go to next question */

        if (
            currentQuestionIndex <
            questions.length - 1
        ) {

            currentQuestionIndex++;

            displayQuestion();

        }

        /* Last question */

        else {

            finishQuiz();

        }

    }
);


/* =========================================
   PREVIOUS BUTTON
========================================= */

previousBtn.addEventListener(
    "click",
    function () {

        if (currentQuestionIndex > 0) {

            currentQuestionIndex--;

            displayQuestion();

        }

    }
);


/* =========================================
   TIMER
========================================= */

function startTimer() {

    /* Stop previous timer */

    clearInterval(timer);


    /* Reset timer */

    timerDisplay.innerText =
        timeLeft + "s";


    /* Reset timer design */

    timerDisplay.parentElement.style.background =
        "#fff7ed";

    timerDisplay.parentElement.style.color =
        "#c2410c";


    /* Start timer */

    timer = setInterval(
        function () {

            timeLeft--;


            timerDisplay.innerText =
                timeLeft + "s";


            /* Last 10 seconds */

            if (timeLeft <= 10) {

                timerDisplay.parentElement.style.background =
                    "#fee2e2";

                timerDisplay.parentElement.style.color =
                    "#dc2626";

            }


            /* Time finished */

            if (timeLeft <= 0) {

                clearInterval(timer);

                finishQuiz();

            }

        },
        1000
    );

}


/* =========================================
   FINISH QUIZ
========================================= */

function finishQuiz() {

    /* Stop timer */

    clearInterval(timer);


    /* Calculate score */

    score = 0;


    questions.forEach(
        function (question, index) {

            if (
                selectedAnswers[index]
                === question.answer
            ) {

                score++;

            }

        }
    );


    /* Total questions */

    const totalQuestions =
        questions.length;


    /* Calculate percentage */

    const percentage =
        Math.round(
            (score / totalQuestions) * 100
        );


    /* Hide quiz */

    quizSection.classList.add("hidden");


    /* Show result */

    resultSection.classList.remove("hidden");


    /* Display score */

    scoreDisplay.innerText =
        score;


    /* Display correct answers */

    correctAnswers.innerText =
        score + " / " + totalQuestions;


    /* Display percentage */

    percentageDisplay.innerText =
        percentage + "%";


    /* Display subject */

    resultSubject.innerText =
        selectedSubject;


    /* Performance message */

    showPerformance(percentage);


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   PERFORMANCE MESSAGE
========================================= */

function showPerformance(percentage) {

    if (percentage === 100) {

        performanceDisplay.innerText =
            "Excellent Performance!";

        resultMessage.innerText =
            "Perfect score! You answered every question correctly.";

    }

    else if (percentage >= 80) {

        performanceDisplay.innerText =
            "Great Performance!";

        resultMessage.innerText =
            "You have demonstrated strong knowledge of this subject.";

    }

    else if (percentage >= 60) {

        performanceDisplay.innerText =
            "Good Performance!";

        resultMessage.innerText =
            "You have a good understanding of the subject.";

    }

    else if (percentage >= 40) {

        performanceDisplay.innerText =
            "Keep Practicing!";

        resultMessage.innerText =
            "You are making progress. Practice more to improve your score.";

    }

    else {

        performanceDisplay.innerText =
            "Needs Improvement";

        resultMessage.innerText =
            "Review the concepts and try the examination again.";

    }

}


/* =========================================
   RESTART QUIZ
========================================= */

restartBtn.addEventListener(
    "click",
    function () {

        /* Reset quiz */

        currentQuestionIndex = 0;

        score = 0;

        timeLeft = 60;


        /* Clear answers */

        selectedAnswers =
            new Array(questions.length).fill(null);


        /* Hide result */

        resultSection.classList.add("hidden");


        /* Show quiz */

        quizSection.classList.remove("hidden");


        /* Start timer */

        startTimer();


        /* Display first question */

        displayQuestion();


        /* Scroll to top */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   BACK TO HOME
========================================= */

homeBtn.addEventListener(
    "click",
    function () {

        /* Stop timer */

        clearInterval(timer);


        /* Hide all other sections */

        resultSection.classList.add("hidden");

        quizSection.classList.add("hidden");

        subjectSection.classList.add("hidden");


        /* Show home */

        homeSection.classList.remove("hidden");


        /* Scroll to top */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);