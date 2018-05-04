// Trvia Questions Array

var questions = [
    {
        question: "Who is the only person to become US Vice President and then President without being elected to either office?",
        choices: ["Gerald Ford", "William Henry Harrison", "Jimmy Carter", "Lyndon B Johnson"],
        answer: 0,
        image: "assets/images/ford.jpg"
    },
    {
        question: "What planet would you weigh the most on?",
        choices: ["Mercury", "Jupiter", "Saturn", "Venus"],
        answer: 1,
        image: "assets/images/jupiter.jpg"
    },
    {
        question: "Also called the \"brain case\", what is the name of the top part of the skull which encloses the brain?",
        choices: ["Cranium", "Mandible", "Femur", "Temporal"],
        answer: 0,
        image: "assets/images/cranium.png"
    },
    {
        question: "The Kalahari Desert is located on what continent?",
        choices: ["South America", "Australia", "Asia", "Africa"],
        answer: 3,
        image: "assets/images/africa.jpg"
    },
    {
        question: "8 quarts equals how many pints?",
        choices: ["32", "4", "16", "24"],
        answer: 2,
        image: "assets/images/pints.png"
    },
    {
        question: "Which founder of the National Women's Suffrage Association was pictured on the face of a US dollar?",
        choices: ["Sacagawea", "Susan B. Anthony", "Eunice Kennedy Shriver","Elizabeth Cady Stanton"],
        answer: 1,
        image: "assets/images/anthony.jpg"
    },
    {
        question: "Which of the following ranks in the US Army is the highest?",
        choices: ["Major", "Captain", "Sergeant", "Colonel"],
        answer: 3,
        image: "assets/images/colonel.png"
    },
    {
        question: "What is the maximum number of Thursdays that can occur in a given calendar year?",
        choices: ["53", "55", "52", "54"],
        answer: 0,
        image: "assets/images/thursday.png"
    },
    {
        question: "What is the only US capital located south of Miami, Florida?",
        choices: ["Austin, Texas", "Honolulu, Hawaii", "Santa Fe, New Mexico", "Baton Rouge, Louisiana"],
        answer: 1,
        image: "assets/images/honolulu.png"
    },
    {
        question: "The alpaca is a species of animal in what family?",
        choices: ["Lizards", "Dogs", "Camels", "Cats"],
        answer: 2,
        image: "assets/images/alpacas.jpg"
    }]


var questionCounter = 0;
var choiceHolder = 0;    
var timerCount = 20;
var interval;
var isRunning = false;
var corAnswer = 0;
var incorAnswer = 0;
var noAnswer = 0; 

// Timer Functionality

function run() {
    if (!isRunning && (timerCount > 0)) {
        clearInterval(interval);
        interval = setInterval(decrement, 1000);
        isRunning = true;
    }
}

function decrement() {
    timerCount--;
    $("#timer").text(timerCount);
    if (timerCount === 0) {
        stop();
        timesUpDisplay(questionCounter);
    }
}

function stop() {
    if(isRunning){
        clearInterval(interval);
        isRunning = false;
    }
}

//Display Questions

function displayQuestion (questionCounter) {
    $("#questionsContainer").empty();
    $("#choicesContainer").empty();
    var currentQuestion = questions[questionCounter];
    $("#questionsContainer").text(currentQuestion.question);
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = $("<div>");
        choice.attr("data-choicevalue", i).attr("class", "choices").text(currentQuestion.choices[i]);
        $("#choicesContainer").append(choice);
    }
    run();
}

