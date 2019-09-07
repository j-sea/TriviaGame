

// Get references to all of our static HTML elements to save jQuery from selecting them each time
const SCREEN = {
    'start-screen': $('#start-screen'),
    'game-screen': $('#game-screen'),
    'correct-answer-screen': $('#correct-answer-screen'),
    'incorrect-answer-screen': $('#incorrect-answer-screen'),
    'time-ran-out-screen': $('#time-ran-out-screen'),
    'win-summary-screen': $('#win-summary-screen'),
    'lose-summary-screen': $('#lose-summary-screen'),
}

// Create an object to contain all of our game logic
let game = {

    // Set up necessary variables to keep track of the game state
    currentQuestions: [],
    currentQuestionIndex: -1,
    numberOfWins: 0,
    numberOfLosses: 0,
    timerIntervalID: undefined,
    popupTimeoutID: undefined,
    
    // Initialize the Game (happens on page load)
    initialize: function(){
        console.log('initializing trivia game');

        // Hide all of the sections except the start screen
        $('section').addClass('hidden');
        game.showScreen('start-screen');
    },
    
    // Set up a new game
    
    // Load a new question to ask along with its answers
    
    // Handle a Correct Guess

    // Handle an Incorrect Guess
    
    // Handle the Time Running Out
    
    // Handle game completion
    
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