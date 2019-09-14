// This is the time-ran-out screen (shown when user does not guess in the allotted time)
let timeRanOutScreenState = {

    unloadState: function(nextState){

        // Hide the time ran out screen section
        game.hideScreen('time-ran-out-screen');
    },

    loadState: function(prevState){

        // Create the timeout for this screen for its automatic transition
        game.popupTimeoutID = setTimeout(function(){
            console.log('closing time ran out screen');

            // Load a new question if there is another
            if (game.currentQuestionsArrayIndex !== game.currentQuestions.length - 1) {

                sm.switchState('game-screen');
            }
            // If there are no more questions, switch to the summary screen
            else {

                sm.switchState('trivia-summary-screen');
            }
        }, SECONDS_PER_POPUP * 1000);

        // Show the time ran out screen section
        game.showScreen('time-ran-out-screen');
    }
};

sm.addState('time-ran-out-screen', timeRanOutScreenState);
