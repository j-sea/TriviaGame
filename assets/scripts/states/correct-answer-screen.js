// This is the correct answer screen (shown when the user makes a correct guess)
let correctAnswerScreenState = {

    unloadState: function(nextState){

        // Hide the correct answer screen section
        game.hideScreen('correct-answer-screen');
    },

    loadState: function(prevState){

        // Create the timeout for this screen for its automatic transition
        game.popupTimeoutID = setTimeout(function(){
            console.log('closing correct answer screen');

            // Load a new question if there is another
            if (game.currentQuestionsArrayIndex !== game.currentQuestions.length - 1) {

                sm.switchState('game-screen');
            }
            // If there are no more questions, switch to the summary screen
            else {

                sm.switchState('trivia-summary-screen');
            }
        }, SECONDS_PER_POPUP * 1000);

        // Show the correct answer screen section
        game.showScreen('correct-answer-screen');
    },
};

sm.addState('correct-answer-screen', correctAnswerScreenState);
