'use strict';

//Selecting Elements
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Utilities
const hideDice = () => diceEl.classList.add('hidden');
//ShowDice
const showDice = () => diceEl.classList.remove('hidden');
//Switch Active Section
const updateActiveSection = () => {
  player0Section.classList.toggle('player--active');
  player1Section.classList.toggle('player--active');
};

//Reset Total scores labels
const resetTotalScoresLabels = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
};

//Starting Conditions
resetTotalScoresLabels();
hideDice();

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = () => {
  //Reset the score label of the current player to 0 before switching
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //Switch Next Player

  activePlayer = activePlayer === 0 ? 1 : 0;
  updateActiveSection();
  //Reset current score
  currentScore = 0;
};

//Rolling dice functionality
const rollDice = () => {
  if (playing) {
    //Generate dice numbers
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Display dice
    showDice();
    diceEl.src = `dice-${dice}.png`;
    //rolled === 1 ? Switch Player : continue
    if (dice !== 1) {
      //Add dice to current player score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Reset the score label of the current player to 0 before switching
      switchPlayer();
      // document.getElementById(`current--`)
      //Now work with other player labels
    }
  }
};

btnRollDice.addEventListener('click', rollDice);

btnHold.addEventListener('click', function () {
  if (playing) {
    //Grab the current score and assign it to total score
    scores[activePlayer] += currentScore;

    //Display new total score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      //Finish Game
      playing = false;
      hideDice();

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    }

    //Switch player
    else switchPlayer();
  }
});

const resetGame = () => {
  //Reset total scores
  scores = [0, 0];
  //Reset current scores label
  current0El.textContent = 0;
  current1El.textContent = 0;
  //Reset Current score
  currentScore = 0;
  //Set playing
  playing = true;

  //Reset section classes
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  //Reset Active player
  activePlayer = 0;

  //Reset active player class to player-active
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  //Reset total score labels
  resetTotalScoresLabels();
};

//Reset the game at any point in time
btnNew.addEventListener('click', resetGame);
