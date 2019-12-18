const gameColors = ['red', 'blue', 'green', 'yellow'];
const message = document.querySelector('.message');
const gamearea = document.querySelector('.gamearea');
const button = document.querySelector('button');

let gameClicks = [];
let userClicks = [];
let inPlay = false;
let playNum = 2;
window.addEventListener('load', setup);
button.addEventListener('click', function() {
  if (!inPlay) {
    player();
  }
})

function player() {
  button.disabled = true;
//   messager('Match the Pattern');
  button.style.display = 'none';
  gameClicks = [];
  userClicks = [];
  runSequence(playNum);
}

function runSequence(num) {
  let squares = document.querySelectorAll('.box');
  num--;
  if (num < 0) {
    inPlay = true;
    return;
  }
  let randomNum = Math.floor(Math.random() * gameColors.length);
  console.log(squares[randomNum]);
  gameClicks.push(gameColors[randomNum]);
  console.log(gameClicks);
  squares[randomNum].style.opacity ='1';
  setTimeout(function() {
    squares[randomNum].style.opacity ='0.5';
    setTimeout(function() {
        runSequence(num);
            }, 100)
  }, 500)
}

function setup() {
  console.log('Page loaded');
  for (let x = 0; x < gameColors.length; x++) {
    let div = eleFactory('div');
    div.style.backgroundColor = gameColors[x];
    div.classList.add('box');
    div.style.opacity = '0.5';
    div.myColor = gameColors[x];
    div.addEventListener('click', checkAnswer);
    gamearea.appendChild(div);
  }
}

function checkAnswer(e) {
  if (inPlay) {
    let el = e.target;
    console.log(el.myColor);
    userClicks.push(el.myColor);
    el.style.opacity = '1';
    setTimeout(function() {
      el.style.opacity = '0.5';
    }, 500);
    if(userClicks.length == gameClicks.length) {
        inPlay = false;
    endGame();
    }
    console.log(userClicks);
  }
function messager(mes) {
    message.innerHTML = mes;
}


  function endGame() {
      console.log('Game over');
      button.disabled = false;
      button.style.display = 'Block';
      if(userClicks.toString() == gameClicks.toString()) {
          playNum++;
          messager('Correct - Onto Level ' + playNum );
      } else {
          messager('Incorrect');
      }
  }
}

function eleFactory(elType) {
  let ele = document.createElement(elType);
  return ele;
}
