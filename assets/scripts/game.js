// Game Settings
const SECONDS_PER_QUESTION = 30;
const SECONDS_PER_POPUP = 4;
const MAX_QUESTIONS_PER_GAME = 5;
const QUESTIONS = [
    {
        q: 'Question 1',
        a: 'Correct Answer',
        ia: [
            'Incorrect Answer A',
            'Incorrect Answer B',
            'Incorrect Answer C',
        ],
        r: 'Correct answer reward',
    },
    {
        q: 'Question 2',
        a: 'Correct Answer',
        ia: [
            'Incorrect Answer A',
            'Incorrect Answer B',
            'Incorrect Answer C',
        ],
        r: 'Correct answer reward',
    },
    {
        q: 'Question 3',
        a: 'Correct Answer',
        ia: [
            'Incorrect Answer A',
            'Incorrect Answer B',
            'Incorrect Answer C',
        ],
        r: 'Correct answer reward',
    },
    {
        q: 'Question 4',
        a: 'Correct Answer',
        ia: [
            'Incorrect Answer A',
            'Incorrect Answer B',
            'Incorrect Answer C',
        ],
        r: 'Correct answer reward',
    },
    {
        q: 'Question 5',
        a: 'Correct Answer',
        ia: [
            'Incorrect Answer A',
            'Incorrect Answer B',
            'Incorrect Answer C',
        ],
        r: 'Correct answer reward',
    },
    {
        q: 'Question 6',
        a: 'Correct Answer',
        ia: [
            'Incorrect Answer A',
            'Incorrect Answer B',
            'Incorrect Answer C',
        ],
        r: 'Correct answer reward',
    },
];


// Get references to all of our static HTML elements to save jQuery from selecting them each time
const SCREEN = {
    'start-screen': $('#start-screen'),
    'game-screen': $('#game-screen'),
    'correct-answer-screen': $('#correct-answer-screen'),
    'incorrect-answer-screen': $('#incorrect-answer-screen'),
    'time-ran-out-screen': $('#time-ran-out-screen'),
    'trivia-summary-screen': $('#trivia-summary-screen'),
};
const BUTTON = {
    'start-game-button': $('#start-game-button'),
    'restart-game-button': $('#restart-game-button'),
};
const TEXT = {
    'time-left': $('#time-left > span'),
    'question': $('#question > span'),
    'correct-answer': $('.correct-answer > span'),
    'incorrect-answer': $('.incorrect-answer > span'),
    'number-of-plays': $('#number-of-plays > span'),
    'number-of-correct-answers': $('#number-of-correct-answers > span'),
    'number-of-incorrect-answers': $('#number-of-incorrect-answers > span'),
};
const MENU = {
    'answers': $('#answers')
};

