'use strict';

/**
 * Steps:
 * 1. Make the roll dice button work
 * 2. Make the hold button work
 * 3. Make the new game button work
 */

/**
 * we display the random number with the corresponding image dynamically
 * we display the current score on the active player dynamicallu
 * to switch the player we use a ternary operator
 * to check if a class is on an element and add or remove it, we used the toggle method
 */

//I do not want to be reapeating myself so I will make this easy

let totalScores, currentScore, activePlayer, playing;

//we will create a function to serve as a reusable function
//Starting conditions function - this function will be executed when we load the page for the first time or when the new game button is clicked

const init = function () {
  //creating the total scores array
  totalScores = [0, 0];
  //creating the current score variable
  currentScore = 0;
  //creting an active player variable
  activePlayer = 0;
  //creating a state variable which is a boolean value to control if the game is playing or not - SO THAT when someone wins, the roll duce and hold button wont work again
  playing = true;

  //we need to reset the game for the current score of player 0
  document.getElementById('current--0').textContent = 0;
  //for the current score of player 1
  document.getElementById('current--1').textContent = 0;
  //for the total score of player 0
  document.getElementById('score--0').textContent = 0;
  //for the total score of player 1
  document.getElementById('score--1').textContent = 0;

  //hiding the image - by creating a hidden class and adding it to the image
  document.querySelector('.dice').classList.add('hidden');
  //changing the styling by removing the winner class
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  //then add the active class back to player 1
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};
init();

// we will refactor the code we use to switch to next player so we can keep the code DRY - DO NOT REPEAT YOURSELF
const switchPlayer = function () {
  //next, once it switches, change the old player current score to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  //and start couting from 0 for the new player
  currentScore = 0;

  //switch the player using a ternary operator
  activePlayer = activePlayer === 0 ? 1 : 0;
  //the code above says, if the active player is player 0 then switch to player 1 and vice versa

  //what is left is the visual change
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
  //in the code above we used the "toggle" method that is available on the classlist property to remove the player--active class if it is there and add if it is not
};

/**
 * 1st step
 * Making the function to roll a dice to work
 *
 */

document.querySelector('.btn--roll').addEventListener('click', function () {
  //all the code below will only work if we are playing i.e game state is true
  if (playing) {
    //when we click the button, it will generate a random number (roll a dice)
    const dice = Math.trunc(Math.random() * 6) + 1;

    //the image has been hidden
    // so now we have to unhide it
    document.querySelector('.dice').classList.remove('hidden');

    //and dynamically display the number and corresponding image
    document.querySelector('.dice').src = `dice-${dice}.png`;

    //did we roll a 1? if no add it to current score - now we create a current score variable
    if (dice !== 1) {
      //adding the number to the current score
      currentScore = currentScore + dice;

      //displaying the number
      // document.getElementById('current--0').textContent = currentScore;

      //the problem with the above code is, it does not factor in the active player

      //here is how we factor in the active player, by creating an active player variable and displaying the current score dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // //next, once it switches, change the old player current score to 0
      // document.getElementById(`current--${activePlayer}`).textContent = 0;

      // //and start couting from 0 for the new player
      // currentScore = 0;

      // //switch the player using a ternary operator
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // //the code above says, if the active player is player 0 then switch to player 1 and vice versa

      // //what is left is the visual change
      // document.querySelector('.player--0').classList.toggle('player--active');
      // document.querySelector('.player--1').classList.toggle('player--active');
      // //in the code above we used the "toggle" method that is available on the classlist property to remove the player--active class if it is there and add if it is not

      //we have refeactored the code above into a function, now we can just call the function
      switchPlayer();
    }
  }
});

/**
 * 2nd step:
 * Implementing the feature of a player holding the current score
 */

document.querySelector('.btn--hold').addEventListener('click', function () {
  //all the code below will only work if we are playing i.e game state is true
  if (playing) {
    //first thing we want to happen when this button is clicked is to add current score to the total score of the current player. Hence we need to create a total score variable or array to hold total scores of both players

    totalScores[activePlayer] = totalScores[activePlayer] + currentScore;
    //scores[1] = scores[1] + currentScore

    //now display it dynamically
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    //next, if score >= 100, current player wins
    if (totalScores[activePlayer] >= 20) {
      // set playing to false to indicate that the game is finished
      playing = false;

      //finish the game by adding the player--winner class to the active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //then remove the active player class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      //we also need to remove the dice
      document.querySelector('.dice').classList.add('hidden');

      //build the winning announcement dynamically
      document.getElementById(
        `name--${activePlayer}`
      ).textContent = `You are the winner 🎉🎉🎉`;
    } else {
      // we need to switch to the next player

      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // //and start couting from 0 for the new player
      // currentScore = 0;
      // //switch the player using a ternary operator
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // //visual change
      // document.querySelector('.player--0').classList.toggle('player--active');
      // document.querySelector('.player--1').classList.toggle('player--active');

      //we have refeactored the code above into a function, now we can just call the function
      switchPlayer();
    }
  }
});

/**
 * 3rd and final step:
 * Implementing the new game feature to reset the game
 */
document.querySelector('.btn--new').addEventListener(
  'click',
  init
  // //we need to reset the game for the current score of player 0
  // document.getElementById('current--0').textContent = 0;
  // //for the current score of player 1
  // document.getElementById('current--1').textContent = 0;
  // //for the total score of player 0
  // document.getElementById('score--0').textContent = 0;
  // //for the total score of player 1
  // document.getElementById('score--1').textContent = 0;
  // //changing the styling by removing the winner class
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove('player--winner');
  // //then add the active class back to player 1
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.add('player--active');
  // playing = true;
  //the above code has all been defined in the init function so all we do is call the init function
);
