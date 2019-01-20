// trivia game.  5 questions.  timer is set to 60 seconds on beginning.  when start button is clicked, timer starts counting down.

var questions = [ {
    ques: "Saigon is the former name of the largest city of which Asian nation?",
    ans: ["Thailand", "Laos", "Malaysia", "Vietnam"],
    name: "saigon",
    correct: "Vietnam",
    divClass: ".saigon",
    },
    {
    ques: "Which of the following is the largest country by area?",
    ans: ["France", "Germany", "Ukraine", "Spain"],
    name: "largestEurope",
    correct: "Ukraine",
    divClass: ".largestEurope",
    },
    {
    ques: "Which of the following is the largest country by population in Africa?",
    ans: ["Democratic Republic of Congo", "Nigeria", "Ethiopia", "Egypt"],
    name: "largestAfrica",
    correct: "Nigeria",
    divClass: ".largestAfrica",
    },
    {
    ques: "Of the following nations, which has the largest GDP, as of 2018?",
    ans: ["Spain", "South Korea", "Mexico", "Turkey"],
    name: "largestGDP",
    correct: "South Korea",
    divClass: ".largestGDP",
    }, 
    {   
    ques: "Which of the following countries has the highest HDI (human development index), as of 2018?",
    ans: ["Panama", "Chile", "Uruguay", "Costa Rica"],
    name: "highestHDI",
    correct: "Chile",
    divClass: ".highestHDI",
    }    
]

// click to start then display quesions
var startGame = $("#startBtn").on('click', function() {
    $(this).hide();
    $(this).parent().hide();
    $('.container').show();
    countdown(60);
    showQuestion();
});

var answerPlace = ["first", "second", "third", "forth"];

// counts down from 60 to 0.  integer seconds reduces value by one each second.
var countdown = function(seconds) {

    var timer = setInterval(function() {
        seconds = seconds - 1;
        $("#timeRemaining").text(seconds);

        if (seconds <= 0) {
            $('.container').fadeOut(1000);
            var correctAnswers = 0;
            var wrongAnswers = 0;
            for (var i = 0; i < 5; i++) {
                
                if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {
                    correctAnswers++;
                } else {
                    wrongAnswers++;
                };
            }
            $('#correctResults').append(correctAnswers);
            $('#wrongResults').append(wrongAnswers);
            $('#timesUp').fadeIn(1000).show();

            clearInterval(timer);
            return;
        }
    }, 1000);

    $('#subBtn').on('click', function() {
        clearInterval(timer);
    })
};

// this will display the questions. loop through them and assign answers to each div.

var showQuestion = function() {
    $(".questions :not('#subBtn')").empty();
    for (var j = 0; j < 5; j++) {
        $('.questions').prepend('<div class="' + questions[j].name + '"></div>');
        $(questions[j].divClass).append('<div class ="ques-title">' + questions[j].ques + '</div>');
        for (var i = 0; i <= 3; i++) {
            $(questions[j].divClass).append('<input type="radio"  name=" ' + questions[j].name + '" value="' 
            + questions[j].ans[i] + '"/><label for="' + answerPlace[i] + '">' + questions[j].ans[i] + '</label><br>');
        }
        $('.questions').prepend('<hr />');
    }
}

// upon submission, analyzes results.  final functions updates the DOM with the number of correct and incorrect answers.
var gradeQuiz = $('#subBtn').on('click', function() {

    var correctAnswers = 0;
    var wrongAnswers = 0;

    for (var i = 0; i < 5; i++) {

        if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        };
    };

    //resets things.  counts down.  fades it out very quickly. shows results divs containing the correct/wrong answers.
    countdown();
    $('.container').fadeOut(100);
    $('#answerScreen').show();
    $('#correctResults').append(correctAnswers);
    $('#wrongResults').append(wrongAnswers);

}); 