// Create an object to contain all of our game logic
let game = {

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
        
        // Attach click event handlers for the static buttons
        BUTTON['start-game-button'].on('click', function(){
            
            // Set up a new game, load a new question, and then switch to the game screen
            game.setupNewGame();
            game.loadNewQuestion();
            game.switchState('game-screen');
        });
        BUTTON['restart-game-button'].on('click', function(){
            
            // Set up a new game, load a new question, and then switch to the game screen
            game.setupNewGame();
            game.loadNewQuestion();
            game.switchState('game-screen');
        });

        // Hide all of the sections
        $('section').addClass('hidden');

        // Switch to the start screen
        game.switchState('start-screen');
    },

    // Set up a new game
    setupNewGame: function(){
        console.log('setting up a new game');

        // Reset all of the game state variables to their initial values
        game.currentQuestions = [];
        game.currentQuestionsArrayIndex = 0;
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

        // Reset the question time and update the display
        game.questionTimer = SECONDS_PER_QUESTION;
        TEXT['time-left'].text(`${game.questionTimer} seconds`);

        // Get the current question's data
        let currentQuestionObject = QUESTIONS[game.currentQuestions[game.currentQuestionsArrayIndex]];
        
        // Display the question text
        let currentQuestionText = currentQuestionObject.q;
        TEXT['question'].text(currentQuestionText);

        // Empty the answers menu if any menu items exist
        MENU['answers'].empty();
        
        // Add all of the answers (including the correct one) randomly into the answers menu
        let currentAnswerText = currentQuestionObject.a;
        let currentAnswerElement = $(`<li><button class="answer" role="menuitem" data-isAnswer="true">${currentAnswerText}</button></li>`);
        MENU['answers'].append(currentAnswerElement);
        for (let i = 0; i < currentQuestionObject.ia.length; i++) {
            const currentIncorrectAnswer = currentQuestionObject.ia[i];

            // Randomize whether we prepend or append our incorrect answer
            if (Math.floor(Math.random() * 2) === 0) {
                
                MENU['answers'].prepend(`<li><button class="answer" role="menuitem" data-isAnswer="false">${currentIncorrectAnswer}</button></li>`);
            }
            else {

                MENU['answers'].append(`<li><button class="answer" role="menuitem" data-isAnswer="false">${currentIncorrectAnswer}</button></li>`);
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
        
        // Increment the array index we'll use for the next question
        game.currentQuestionsArrayIndex++;
    },
    
    // Handle a Correct Guess
    handleCorrectGuess: function(correctGuessElement){
        console.log('handling correct guess');

        // Track the number of correct guesses
        game.numberOfCorrectGuesses++;

        // Set the correct answers texts
        TEXT['correct-answer'].text(correctGuessElement.text());

        // Switch to the correct answer screen
        game.switchState('correct-answer-screen');
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
        game.switchState('incorrect-answer-screen');
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

        // Switch to the time running out screen
        game.switchState('time-running-out-screen');
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

        // Switch to the trivia summary screen
        game.switchState('trivia-summary-screen');
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
    
    // Set up the different variables and State Objects needed to switch between Game States
    currentState: '',
    nextState: '',
    stateObjects: {
        
        // This is the starting screen (shown when page loads)
        'start-screen': {
            unloadState: function(){

                // Hide the start screen section
                game.hideScreen('start-screen');
            },
            loadState: function(){

                // Show the start screen section
                game.showScreen('start-screen');
            }
        },
        // This is the game screen (shown when receiving and answering questions)
        'game-screen': {
            unloadState: function(){

                // Hide the game screen section
                game.hideScreen('game-screen');

                // Clear the question interval so it no longer runs, if it exists
                if (game.timerIntervalID !== undefined) {

                    clearTimeout(game.timerIntervalID);
                    game.timerIntervalID = undefined;
                }
            },
            loadState: function(){

                // Show the game screen section
                game.showScreen('game-screen');
            }
        },
        'correct-answer-screen': {
            unloadState: function(){

                // Hide the correct answer screen section
                game.hideScreen('correct-answer-screen');
            },
            loadState: function(){

                // Create the timeout for this screen for its automatic transition
                game.popupTimeoutID = setTimeout(function(){
                    console.log('closing correct answer screen');

                    // Load a new question if there is another
                    if (game.currentQuestionsArrayIndex !== game.currentQuestions.length) {

                        game.loadNewQuestion();
                        game.switchState('game-screen');
                    }
                    // If there are no more questions, handle game completion
                    else {

                        game.handleGameCompletion();
                    }
                }, SECONDS_PER_POPUP * 1000);

                // Show the correct answer screen section
                game.showScreen('correct-answer-screen');
            }
        },
        'incorrect-answer-screen': {
            unloadState: function(){

                // Hide the incorrect answer screen section
                game.hideScreen('incorrect-answer-screen');
            },
            loadState: function(){

                // Create the timeout for this screen for its automatic transition
                game.popupTimeoutID = setTimeout(function(){
                    console.log('closing incorrect answer screen');

                    // Load a new question if there is another
                    if (game.currentQuestionsArrayIndex !== game.currentQuestions.length) {

                        game.loadNewQuestion();
                        game.switchState('game-screen');
                    }
                    // If there are no more questions, handle game completion
                    else {

                        game.handleGameCompletion();
                    }
                }, SECONDS_PER_POPUP * 1000);

                // Show the incorrect answer screen section
                game.showScreen('incorrect-answer-screen');
            }
        },
        'time-ran-out-screen': {
            unloadState: function(){

                // Hide the time ran out screen section
                game.hideScreen('time-ran-out-screen');
            },
            loadState: function(){

                // Create the timeout for this screen for its automatic transition
                game.popupTimeoutID = setTimeout(function(){
                    console.log('closing time ran out screen');

                    // Load a new question if there is another
                    if (game.currentQuestionsArrayIndex !== game.currentQuestions.length) {

                        game.loadNewQuestion();
                        game.switchState('game-screen');
                    }
                    // If there are no more questions, handle game completion
                    else {

                        game.handleGameCompletion();
                    }
                }, SECONDS_PER_POPUP * 1000);

                // Show the time ran out screen section
                game.showScreen('time-ran-out-screen');
            }
        },
        'trivia-summary-screen': {
            unloadState: function(){

                // Hide the trivia summary screen section
                game.hideScreen('trivia-summary-screen');
            },
            loadState: function(){

                // Show the trivia summary screen section
                game.showScreen('trivia-summary-screen');
            }
            
        }
    },

    // Set up the method to handle switching between Game States
    switchState(newState) {

        // Set the next state so individual states can plan accordingly
        game.nextState = newState;

        // If we have a state loaded already, unload it first
        if (game.currentState !== '') {
            console.log(`unloading '${game.currentState}' state`);

            game.stateObjects[game.currentState].unloadState(); // If the currentState isn't empty, the state object must exist; so no error checking necessary
        }

        // Now load the new state as long as it exists
        if (game.stateObjects.hasOwnProperty(newState)) {
            console.log(`loading '${newState}' state`);

            // Change the game state to our new state
            game.currentState = newState;

            // Load the new state
            game.stateObjects[game.currentState].loadState();
        }
        else {
            // Raise an exception if the current state doesn't exist since that probably means a typo in the state name occurred when calling the method
            throw `The state '${newState}' does not exist!`;
        }

        // Clear the next state since there isn't one anymore
        game.nextState = '';
    }
};

// Initialize and the game
game.initialize();