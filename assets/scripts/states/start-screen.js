// This is the starting screen (shown when page loads)
let startScreenState = {

    unloadState: function(){

        // Hide the start screen section
        game.hideScreen('start-screen');

        // Detach click event handler for the start button
        BUTTON['start-game-button'].off('click');
    },

    loadState: function(){

        // Attach click event handler for the start button
        BUTTON['start-game-button'].on('click', function(){

            // Switch to the game screen
            game.switchState('game-screen');
        });

        // Show the start screen section
        game.showScreen('start-screen');
    },
}

game.stateObjects['start-screen'] = startScreenState;
