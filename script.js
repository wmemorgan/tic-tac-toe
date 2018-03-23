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
  scoreOptions = document.getElementsByClassName("score-options"),
  player1Score = document.getElementById("player-1-score"),
  player2Score = document.getElementById("player-2-score"),
  player1Wins = 0,
  player2Wins = 0,
  activeMarker,
  activePlayer,
  opponentMarker,
  playerCount,
  gameResetBtn = document.getElementById("game-reset"),
  gameEnd = document.getElementById("game-end"),
  gameResults = document.getElementById("game-results"),
  endOption1 = document.getElementById("end-option-1"),
  endOption2 = document.getElementById("end-option-2");


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
    player1Start();
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
    choosePlayer();
  }

}

const goBack = () => {
  resetScore();
  player2 = defaultPlayer2;
  gameMenu2 = false;
  playerCount = undefined;
  markerCount = 0;
  gameMenu.style.display = "grid";
  question.innerHTML = defaultQuestion;
  option1.innerHTML = defaultOption1;
  option2.innerHTML = defaultOption2;
  backButton.style.visibility = 'hidden';
  hideBoard(); 
}

const toggleScoreboard = (state) => {
 for (let i = 0; i < scoreOptions.length; i++) {
   scoreOptions[i].style.visibility = state;
 }
}

const resetScore = () => {
  player1Wins = 0;
  player1Score.innerHTML = player1Wins;
  player2Wins = 0;
  player2Score.innerHTML = player2Wins;
}

const showBoard = () => {
  gameMenu.style.display = "none";
  toggleScoreboard('visible');
  if(playerCount === 1) {
    player2.innerHTML = "computer";
    for (let i = 0; i < square.length; i++) {
      square[i].classList.remove("square-hidden");
      square[i].addEventListener("click", playerMarkerAI(i));
    }
  } else {
    for (let i = 0; i < square.length; i++) {
      square[i].classList.remove("square-hidden");
      square[i].addEventListener("click", playerMarker(i));
    }
  }  

}

const hideBoard = () => {
  toggleScoreboard('hidden');
  markerCount = 0,
  origBoard = Array.from(Array(9).keys());
  player1Banner.style.visibility = 'hidden';
  player2Banner.style.visibility = 'hidden';
  gameEnd.style.visibility = 'hidden';
  //Hide squares
  for (i = 0; i < square.length; i++) {
    square[i].classList.add("square-hidden");
    square[i].classList.remove('square-winner');
    if (square[i].hasChildNodes()) {
      square[i].removeChild(square[i].firstChild);
    }
  }
}

