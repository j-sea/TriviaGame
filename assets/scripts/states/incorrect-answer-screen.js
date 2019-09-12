let incorrectAnswerScreenState = {
    
    unloadState: function(){

        // Hide the incorrect answer screen section
        game.hideScreen('incorrect-answer-screen');
    },
    loadState: function(){

        // Create the timeout for this screen for its automatic transition
        game.popupTimeoutID = setTimeout(function(){
            console.log('closing incorrect answer screen');

            // Load a new question if there is another
            if (game.currentQuestionsArrayIndex !== game.currentQuestions.length - 1) {

                game.switchState('game-screen');
            }
            // If there are no more questions, switch to the summary screen
            else {

                game.switchState('trivia-summary-screen');
            }
        }, SECONDS_PER_POPUP * 1000);

        // Show the incorrect answer screen section
        game.showScreen('incorrect-answer-screen');
    }
};

game.stateObjects['incorrect-answer-screen'] = incorrectAnswerScreenState;
