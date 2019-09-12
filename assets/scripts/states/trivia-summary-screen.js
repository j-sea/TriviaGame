let triviaSummaryScreen = {

    unloadState: function(){

        // Hide the trivia summary screen section
        game.hideScreen('trivia-summary-screen');

        // Detach click event handler for the restart button
        BUTTON['restart-game-button'].off('click');
    },

    loadState: function(){
        
        // Attach click event handler for the restart button
        BUTTON['restart-game-button'].on('click', function(){
            
            // Switch to the game screen
            game.switchState('game-screen');
        });

        // Run the game completion code
        triviaSummaryScreen.handleGameCompletion();

        // Show the trivia summary screen section
        game.showScreen('trivia-summary-screen');

    },

    // Handle game completion
    handleGameCompletion: function(){
        console.log('handling game completion');
        
        // Increment the number of plays and update the text
        game.numberOfPlays++;
        TEXT['number-of-plays'].text(game.numberOfPlays);
        
        // Update the correct and incorrect guesses texts
        TEXT['number-of-correct-answers'].text(game.numberOfCorrectGuesses);
        TEXT['number-of-incorrect-answers'].text(game.numberOfIncorrectGuesses);
    },
};

game.stateObjects['trivia-summary-screen'] = triviaSummaryScreen;
