// This is the game screen (shown when receiving and answering questions)
let gameScreenState = {

    unloadState: function(nextState){

        // Hide the game screen section
        game.hideScreen('game-screen');

        // Clear the question interval so it no longer runs, if it exists
        if (game.timerIntervalID !== undefined) {

            clearTimeout(game.timerIntervalID);
            game.timerIntervalID = undefined;
        }
    },

    loadState: function(prevState){

        // If we're coming from the start screen or the trivia screen, let's set up a new game
        if (prevState === 'start-screen' || prevState === 'trivia-summary-screen') {

            // Set up a new game and load a new question
            game.setupNewGame();
            game.loadNewQuestion();
        }

        // If we're coming from the correct answer screens, let's set up a new question
        else if (prevState === 'correct-answer-screen' || prevState === 'incorrect-answer-screen' || prevState === 'time-ran-out-screen') {

            // Let's load a new question
            game.loadNewQuestion();
        }

        // Show the game screen section
        game.showScreen('game-screen');
    },
};

sm.addState('game-screen', gameScreenState);
