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
