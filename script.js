'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentPlayer0 = document.getElementById('current--0');
const currentPlayer1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
let scores, currentScore, activePlayer, playing; // we decalred the let outside the init fucntion becz they are accessible outside the init. we want the varibles to live out here and then reassign the values inside the init fucntion
const init = function () {
  // init = initilization
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentPlayer0.textContent = 0;
  currentPlayer1.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// const scores = [0, 0]; //here we stored the vlaue of  final scores
// let currentScore = 0; // it cannot be inside the fucntion below because then it would be set to zero each time we clicked the roll dice button
// let activePlayer = 0; // why we used activeplyaer as 0 or 1? beczuse now we can use that variable to basically build these classes or id names
// let playing = true; //it's a fucking god varible atleast for now i mean make the entire button false or unuable by making this variable
// // ROlling Dice functionality

const swtichPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // here the playing varible is already a boolean so we dont have give any playing ==== true
    // 1. Genration a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3.Check for rolled 6: if true ,add to score
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // here we select the score element dynamically based on which is an active player right now . it is very handy name to build id name dynamically
      // currentScore += dice; //currentScore = currentScore + dice;
      // currentPlayer0.textContent = currentScore;
    } else {
      swtichPlayers();
    }
    // Swtiching Player
    //   document.getElementById(`current--${activePlayer}`).textContent = 0;
    //   currentScore = 0;
    //   activePlayer = activePlayer === 0 ? 1 : 0; // we are reassinging the active player if active player is equal to zero the whole operator will become 1 so active player = 1 if its false then activeplayer == 0
    //   player0El.classList.toggle('player--active'); //here toggle means , it will add class if its not there and if its there then it will remove the class
    //   player1El.classList.toggle('player--active');
    // }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player
    scores[activePlayer] += currentScore;
    // for example : score[1] = score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.Check if player's score is >=100
    if (scores[activePlayer] >= 20) {
      //  finish the game
      playing = false; // if one player wins the game we will finsih the game and set it to false
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
    } else {
      swtichPlayers();

      // Swtich to the next player;
    }
  }
});

btnNew.addEventListener('click', init);

//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   currentPlayer0.textContent = 0;
//   currentPlayer1.textContent = 0;
//   // document
//   //   .querySelector(`.player--${activePlayer}`)
//   //   .classList.remove('player--winner');
//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');
//   // player0El.classList.remove('player--active');
//   player01.classList.add('player--active');
//   player1El.classList.remove('player--active');
// });
