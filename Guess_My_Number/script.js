'use strict';

const displayMessage = function (message){
  document.querySelector('.message').textContent = message;
}

//Random number between 1-20
let secretNumber = Math.trunc((Math.random() * 20)+1);
//document.querySelector('.number').textContent = secretNumber;
let score = 20;
let highscore = 0;
const again = document.querySelector('.again');


again.addEventListener('click', function(){
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  secretNumber = Math.trunc((Math.random() * 20)+1);
  displayMessage('Start guessing');
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = 20;
});

document.querySelector('.check').addEventListener('click', function(){
  const guess = Number(document.querySelector('.guess').value);
  console.log(typeof guess, guess);

  //no guess
  if (!guess) {
    displayMessage('⛔ No number!');
  }

  //correct guess
  else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if ( score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }

  /*
  //when guess is too high
  else if (guess > secretNumber){
    if(score > 1){
      document.querySelector('.message').textContent = '🔺 Too high!';
      score--;
      document.querySelector('.score').textContent = score;
    }
    else {
      document.querySelector('.message').textContent = '☠ You lost the game!';
      document.querySelector('.score').textContent = 0;
    }    
  }

  //when guess is too low
  else if (guess < secretNumber){
    if(score > 1){
      document.querySelector('.message').textContent = '🔻 Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    }
    else {
      document.querySelector('.message').textContent = '☠ You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
  */

  //When guess is wrong
  else if ( guess !== secretNumber) {
    if(score > 1){
      displayMessage( guess > secretNumber ? '🔺 Too high!' : '🔻 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    }
    else {
      displayMessage('☠ You lost the game!');
      document.querySelector('.score').textContent = 0;
  }
}
});