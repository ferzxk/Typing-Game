// Selectors
const settingBtn = document.querySelector('.settings-btn');
const settings = document.querySelector('.settings');
const settingsForm = document.querySelector('.settings-form');
const levelSelect = document.querySelector('.level');
const word = document.querySelector('.word');
const text = document.querySelector('.text');
const scoreElement = document.querySelector('.score');
const timeElement = document.querySelector('.time');
const endgameElement = document.querySelector('.end-game-container');


const words = [
  'absence',    'accidentally', 'accomplish',
  'athletic',   'apparent',     'appearance',
  'arctic',     'argument',     'ascend',
  'beginning',  'believe',      'business',
  'calendar',   'choose',       'column',
  'conscience', 'definitely',   'describe',
  'effect',     'embarrass',    'exaggerate',
  'excellent',  'exercise',     'february',
  'finally',    'foreign',      'grammar',
  'grateful',   'guarantee',    'height'
];


let randomWord;

let score = 0; 

let time = 10;

// set difficulty level to value in Localstorage or medium
let level = localStorage.getItem('level') !== null ? localStorage.getItem('level') : 'medium';
console.log(level);

// set difficulty level select value
levelSelect.value = localStorage.getItem('level') !== null ? localStorage.getItem('level') : 'medium';


// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

// Update score
function updateScore() {
    score++;
    scoreElement.innerText = score;
}

// Update time
function updateTime() {
    time--;
    timeElement.innerText = `${time}s`;
    if(time === 0) {
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}

// Game over, show end screen
function gameOver() {
    endgameElement.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onClick="location.reload()">Reload</button>
    `;
    endgameElement.style.display = 'flex';
}

addWordToDOM();


// Event Listeners

// Typing
text.addEventListener('input', (e) => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        e.target.value = '';

        if (level === 'hard') {
            time += 2;
        } else if (level === 'medium') {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    }
});


// Settings button
settingBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

settingsForm.addEventListener('change', (e) => {
    level = e.target.value;
    localStorage.setItem('level', level);
});