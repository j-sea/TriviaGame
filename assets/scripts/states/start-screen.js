// This is the starting screen (shown when page loads)
let startScreenState = {

    unloadState: function(nextState){

        // Hide the start screen section
        game.hideScreen('start-screen');

        // Detach click event handler for the start button
        BUTTON['start-game-button'].off('click');
    },

    loadState: function(prevState){

        // Attach click event handler for the start button
        BUTTON['start-game-button'].on('click', function(){

            // Switch to the game screen
            sm.switchState('game-screen');
        });

        // Show the start screen section
        game.showScreen('start-screen');
    },
};

sm.addState('start-screen', startScreenState);
