(function(){ // START: Hide code from the global scope

// Game Settings
const SECONDS_PER_QUESTION = 30;
const SECONDS_PER_POPUP = 4;
const MAX_QUESTIONS_PER_GAME = 5;
const QUESTIONS = [
    {
        q: '<h3>T.V. Show (Animated)</h3><p>This show sets itself apart with incredibly heavy-hitting morals as it progresses. If you haven\'t seen this show, I highly <em>highly</em> recommend it for all ages. It\'s a show full of love without stipulations.</p>',
        a: 'Steven Universe',
        ia: [
            'Barney and Friends',
            'Powerpuff Girls',
            'Akira',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/MIREK5ZL1jA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>T.V. Show (Animated)</h3><p>Amusing and energetic, this show sets itself apart with its wildly weird world based on Irish and Celtic mythology and its deep exploration of friendship and overcoming life\'s hardships.</p>',
        a: 'Adventure Time',
        ia: [
            'Spongebob Squarepants',
            'The Secret of Kells',
            'Pan\'s Labyrinth',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/gfijG7pmMqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>T.V. Show (Musical Comedy)</h3><p>Hilariously tongue-in-cheek, this show is a great way to relax and enjoy your leisure time. Follow our protagonist as they journey to save their beloved. And yes, they all really do sing. It\'s amazing.</p>',
        a: 'Galavant',
        ia: [
            'Glee',
            'High School Musical',
            'Sing',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/QWnDwM0RSX4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>T.V. Show (Comedy)</h3><p>One of the best cop shows in existence with a perfect casting, this series maintains a light-hearted mood most of the time while handling several serious topics with a mostly-mature attitude. A relative in the police force informed me it was the most accurate portrayal of police office politics on television.</p>',
        a: 'Brooklyn Nine-Nine',
        ia: [
            'Law & Order',
            'Southland',
            'Super Troopers',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube.com/embed/nYtJSpH4aUY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>Roguelike Video Game</h3><p>One of the best aesthetics in a roguelike in recent years, this game continues to challenge you more and more even after you manage to beat it\'s increasingly-harder modes. While a solid roguelike, it is also a top-quality metroidvania game.</p>',
        a: 'Dead Cells',
        ia: [
            'Rogue Legacy',
            'Darkest Dungeon',
            'Vagante',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/RvGaSPTcTxc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>T.V. Show (Animated)</h3><p>One of the most frustratingly-relatable and loveable shows, navigating feelings plays a key role in its protagonist\'s daily life just trying to survive, and we get to share in the ups and downs that come along with them through karaoke.</p>',
        a: 'Aggretsuko',
        ia: [
            'Disenchanted',
            'Steven Universe',
            'Dr. Horrible\'s Sing-Along Blog',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/z9jGaJJlNyo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>Music Band (Indie Rock)</h3><p>The female vocal lead of this quartet carries a diverse array of songs across over six albums varying greatly in genre and feel. They became more widely known after writing a song for a movie based off a graphic novel series. Great to sing and dance along with.</p>',
        a: 'Metric',
        ia: [
            'No Doubt',
            'Garbage',
            'Paramore',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/uly3S2KjUf4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>Music Band (Rock)</h3><p>Formed in 1994, this band never shies away from culturally-relevant lyrics. The male vocal lead carries several albums across different genres such as alternative rock, space rock, and even electronica. You can try to sing along with him, but it will be difficult without a wide vocal range.</p>',
        a: 'Muse',
        ia: [
            'Linkin Park',
            'System of a Down',
            'Rage Against the Machine',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/X8f5RgwY8CI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>Music Band (Rock)</h3><p>This band arrived in the 90s with a powerful dynamic, self-written lyrics, and an outlet for all the frustrations of life; however, their careers really took off with their debut album in 2000. Regardless of being loved and hated by music enthusiasts, they were always working on expanding their musical range and accomplished multiple unique albums, each with an artistic theme behind them. You\'ll run out of breath singing along.</p>',
        a: 'Linkin Park',
        ia: [
            'System of a Down',
            'Disturbed',
            'Korn',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/AsNvb56CTa4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>Music Artist (Pop Rock)</h3><p>This artist came onto the scene in the 2000s while double-majoring at Stanford but really only hit it big in 2017 with an album that is a reflection of life\'s many intense ups and downs.</p>',
        a: 'K.Flay',
        ia: [
            'Amy Lee',
            'Liz Phair',
            'Skylar Grey',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/3SHFLj-pTQE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
];


// Get references to all of our static HTML elements to save jQuery from selecting them each time
const SCREEN = {
    'start-screen': $('#start-screen'),
    'game-screen': $('#game-screen'),
    'correct-answer-screen': $('#correct-answer-screen'),
    'incorrect-answer-screen': $('#incorrect-answer-screen'),
    'time-ran-out-screen': $('#time-ran-out-screen'),
    'trivia-summary-screen': $('#trivia-summary-screen'),
};
const BUTTON = {
    'start-game-button': $('#start-game-button'),
    'restart-game-button': $('#restart-game-button'),
};
const TEXT = {
    'time-left': $('#time-left > span'),
    'question': $('#question'),
    'correct-answer': $('.correct-answer > span'),
    'incorrect-answer': $('.incorrect-answer > span'),
    'number-of-plays': $('#number-of-plays > span'),
    'number-of-correct-answers': $('#number-of-correct-answers > span'),
    'number-of-incorrect-answers': $('#number-of-incorrect-answers > span'),
};
const MENU = {
    'answers': $('#answers')
};

// Create an object to contain all of our game logic
let game = {

    // Set up necessary variables to keep track of the game state
    numberOfPlays: 0,
    currentQuestions: [],
    currentQuestionsArrayIndex: -1,
    numberOfCorrectGuesses: 0,
    numberOfIncorrectGuesses: 0,
    questionTimer: 0,
    timerIntervalID: undefined,
    popupTimeoutID: undefined,

    // Initialize the Game (happens on page load)
    initialize: function(){
        console.log('initializing trivia game');
        
        // Attach click event handlers for the static buttons
        BUTTON['start-game-button'].on('click', function(){
            
            // Set up a new game, load a new question, and then switch to the game screen
            game.setupNewGame();
            game.loadNewQuestion();
            game.switchState('game-screen');
        });
        BUTTON['restart-game-button'].on('click', function(){
            
            // Set up a new game, load a new question, and then switch to the game screen
            game.setupNewGame();
            game.loadNewQuestion();
            game.switchState('game-screen');
        });

        // Hide all of the sections
        $('section').addClass('hidden');

        // Switch to the start screen
        game.switchState('start-screen');
    },

    // Set up a new game
    setupNewGame: function(){
        console.log('setting up a new game');

        // Reset all of the game state variables to their initial values
        game.currentQuestions = [];
        game.currentQuestionsArrayIndex = -1;
        game.timerIntervalID = undefined;
        game.popupTimeoutID = undefined;
        game.numberOfCorrectGuesses = 0;
        game.numberOfIncorrectGuesses = 0;

        // Load our questions array with new questions
        // NOTE: Ensure that the current questions aren't more than allowed
        while(game.currentQuestions.length < MAX_QUESTIONS_PER_GAME
              && game.currentQuestions.length < QUESTIONS.length) {

            // Get a new random index
            let newQuestionIndex = Math.floor(Math.random() * QUESTIONS.length);
            if (!game.currentQuestions.includes(newQuestionIndex)) {

                // Add the new question to the current questions array via its index
                game.currentQuestions.push(newQuestionIndex);
            }
        }
        
        console.log('questions loaded');
        console.log(game.currentQuestions);
    },

    // Load a new question to ask along with its answers
    loadNewQuestion: function(){
        console.log('loading new question');

        // Increment the array index we'll use for the new question
        game.currentQuestionsArrayIndex++;

        // Reset the question time and update the display
        game.questionTimer = SECONDS_PER_QUESTION;
        TEXT['time-left'].text(`${game.questionTimer} seconds`);

        // Get the current question's data
        let currentQuestionObject = QUESTIONS[game.currentQuestions[game.currentQuestionsArrayIndex]];
        
        // Display the question text
        let currentQuestionText = currentQuestionObject.q;
        TEXT['question'].html(currentQuestionText);

        // Empty the answers menu if any menu items exist
        MENU['answers'].empty();
        
        // Add all of the answers (including the correct one) into the answers menu
        let currentAnswerText = currentQuestionObject.a;
        let currentAnswerElement = $(`<li><button class="answer" role="menuitem" data-isAnswer="true">${currentAnswerText}</button></li>`);
        MENU['answers'].append(currentAnswerElement);
        for (let i = 0; i < currentQuestionObject.ia.length; i++) {
            const currentIncorrectAnswer = currentQuestionObject.ia[i];

            let randomIndex = Math.floor(Math.random() * (i + 1));
            let insertionPoint = MENU['answers'].find(`li:nth-child(${randomIndex+1})`);
            console.log(insertionPoint);
            // Randomize whether we prepend or append our incorrect answer
            if (Math.floor(Math.random() * 2) === 0) {
                
                insertionPoint.before(`<li><button class="answer" role="menuitem" data-isAnswer="false">${currentIncorrectAnswer}</button></li>`);
            }
            else {

                insertionPoint.after(`<li><button class="answer" role="menuitem" data-isAnswer="false">${currentIncorrectAnswer}</button></li>`);
            }
        }

        // Attach click event handlers to all of the answer buttons
        $('.answer').on('click', function(){
            console.log('handling answer click');

            if ($(this).attr('data-isAnswer') === 'true') {
                game.handleCorrectGuess(currentAnswerElement.find('button'));
            }
            else {
                game.handleIncorrectGuess(currentAnswerElement.find('button'), $(this));
            }
        });
        
        // Start a timer to initiate the countdown
        game.timerIntervalID = setInterval(game.handleQuestionTimer, 1000);
    },
    
    // Handle a Correct Guess
    handleCorrectGuess: function(correctGuessElement){
        console.log('handling correct guess');

        // Track the number of correct guesses
        game.numberOfCorrectGuesses++;

        // Set the correct answers texts
        TEXT['correct-answer'].text(correctGuessElement.text());

        // Switch to the correct answer screen
        game.switchState('correct-answer-screen');
    },
    
    // Handle an Incorrect Guess
    handleIncorrectGuess: function(correctGuessElement, incorrectGuessElement){
        console.log('handling incorrect guess');

        // Track the number of incorrect guesses
        game.numberOfIncorrectGuesses++;

        // Set the correct answers texts
        TEXT['correct-answer'].text(correctGuessElement.text());
        
        // Set the incorrect answers texts
        TEXT['incorrect-answer'].text(incorrectGuessElement.text());
        
        // Switch to the incorrect answer screen
        game.switchState('incorrect-answer-screen');
    },
    
    // Handle the Time Running Out
    handleTimeRunningOut: function(){
        console.log('handling time running out');

        // Track the number of incorrect guesses
        game.numberOfIncorrectGuesses++;

        // Get the current question's data
        let currentQuestionObject = QUESTIONS[game.currentQuestions[game.currentQuestionsArrayIndex]];

        // Set the correct answers texts
        TEXT['correct-answer'].text(currentQuestionObject.a);

        // Switch to the time ran out screen
        game.switchState('time-ran-out-screen');
    },
    
    // Handle the Question Timer (used in an interval)
    handleQuestionTimer: function(){
        console.log('handling question timer');
        
        // Decrement the question timer and update the display
        game.questionTimer--;
        TEXT['time-left'].text(`${game.questionTimer} seconds`);

        // If we've run out of time
        if (game.questionTimer === 0) {

            // Handle time running out
            game.handleTimeRunningOut();
        }
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

        // Switch to the trivia summary screen
        game.switchState('trivia-summary-screen');
    },
    
    // Set up methods for hiding and showing screens
    hideScreen: function(screenName){
        console.log(`hiding screen: ${screenName}`);

        SCREEN[screenName].addClass('hidden');
    },
    showScreen: function(screenName){
        console.log(`showing screen: ${screenName}`);

        SCREEN[screenName].removeClass('hidden');
    },
    
    // Set up the different variables and State Objects needed to switch between Game States
    currentState: '',
    nextState: '',
    stateObjects: {
        
        // This is the starting screen (shown when page loads)
        'start-screen': {
            unloadState: function(){

                // Hide the start screen section
                game.hideScreen('start-screen');
            },
            loadState: function(){

                // Show the start screen section
                game.showScreen('start-screen');
            }
        },
        // This is the game screen (shown when receiving and answering questions)
        'game-screen': {
            unloadState: function(){

                // Hide the game screen section
                game.hideScreen('game-screen');

                // Clear the question interval so it no longer runs, if it exists
                if (game.timerIntervalID !== undefined) {

                    clearTimeout(game.timerIntervalID);
                    game.timerIntervalID = undefined;
                }
            },
            loadState: function(){

                // Show the game screen section
                game.showScreen('game-screen');
            }
        },
        'correct-answer-screen': {
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

                        game.loadNewQuestion();
                        game.switchState('game-screen');
                    }
                    // If there are no more questions, handle game completion
                    else {

                        game.handleGameCompletion();
                    }
                }, SECONDS_PER_POPUP * 1000);

                // Show the correct answer screen section
                game.showScreen('correct-answer-screen');
            }
        },
        'incorrect-answer-screen': {
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

                        game.loadNewQuestion();
                        game.switchState('game-screen');
                    }
                    // If there are no more questions, handle game completion
                    else {

                        game.handleGameCompletion();
                    }
                }, SECONDS_PER_POPUP * 1000);

                // Show the incorrect answer screen section
                game.showScreen('incorrect-answer-screen');
            }
        },
        'time-ran-out-screen': {
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

                        game.loadNewQuestion();
                        game.switchState('game-screen');
                    }
                    // If there are no more questions, handle game completion
                    else {

                        game.handleGameCompletion();
                    }
                }, SECONDS_PER_POPUP * 1000);

                // Show the time ran out screen section
                game.showScreen('time-ran-out-screen');
            }
        },
        'trivia-summary-screen': {
            unloadState: function(){

                // Hide the trivia summary screen section
                game.hideScreen('trivia-summary-screen');
            },
            loadState: function(){

                // Show the trivia summary screen section
                game.showScreen('trivia-summary-screen');
            }
            
        }
    },

    // Set up the method to handle switching between Game States
    switchState(newState) {

        // Set the next state so individual states can plan accordingly
        game.nextState = newState;

        // If we have a state loaded already, unload it first
        if (game.currentState !== '') {
            console.log(`unloading '${game.currentState}' state`);

            game.stateObjects[game.currentState].unloadState(); // If the currentState isn't empty, the state object must exist; so no error checking necessary
        }

        // Now load the new state as long as it exists
        if (game.stateObjects.hasOwnProperty(newState)) {
            console.log(`loading '${newState}' state`);

            // Change the game state to our new state
            game.currentState = newState;

            // Load the new state
            game.stateObjects[game.currentState].loadState();
        }
        else {
            // Raise an exception if the current state doesn't exist since that probably means a typo in the state name occurred when calling the method
            throw `The state '${newState}' does not exist!`;
        }

        // Clear the next state since there isn't one anymore
        game.nextState = '';
    }
};

// Initialize and the game
game.initialize();

})(); // END: Hide code from the global scope