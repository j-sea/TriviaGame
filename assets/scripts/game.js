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

    // Set up the different variables needed to switch between Game States
    currentState: '',
    previousState: '',
    nextState: '',
    stateObjects: {},

    // Initialize the Game (happens on page load)
    initialize: function(){
        console.log('initializing trivia game');

        // Hide all of the sections
        $('section').addClass('hidden');

        // Switch to the start screen
        game.switchState('start-screen');
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

            // Set the previous state so individual states can plan accordingly
            game.previousState = game.currentState;

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
