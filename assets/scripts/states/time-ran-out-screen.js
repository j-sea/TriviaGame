let timeRanOutScreenState = {

    unloadState: function(){

        // Hide the time ran out screen section
        game.hideScreen('time-ran-out-screen');
    },

    loadState: function(){

        // Create the timeout for this screen for its automatic transition
        game.popupTimeoutID = setTimeout(function(){
            console.log('closing time ran out screen');

            // Load a new question if there is another
            if (game.currentQuestionsArrayIndex !== game.currentQuestions.length - 1) {

                game.switchState('game-screen');
            }
            // If there are no more questions, switch to the summary screen
            else {

                game.switchState('trivia-summary-screen');
            }
        }, SECONDS_PER_POPUP * 1000);

        // Show the time ran out screen section
        game.showScreen('time-ran-out-screen');
    }
};

game.stateObjects['time-ran-out-screen'] = timeRanOutScreenState;
