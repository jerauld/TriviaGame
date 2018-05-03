// ###############################################
//      TRIVIA QUESTIONS ARRAY
// ###############################################

var questions = [
    {
        question: "Who is the only person to beome US Vice President and then President without being elected to either office?",
        choices: ["Gerald Ford", "William Henry Harrison", "Jimmy Carter", "Lyndon B Johnson"],
        answer: 0,
        image: "assets/images/ford.jpg"
    },
    {
        question: "What planet would you weight the most on?",
        choices: ["Mercury", "Jupiter", "Saturn", "Venus"],
        answer: 1,
        image: "assets/images/jupiter.jpg"
    },
    {
        question: "Also called the brain case, what is the name of the top part  ofthe skull which encloses the brain?",
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
        question: "What is the maximum of Thursdays that can occur in a given calendar year?",
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

// ###############################################
//      TIMER FUNCTIONALITY
// ###############################################

var number = 30;
var interval;
var isRunning = false; 

$("#stop").on("click", stop);
$("#resume").on("click", run);

function run() {
    if (!isRunning && (number > 0)) {
        clearInterval(interval);
        interval = setInterval(decrement, 1000);
        isRunning = true;
    }
}

function decrement() {
    number--;
    $("#timer").text(number);
    if (number === 0) {
        stop();
        alert("Time's up!");
    }
}

function stop() {
    if(isRunning){
        clearInterval(interval);
        isRunning = false;
    }
}

// run();

// ###############################################
//      DISPLAY QUESTIONS
// ###############################################
var questionCounter = 0;
var choiceHolder = 0;

function displayQuestion (questionCounter) {
    $("#questionsContainer").empty();
    $("#choicesContainer").empty();
    console.log(questionCounter);
    var currentQuestion = questions[questionCounter];
    $("#questionsContainer").text(currentQuestion.question);
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = $("<div>");
        choice.attr("data-choicevalue", i).attr("class", "choices").text(currentQuestion.choices[i]);
        $("#choicesContainer").append(choice);
    }
}

// ###############################################
//      CHOICE CLICK FUNCTIONALITY
// ###############################################

$(document).on("click", ".choices", function() {
    var choiceValue = $(this).attr("data-choicevalue");
    choiceValue = parseInt(choiceValue);
    //Brings click values to the global level.
    choiceHolder = choiceValue;
    
    //Checks user selection correctness.
    if (choiceValue === questions[questionCounter].answer) {        
            // questionCounter++;
            // displayQuestion(questionCounter);
            correctDisplay(choiceValue);
      
    } else {
            // alert("Incorrect!");
            // $("#questionsContainer").text("");
            // $("#choicesContainer").empty();
            // questionCounter++;
            // displayQuestion(questionCounter);
            incorrectDisplay(choiceValue);

    }

    // ###############################################
    //      CORRECT (ANSWER) DISPLAY
    // ###############################################

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
        console.log(questionCounter);
        questionCounter++
        nextQuestion(questionCounter);
    }

    // ###############################################
    //      INCORRECT (ANSWER) DISPLAY
    // ###############################################

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
        questionCounter++
        nextQuestion(questionCounter);
    }

    function nextQuestion(questionCounter) {
        if (questionCounter === questions.length - 1) {
            finishedDisplay();
        } else { setTimeout(function(){
            $(".goodJob").remove();
            displayQuestion(questionCounter);
        }, 3000);
      }
    }
});

// ###############################################
//      TIMES UP DISPLAY
// ###############################################

function timesUpDisplay(choiceValue){

    //CLEAR CONTAINERS
    $("#questionsContainer").text(questions[questionCounter].question);
    $("#choicesContainer").empty();

    //TIMES UP IMAGE AND REVEALED ANSWER
    var image = $("<img>");
    image.attr("src", questions[questionCounter].image).attr("class", "img-fluid corrincorrect");
    var timesUpReveal = $("<div>");
    timesUpReveal.attr("class", "timesUpReveal").text("The correct answer was: " + questions[questionCounter].choices[choiceValue]);
    $("#choicesContainer").append(image, timesUpReveal);

    //TIMES UP STICKER
    var timesUp = $("<img>");
    timesUp.attr("src", "assets/images/timesup.png").attr("class", "img-fluid timesUp");
    $(".jumbotron").append(timesUp);
}

// timesUpDisplay(choiceHolder);

// ###############################################
//      FINISHED DISPLAY
// ###############################################

function finishedDisplay(choiceValue){
    //CLEAR CONTAINERS
    $("#choicesContainer").empty();

    //RESULTS HEADER
    var resultMessage = $("<div>");
    resultMessage.attr("class", "mx-auto resultMessage").html("All done!<br/>Here's how you did!");
    $("#questionsContainer").append(resultMessage);
    

    //RESULTS CONTAINER & PLAY AGAIN BUTTON
    var results = $("<div>");
    results.attr("src", questions[questionCounter].results).attr("class", "mx-auto results");
    var playAgain = $("<div>");
    playAgain.attr("class", "mx-auto playAgain").text("Play Again?");
    $("#choicesContainer").append(results, playAgain);

    //RESULTS STATS
    var cAResults = $("<div>");
    cAResults.attr("class", "mx-auto cAResults results-stats").text("Correct Answered: 0");
    var iAResults = $("<div>");
    iAResults.attr("class", "mx-auto iAResults results-stats").text("Incorrect Answers: 0");
    var uAResults = $("<div>");
    uAResults.attr("class", "mx-auto uAResults results-stats").text("Unanswered: 0");
    $(results).append(cAResults,iAResults,uAResults);

    //CONFETTI OVERLAY
    var confetti = $("<img>");
    confetti.attr("src", "assets/images/confetti.png").attr("class", "img-fluid confetti");
    $(".jumbotron").append(confetti);
}

// finishedDisplay(choiceHolder);

// ###############################################
//      START DISPLAY
// ###############################################

function startDisplay(){
    //CLEAR CONTAINERS
    $("#choicesContainer").empty();

    //RESULTS CONTAINER & PLAY AGAIN BUTTON
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