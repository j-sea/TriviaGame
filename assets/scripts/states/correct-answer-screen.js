let correctAnswerScreenState = {
    unloadState: function(){

        // Hide the correct answer screen section
        game.hideScreen('correct-answer-screen');
    },
    loadState: function(){

        // Create the timeout for this screen for its automatic transition
        game.popupTimeoutID = setTimeout(function(){
            console.log('closing correct answer screen');

            // Load a new question if there is another
            if (game.currentQuestionsArrayIndex !== game.currentQuestions.length - 1) {

                game.switchState('game-screen');
            }
            // If there are no more questions, switch to the summary screen
            else {

                game.switchState('trivia-summary-screen');
            }
        }, SECONDS_PER_POPUP * 1000);

        // Show the correct answer screen section
        game.showScreen('correct-answer-screen');
    },
};

game.stateObjects['correct-answer-screen'] = correctAnswerScreenState;