function nextQuestion(questionCounter) {

    setTimeout(function(){
    timerCount = 20;
    $("#timer").text(20);
    $(".goodJob").remove();
    $(".xout").remove();
    $(".timesUp").remove();
    displayQuestion(questionCounter);
}, 3000);
}

    //On-Click Functions

    $(document).on("click", ".choices", function() {
        var choiceValue = $(this).attr("data-choicevalue");
        choiceValue = parseInt(choiceValue);
        //Brings click values to the global level.
        choiceHolder = choiceValue;
        
        //Correctness Check

        if (choiceValue === questions[questionCounter].answer) {        
            stop();
            correctDisplay(choiceValue);
        } else {
            stop();
            incorrectDisplay(choiceValue);
        }

        function correctDisplay(choiceValue){
            $("#choicesContainer").empty();
            var image = $("<img>");
                image.attr("src", questions[questionCounter].image).attr("class", "img-fluid corrincorrect");
            $("#choicesContainer").append(image);
            var selection = $("<div>");
                selection.attr("class", "selection").text(questions[questionCounter].choices[choiceValue]);
            $("#choicesContainer").append(selection);
            var confirm = $("<div>");
                confirm.attr("class", "confirm").text("Correct!");
            $("#choicesContainer").append(confirm);
            var goodJob = $("<img>");
                goodJob.attr("src", "assets/images/goodjob.png").attr("class", "img-fluid goodJob");
            $(".jumbotron").append(goodJob);
            questionCounter++;
            corAnswer++;
            if (questionCounter === questions.length) {
                setTimeout(finishedDisplay, 3000);
            } else { 
                nextQuestion(questionCounter);
            }
        }

        function incorrectDisplay(choiceValue){
            $("#choicesContainer").empty();
            var image = $("<img>");
                image.attr("src", questions[questionCounter].image).attr("class", "img-fluid corrincorrect");
            $("#choicesContainer").append(image);
            var selection = $("<div>");
                selection.attr("class", "wrongSelection").text(questions[questionCounter].choices[choiceValue]);
            $("#choicesContainer").append(selection);
            var reveal = $("<div>");
                reveal.attr("class", "reveal").text(questions[questionCounter].choices[questions[questionCounter].answer]);
            $("#choicesContainer").append(reveal);
            var xout = $("<img>");
                xout.attr("src", "assets/images/xout.png").attr("class", "img-fluid xout");
            $(".jumbotron").append(xout);
            questionCounter++;
            incorAnswer++
            if (questionCounter === questions.length) {
                setTimeout(finishedDisplay, 3000);
            } else { 
                nextQuestion(questionCounter);
            }
        }
    });

// Time's Up Display

function timesUpDisplay(chicken){   

    $("#questionsContainer").text(questions[chicken].question);
    $("#choicesContainer").empty();
    var image = $("<img>");
        image.attr("src", questions[chicken].image).attr("class", "img-fluid corrincorrect");
    var timesUpReveal = $("<div>");
        timesUpReveal.attr("class", "timesUpReveal").text("The correct answer was: " + questions[chicken].choices[questions[chicken].answer]);
    $("#choicesContainer").append(image, timesUpReveal);

    var timesUp = $("<img>");
        timesUp.attr("src", "assets/images/timesup.png").attr("class", "img-fluid timesUp");
    $(".jumbotron").append(timesUp);

    noAnswer++;
    questionCounter++;
    if (questionCounter === questions.length) {
        setTimeout(finishedDisplay, 3000);
    } else { 
        nextQuestion(questionCounter);
    }
}

// Finished

function finishedDisplay(){
  
    $("#questionsContainer").empty();
    $("#choicesContainer").empty();
    $(".goodJob").remove();
    $(".xout").remove();
    $(".timesUp").remove();


    var resultMessage = $("<div>");
        resultMessage.attr("class", "mx-auto resultMessage").html("All done!<br/>Here's how you did!");
    $("#questionsContainer").append(resultMessage);

    var results = $("<div>");
        results.attr("class", "mx-auto results");
    var playAgain = $("<div>");
        playAgain.attr("class", "mx-auto playAgain").text("Play Again?");
    $("#choicesContainer").append(results, playAgain);

    var corAnResults = $("<div>");
        corAnResults.attr("class", "mx-auto corAnResults results-stats").text("Correct Answered: " + corAnswer);
    var incorAnResults = $("<div>");
        incorAnResults.attr("class", "mx-auto incorAnResults results-stats").text("Incorrect Answers: " + incorAnswer);
    var noAnResults = $("<div>");
        noAnResults.attr("class", "mx-auto noAnResults results-stats").text("Unanswered: " + noAnswer);
    $(results).append(corAnResults,incorAnResults,noAnResults);

    var confetti = $("<img>");
        confetti.attr("src", "assets/images/confetti.png").attr("class", "img-fluid confetti");
    $(".jumbotron").append(confetti);
}

$(document).on("click", ".playAgain", function(){
    reset();
});

// Start

function startDisplay(){
    $("#timer").text(20);

    $("#choicesContainer").empty();

    var startImage = $("<img>");
        startImage.attr("src", "assets/images/start.png").attr("class", "img-fluid startImage");
    var startButton = $("<div>");
        startButton.attr("class", "mx-auto startButton").text("Start");
    $("#choicesContainer").append(startImage, startButton);
}

startDisplay();

$(document).on("click", ".startButton", function(){
    displayQuestion(questionCounter);
    $(".timer-div").removeClass("isHidden");
})

// Reset

function reset() {
    $("#questionsContainer").empty();
    $("#choicesContainer").empty();
    $(".confetti").remove();
    questionCounter = 0;
    choiceHolder = 0;    
    timerCount = 20;
    corAnswer = 0;
    incorAnswer = 0;
    noAnswer = 0;
    displayQuestion(questionCounter);
}