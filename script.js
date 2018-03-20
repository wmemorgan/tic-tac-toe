// Declare global variables
let gameMenu = document.getElementById("game-menu"),
    gameMenu2 = false,
    question = document.getElementById("question"),
    defaultQuestion = question.innerHTML,
    option1 = document.getElementById("option-1"),
    defaultOption1 = option1.innerHTML,
    option2 = document.getElementById("option-2"),
    defaultOption2 = option2.innerHTML,
    square = document.getElementsByClassName("square"),
    backButton = document.getElementById("back-btn"),
    choice,
    player1Banner = document.getElementById("go-player-1"),
    player2Banner = document.getElementById("go-player-2"),
    player1 = document.getElementById("player-1"),
    player2 = document.getElementById("player-2"),
    defaultPlayer2 = player2,
    player1Marker,
    player2Marker,
    activePlayer,
    playerCount,
    gameResetBtn = document.getElementById("game-reset");

const chooseOption1 = () => {
  if(gameMenu2) {
    player1Marker = 'X';
    console.log("Player 1 is:", player1Marker);
    player2Marker = 'O';
    console.log("Player 2 is:", player2Marker);
    showBoard(square);
  } else {
    question.innerHTML = 'Would you like to be X or O?'
    option1.innerHTML = 'X'
    option2.innerHTML = 'O'
    backButton.style.visibility = 'visible';
    gameMenu2 = true;
    playerCount = 1;
  }
}

const chooseOption2 = () => {
  if(gameMenu2) {
    player1Marker = 'O';
    console.log("Player 1 is:", player1Marker);
    player2Marker = 'X';
    console.log("Player 2 is:", player2Marker);
    showBoard(square);
  } else {
    question.innerHTML = 'Player 1: Would you like to be X or O?'
    option1.innerHTML = 'X'
    option2.innerHTML = 'O'
    backButton.style.visibility = 'visible';
    gameMenu2 = true;
    playerCount = 2;
  }

}

const goBack = () => {
  player2 = defaultPlayer2;
  gameMenu2 = false;
  playerCount = undefined;
  question.innerHTML = defaultQuestion;
  option1.innerHTML = defaultOption1;
  option2.innerHTML = defaultOption2;
  backButton.style.visibility = 'hidden';
  hideBoard(square); 
}

const showBoard = (object) => {
  choosePlayer();
  if(playerCount === 1) {
    player2.innerHTML = "0" + '<br>' + "computer";
  }

  gameMenu.style.display = "none";
  player1.style.visibility = 'visible';
  player2.style.visibility = 'visible';
  gameResetBtn.style.visibility = 'visible';

  for (i=0; i < object.length; i++) {
    object[i].classList.remove("square-hidden");
    object[i].addEventListener("click", playerMarker(i));
  }
}

const hideBoard = (object) => {
  player1Banner.style.visibility = 'hidden';
  player2Banner.style.visibility = 'hidden';
  gameMenu.style.display = "grid";
  player1.style.visibility = 'hidden';
  player2.style.visibility = 'hidden';
  gameResetBtn.style.visibility = 'hidden';
  //Hide squares
  for (i = 0; i < object.length; i++) {
    object[i].classList.add("square-hidden");
    if (object[i].hasChildNodes()) {
      object[i].removeChild(square[i].firstChild);
    }
  }
}

const choosePlayer = () => {
   choice = Math.floor((Math.random() * 2) + 1)
    if (choice === 1) {
      activePlayer = player1Marker;
    } else {
      activePlayer = player2Marker;
    }
    rotateBanner();
}

const rotatePlayer = () => {
  if (choice === 1) {
    activePlayer = player2Marker;
    choice = 2;
  } else {
    activePlayer = player1Marker;
    choice = 1;
  }
  rotateBanner();
}

const rotateBanner = () => {
  if (choice === 1) {
    player2Banner.style.visibility = 'hidden';
    player1Banner.style.visibility = 'visible';
  } else {
    player1Banner.style.visibility = 'hidden';
    player2Banner.style.visibility = 'visible';
  }
}

const playerMarker = (i) => {
  return () => {
    if (square[i].hasChildNodes()) {
      console.log('The square has been already been selected.');
      return false;
    } else {
      square[i].innerHTML = activePlayer;
      rotatePlayer();

    }
  }
}

const winCheck = (mark) => {

  
}

option1.addEventListener("click", chooseOption1);
option2.addEventListener("click", chooseOption2);
backButton.addEventListener("click", goBack);
gameResetBtn.addEventListener("click", goBack);
