// This is the incorrect answer screen (shown when a user guesses incorrectly)
let incorrectAnswerScreenState = {

    unloadState: function(nextState){

        // Hide the incorrect answer screen section
        game.hideScreen('incorrect-answer-screen');
    },

    loadState: function(prevState){

        // Create the timeout for this screen for its automatic transition
        game.popupTimeoutID = setTimeout(function(){
            console.log('closing incorrect answer screen');

            // Load a new question if there is another
            if (game.currentQuestionsArrayIndex !== game.currentQuestions.length - 1) {

                sm.switchState('game-screen');
            }
            // If there are no more questions, switch to the summary screen
            else {

                sm.switchState('trivia-summary-screen');
            }
        }, SECONDS_PER_POPUP * 1000);

        // Show the incorrect answer screen section
        game.showScreen('incorrect-answer-screen');
    }
};

sm.addState('incorrect-answer-screen', incorrectAnswerScreenState);
