// Create an object to contain all of our game logic
var game = {

    // Set up necessary variables to keep track of the game state
    numberOfPlays: 0,
    currentQuestions: [],
    currentQuestionsArrayIndex: -1,
    numberOfCorrectGuesses: 0,
    numberOfIncorrectGuesses: 0,
    questionTimer: 0,
    timerIntervalID: undefined,
    popupTimeoutID: undefined,

    // Initialize the Game (happens on page load)
    initialize: function(){
        console.log('initializing trivia game');

        // Hide all of the sections
        $('section').addClass('hidden');

        // Switch to the start screen
        sm.switchState('start-screen');
    },

    // Set up a new game
    setupNewGame: function(){
        console.log('setting up a new game');

        // Reset all of the game state variables to their initial values
        game.currentQuestions = [];
        game.currentQuestionsArrayIndex = -1;
        game.timerIntervalID = undefined;
        game.popupTimeoutID = undefined;
        game.numberOfCorrectGuesses = 0;
        game.numberOfIncorrectGuesses = 0;

        // Load our questions array with new questions
        // NOTE: Ensure that the current questions aren't more than allowed
        while(game.currentQuestions.length < MAX_QUESTIONS_PER_GAME
              && game.currentQuestions.length < QUESTIONS.length) {

            // Get a new random index
            let newQuestionIndex = Math.floor(Math.random() * QUESTIONS.length);
            if (!game.currentQuestions.includes(newQuestionIndex)) {

                // Add the new question to the current questions array via its index
                game.currentQuestions.push(newQuestionIndex);
            }
        }
        
        console.log('questions loaded');
        console.log(game.currentQuestions);
    },

    // Load a new question to ask along with its answers
    loadNewQuestion: function(){
        console.log('loading new question');

        // Increment the array index we'll use for the new question
        game.currentQuestionsArrayIndex++;

        // Reset the question time and update the display
        game.questionTimer = SECONDS_PER_QUESTION;
        TEXT['time-left'].text(`${game.questionTimer} seconds`);

        // Get the current question's data
        let currentQuestionObject = QUESTIONS[game.currentQuestions[game.currentQuestionsArrayIndex]];
        
        // Display the question text
        let currentQuestionText = currentQuestionObject.q;
        TEXT['question'].html(currentQuestionText);

        // Empty the answers menu if any menu items exist
        MENU['answers'].empty();
        
        // Add all of the answers (including the correct one) into the answers menu
        let currentAnswerText = currentQuestionObject.a;
        let currentAnswerElement = $(`<li><button class="answer" role="menuitem" data-isAnswer="true">${currentAnswerText}</button></li>`);
        MENU['answers'].append(currentAnswerElement);
        for (let i = 0; i < currentQuestionObject.ia.length; i++) {
            const currentIncorrectAnswer = currentQuestionObject.ia[i];

            let randomIndex = Math.floor(Math.random() * (i + 1));
            let insertionPoint = MENU['answers'].find(`li:nth-child(${randomIndex+1})`);
            console.log(insertionPoint);
            // Randomize whether we prepend or append our incorrect answer
            if (Math.floor(Math.random() * 2) === 0) {
                
                insertionPoint.before(`<li><button class="answer" role="menuitem" data-isAnswer="false">${currentIncorrectAnswer}</button></li>`);
            }
            else {

                insertionPoint.after(`<li><button class="answer" role="menuitem" data-isAnswer="false">${currentIncorrectAnswer}</button></li>`);
            }
        }

        // Attach click event handlers to all of the answer buttons
        $('.answer').on('click', function(){
            console.log('handling answer click');

            if ($(this).attr('data-isAnswer') === 'true') {
                game.handleCorrectGuess(currentAnswerElement.find('button'));
            }
            else {
                game.handleIncorrectGuess(currentAnswerElement.find('button'), $(this));
            }
        });
        
        // Start a timer to initiate the countdown
        game.timerIntervalID = setInterval(game.handleQuestionTimer, 1000);
    },

    // Handle a Correct Guess
    handleCorrectGuess: function(correctGuessElement){
        console.log('handling correct guess');

        // Track the number of correct guesses
        game.numberOfCorrectGuesses++;

        // Set the correct answers texts
        TEXT['correct-answer'].text(correctGuessElement.text());

        // Switch to the correct answer screen
        sm.switchState('correct-answer-screen');
    },

    // Handle an Incorrect Guess
    handleIncorrectGuess: function(correctGuessElement, incorrectGuessElement){
        console.log('handling incorrect guess');

        // Track the number of incorrect guesses
        game.numberOfIncorrectGuesses++;

        // Set the correct answers texts
        TEXT['correct-answer'].text(correctGuessElement.text());
        
        // Set the incorrect answers texts
        TEXT['incorrect-answer'].text(incorrectGuessElement.text());
        
        // Switch to the incorrect answer screen
        sm.switchState('incorrect-answer-screen');
    },
    
    // Handle the Time Running Out
    handleTimeRunningOut: function(){
        console.log('handling time running out');

        // Track the number of incorrect guesses
        game.numberOfIncorrectGuesses++;

        // Get the current question's data
        let currentQuestionObject = QUESTIONS[game.currentQuestions[game.currentQuestionsArrayIndex]];

        // Set the correct answers texts
        TEXT['correct-answer'].text(currentQuestionObject.a);

        // Switch to the time ran out screen
        sm.switchState('time-ran-out-screen');
    },
    
    // Handle the Question Timer (used in an interval)
    handleQuestionTimer: function(){
        console.log('handling question timer');
        
        // Decrement the question timer and update the display
        game.questionTimer--;
        TEXT['time-left'].text(`${game.questionTimer} seconds`);

        // If we've run out of time
        if (game.questionTimer === 0) {

            // Handle time running out
            game.handleTimeRunningOut();
        }
    },

    // Handle game completion
    handleGameCompletion: function(){
        console.log('handling game completion');
        
        // Increment the number of plays and update the text
        game.numberOfPlays++;
        TEXT['number-of-plays'].text(game.numberOfPlays);
        
        // Update the correct and incorrect guesses texts
        TEXT['number-of-correct-answers'].text(game.numberOfCorrectGuesses);
        TEXT['number-of-incorrect-answers'].text(game.numberOfIncorrectGuesses);
    },

    // Set up methods for hiding and showing screens
    hideScreen: function(screenName){
        console.log(`hiding screen: ${screenName}`);

        SCREEN[screenName].addClass('hidden');
    },

    showScreen: function(screenName){
        console.log(`showing screen: ${screenName}`);

        SCREEN[screenName].removeClass('hidden');
    },
};

// Initialize and start the game code
game.initialize();
