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
    markerCount = 0,
    player1Banner = document.getElementById("go-player-1"),
    player2Banner = document.getElementById("go-player-2"),
    player1 = document.getElementById("player-1"),
    player2 = document.getElementById("player-2"),
    defaultPlayer2 = player2,
    player1Marker,
    player2Marker,
    activeMarker,
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
  markerCount = 0;
  gameMenu.style.display = "grid";
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
  player1.style.visibility = 'hidden';
  player2.style.visibility = 'hidden';
  gameResetBtn.style.visibility = 'hidden';
  player1Banner.style.visibility = 'hidden';
  player2Banner.style.visibility = 'hidden';
  //Hide squares
  for (i = 0; i < object.length; i++) {
    object[i].classList.add("square-hidden");
    object[i].classList.remove('square-winner');
    if (object[i].hasChildNodes()) {
      object[i].removeChild(square[i].firstChild);
    }
  }
}

const choosePlayer = () => {
   choice = Math.floor((Math.random() * 2) + 1)
    if (choice === 1) {
      activeMarker = player1Marker;
      activePlayer = "Player 1";
    } else {
      activeMarker = player2Marker;
      activePlayer = "Player 2";
    }
    rotateBanner();
}

const rotatePlayer = () => {
  if (choice === 1) {
    choice = 2;
    activeMarker = player2Marker;
    activePlayer = "Player 2";
  } else {
    choice = 1;
    activeMarker = player1Marker;
    activePlayer = "Player 1";
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
      square[i].innerHTML = activeMarker;
      markerCount++;
      winCheck(activeMarker);
    }

  }
}

const winnerAlert = (arr) => {
  console.log("The winner is:", activePlayer);
  // hideBoard(square);
  // square1.style.backgroundColor = 'black';
  // square2.style.backgroundColor = 'black';
  // square3.style.backgroundColor = 'black';
  for (let i = 0; i < arr.length; i++) {
    arr[i].classList.add('square-winner');
  }
  return true;
}  

const winCheck = (mark) => {
  let winningSquares = [];
  if (markerCount < 3) {
    console.log("Not enough squares marked.");
    rotatePlayer();
    return false;
  } else {
    console.log("Checking winner...", mark);
    switch (true) {
      case square[0].innerHTML === mark && square[1].innerHTML === mark && square[2].innerHTML === mark: // across the top
        console.log("Winner!");
        winningSquares = [square[0], square[1], square[2]];
        winnerAlert(winningSquares);
        break;
      case square[3].innerHTML === mark && square[4].innerHTML === mark && square[5].innerHTML === mark: // across the middle
        console.log("Winner!");
        winningSquares = [square[3], square[4], square[5]];
        winnerAlert(winningSquares);
        break;
      case square[6].innerHTML === mark && square[7].innerHTML === mark && square[8].innerHTML === mark: // across the bottom
        console.log("Winner!");
        winningSquares = [square[6], square[7], square[8]];
        winnerAlert(winningSquares);
        break;
      case square[0].innerHTML === mark && square[3].innerHTML === mark && square[6].innerHTML === mark: // down the left side
        console.log("Winner!");
        winningSquares = [square[0], square[3], square[6]];
        winnerAlert(winningSquares);
        break;
      case square[1].innerHTML === mark && square[4].innerHTML === mark && square[7].innerHTML === mark: // down the middle
        console.log("Winner!");
        winningSquares = [square[1], square[4], square[7]];
        winnerAlert(winningSquares);
        break;
      case square[2].innerHTML === mark && square[5].innerHTML === mark && square[8].innerHTML === mark: // down the right side
        console.log("Winner!");
        winningSquares = [square[2], square[5], square[8]];
        winnerAlert(winningSquares);
        break;
      case square[0].innerHTML === mark && square[4].innerHTML === mark && square[8].innerHTML === mark: // diagonal
        console.log("Winner!");
        winningSquares = [square[0], square[4], square[8]];
        winnerAlert(winningSquares);
        break;
      case square[2].innerHTML === mark && square[4].innerHTML === mark && square[6].innerHTML === mark: // diagonal
        console.log("Winner!");
        winningSquares = [square[2], square[4], square[6]];
        winnerAlert(winningSquares);
        break;
      default:
        rotatePlayer();
    }
    if(markerCount == 9) {
      console.log("The game is a draw")
      return false;
    }
  }


  
}

option1.addEventListener("click", chooseOption1);
option2.addEventListener("click", chooseOption2);
backButton.addEventListener("click", goBack);
gameResetBtn.addEventListener("click", goBack);