const replay = () => {
    hideBoard();
    showBoard();
    rotateBanner();
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

const player1Start = () => {
  choice = 1
  activeMarker = player1Marker;
  activePlayer = "Player 1";
  rotateBanner();
}

const rotatePlayer = () => {
  if (choice === 1) {
    choice = 2;
    activeMarker = player2Marker;
    opponentMarker = player1Marker;
    activePlayer = "Player 2";
    activeChoice = choice;
  } else {
    choice = 1;
    activeMarker = player1Marker;
    opponentMarker = player2Marker;
    activePlayer = "Player 1";
    activeChoice = choice;
  }
  rotateBanner();
}

const rotatePlayerAI = () => {
  if (choice === 1) {
    choice = 2;
    activeMarker = player2Marker;
    opponentMarker = player1Marker;
    activePlayer = "Player 2";
    activeChoice = choice;
  } else {
    choice = 1;
    activeMarker = player1Marker;
    opponentMarker = player2Marker;
    activePlayer = "Player 1";
    activeChoice = choice;
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

const turn = (squareIndex, player) => {
  origBoard[squareIndex] = player;
  square[squareIndex].innerHTML = origBoard[squareIndex];
  markerCount++;
  console.log(markerCount);
  square[squareIndex].removeEventListener("click", playerMarkerAI(squareIndex));
  winCheckLite(origBoard, player);
  rotatePlayerAI(); 
}

const playerMarkerAI = (index) => {
  return () => {
    if (typeof origBoard[index] === 'number' && 
    !winCheckLite(origBoard, player1Marker)) {
      turn(index, player1Marker);
      if (!winCheckLite(origBoard, player1Marker)) {
        turn(bestSpot(), player2Marker);
      }
    }
  }

}

const flattenedBoard = (board) => {
  let boardArray = [];
  for (let i = 0; i < board.length; i++) {
    boardArray.push(board[i].innerHTML);
  }
  return boardArray;
}

let origBoard = Array.from(Array(9).keys());

const availableSquares = (board) => {
  return board.filter(s => s != 'O' && s != 'X');
}

const winnerAlert = () => {
  console.log("The winner is:", activePlayer);
  // for (let i = 0; i < arr.length; i++) {
  //   arr[i].classList.add('square-winner');
  // }
  gameEnd.style.visibility = 'visible';
  gameResults.innerHTML = 'The winner is ' + activePlayer;
  if (activePlayer === "Player 1") {
    player1Wins++;
    player1Score.innerHTML = player1Wins;
    console.log(activePlayer + " has " + player1Wins + " wins!");
  } else if (activePlayer === "Player 2") {
    player2Wins++;
    player2Score.innerHTML = player2Wins;
    console.log(activePlayer + " has " + player2Wins, " wins!");
    }
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
        return true;
        break;
      case square[3].innerHTML === mark && square[4].innerHTML === mark && square[5].innerHTML === mark: // across the middle
        console.log("Winner!");
        winningSquares = [square[3], square[4], square[5]];
        winnerAlert(winningSquares);
        return true;
        break;
      case square[6].innerHTML === mark && square[7].innerHTML === mark && square[8].innerHTML === mark: // across the bottom
        console.log("Winner!");
        winningSquares = [square[6], square[7], square[8]];
        winnerAlert(winningSquares);
        return true;
        break;
      case square[0].innerHTML === mark && square[3].innerHTML === mark && square[6].innerHTML === mark: // down the left side
        console.log("Winner!");
        winningSquares = [square[0], square[3], square[6]];
        winnerAlert(winningSquares);
        return true;
        break;
      case square[1].innerHTML === mark && square[4].innerHTML === mark && square[7].innerHTML === mark: // down the middle
        console.log("Winner!");
        winningSquares = [square[1], square[4], square[7]];
        winnerAlert(winningSquares);
        return true;
        break;
      case square[2].innerHTML === mark && square[5].innerHTML === mark && square[8].innerHTML === mark: // down the right side
        console.log("Winner!");
        winningSquares = [square[2], square[5], square[8]];
        winnerAlert(winningSquares);
        return true;
        break;
      case square[0].innerHTML === mark && square[4].innerHTML === mark && square[8].innerHTML === mark: // diagonal
        console.log("Winner!");
        winningSquares = [square[0], square[4], square[8]];
        winnerAlert(winningSquares);
        return true;
        break;
      case square[2].innerHTML === mark && square[4].innerHTML === mark && square[6].innerHTML === mark: // diagonal
        console.log("Winner!");
        winningSquares = [square[2], square[4], square[6]];
        winnerAlert(winningSquares);
        return true;
        break;
      default:
        if (markerCount == 9) {
          console.log("The game is a draw");
          gameResults.innerHTML = "The game is a draw"
          gameEnd.style.visibility = 'visible';
          rotatePlayer();
          return false;
        }
      rotatePlayer();
    }

  }
}

const winCheckLite = (boardArray, mark) => {
  if ((square[0].innerHTML === mark && square[1].innerHTML === mark && square[2].innerHTML === mark) || // across the top
    (square[3].innerHTML === mark && square[4].innerHTML === mark && square[5].innerHTML === mark) || // across the middle
    (square[6].innerHTML === mark && square[7].innerHTML === mark && square[8].innerHTML === mark) || // across the bottom
    (square[0].innerHTML === mark && square[3].innerHTML === mark && square[6].innerHTML === mark) || // down the left side
    (square[1].innerHTML === mark && square[4].innerHTML === mark && square[7].innerHTML === mark) || // down the middle
    (square[2].innerHTML === mark && square[5].innerHTML === mark && square[8].innerHTML === mark) || // down the right side
    (square[0].innerHTML === mark && square[4].innerHTML === mark && square[8].innerHTML === mark) || // diagonal
    (square[2].innerHTML === mark && square[4].innerHTML === mark && square[6].innerHTML === mark)) {// diagonal
      winnerAlert();
      return true;
  } else if (markerCount == 9) {
    console.log("The game is a draw");
    gameResults.innerHTML = "The game is a draw"
    gameEnd.style.visibility = 'visible';
    rotatePlayerAI();
    return false; 
  } else {
    return false;
  }
}

const bestSpot = () => {
  return availableSquares(origBoard)[0];
}


option1.addEventListener("click", chooseOption1);
option2.addEventListener("click", chooseOption2);
backButton.addEventListener("click", goBack);
gameResetBtn.addEventListener("click", goBack);
endOption1.addEventListener("click", replay);
endOption2.addEventListener("click", goBack);
