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
    choice;

const chooseOption1 = () => {
  question.innerHTML = 'Would you like to be X or O?'
  option1.innerHTML = 'X'
  option2.innerHTML = 'O'
  backButton.style.visibility = 'visible';
  gameMenu2 = true;
}

const chooseOption2 = () => {
  question.innerHTML = 'Player 1: Would you like to be X or O?'
  option1.innerHTML = 'X'
  option2.innerHTML = 'O'
  backButton.style.visibility = 'visible';
  gameMenu2 = true;
}

const goBack = () => {
  question.innerHTML = defaultQuestion;
  option1.innerHTML = defaultOption1;
  option2.innerHTML = defaultOption2;
  backButton.style.visibility = 'hidden'; 
}

option1.addEventListener("click", chooseOption1);
option2.addEventListener("click", chooseOption2);
backButton.addEventListener("click", goBack);