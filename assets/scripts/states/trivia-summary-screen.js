// This is the trivia summary screen (shown when all of the questions have been resolved for a game)
let triviaSummaryScreen = {

    unloadState: function(nextState){

        // Hide the trivia summary screen section
        game.hideScreen('trivia-summary-screen');

        // Detach click event handler for the restart button
        BUTTON['restart-game-button'].off('click');
    },

    loadState: function(prevState){
        
        // Attach click event handler for the restart button
        BUTTON['restart-game-button'].on('click', function(){
            
            // Switch to the game screen
            sm.switchState('game-screen');
        });

        // Run the game completion code
        game.handleGameCompletion();

        // Show the trivia summary screen section
        game.showScreen('trivia-summary-screen');

    },
};

sm.addState('trivia-summary-screen', triviaSummaryScreen);
