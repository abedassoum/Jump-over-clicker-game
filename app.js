"use strict";
window.addEventListener("load", ready);

let life = 3; //total life
let score = 0; // total score
let human = document.querySelector("#game_elements_human");
//hearts imgs
let heart1 = document.getElementById("heart1");
let heart2 = document.getElementById("heart2");
let heart3 = document.getElementById("heart3");
let gameover = document.querySelector("#game_over");
let time = document.querySelector("#time_sprite");


function HumanClicked() {
  console.log("Click Human");
  const human = this;
  human.removeEventListener("click", HumanClicked);
  human.classList.add("paused");
  human.querySelector("img").classList.add("zoom_out");
  human.addEventListener("animationend", humanGone);
  incrementPoints();
  document.querySelector("#human_sound").play();
  document.querySelector("#human_sound").currentTime = 0;
  if (score === 5){
    levelComplete();
  }
}

function humanGone() {
  console.log("human gone");
  const human = this;
  human.removeEventListener("animationend", humanGone);
  human.querySelector("img").classList.remove("zoom_out");
  human.classList.remove("paused");
  humanRestart.call(this);
  human.addEventListener("click", HumanClicked);
}

function showGameScreen() {
  // Skjul startskærm, game over og level complete
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function showStartScreen() {
  // fjern hidden fra startskærm og tilføj til game over og level complete
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

//when bomb is cliked
function bombClicked(e) {
  e.className = "zoom_out";
  console.log("life: " + life);
  life--; // trækker 1 fra life

  console.log("efter minus " + life);
  if (life == 2) {
    heart1.style.visibility = "hidden";
    console.log("ved life 2: " + life);
  } else if (life == 1) {
    heart2.style.visibility = "hidden";
    console.log("ved 1 liv " + life);
  } else if (life == 0) {
    heart3.style.visibility = "hidden";
    gameOver();
  }
}

function resetlife() {
  life = 3;
  heart1.style.visibility = "visible";
  heart2.style.visibility = "visible";
  heart3.style.visibility = "visible";
}

function ready() {
  console.log("JavaScript ready!");
  document.querySelector("#btn_start").addEventListener("click", startgame);
  document.querySelector("#btn_restart").addEventListener("click", startgame);
  document.querySelector("#btn_go_to_start").addEventListener("click", showStartScreen);
}

function startgame() {
  console.log("start game");
  let startgame = document.querySelector("#start");
  console.log(start);
  startgame.classList.add("hidden");
  gameover.classList.add("hidden");
  startAnimations();
  startPositions();
  // listeners();
  // bomblisteners();
  resetlife();
  ResetScore();
  timerRestart();
  Registerclick();
  startTimer();
  showGameScreen();
  document.querySelector("#background_sound").play();
  document.querySelector("#background_sound").currentTime = 60;
}

function incrementPoints() {
  console.log("Giv point");
  score++;
  console.log("har nu " + score + "score");
  displayPoints();

  if (score >= 5) {
    levelComplete();
  }
}


function levelComplete() {
  console.log("Level Complete");
  if (score >= 5) {
    document.querySelector("#level_complete").classList.remove("hidden");
  }
  document.querySelector("#levelcomplete_sound").play();
  document.querySelector("#levelcomplete_sound").currentTime = 0;
}

function timerRestart() {
  console.log("timer restarts");
  time.classList.remove("shrink");
  time.offsetWidth;
}

function ResetScore() {
  console.log("reset score");
  score = 0;
  displayPoints();
}

function humanRestart() {
  console.log("human restart");
  const human = this;

  // genstart falling animation
  human.classList.remove("falling");
  human.offsetWidth;
  human.classList.add("falling");

  // fjern alle positioner
  human.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5"
  );

  // sæt position til en ny klasse
  const p = Math.ceil(Math.random() * 5);
  human.classList.add(`position${p}`);
}

function bombRestart() {
  console.log("bomb restart");
  const bomb = this;

  // genstart falling animation
  bomb.classList.remove("falling");
  bomb.offsetWidth;
  bomb.classList.add("falling");

  // fjern alle positioner
  bomb.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5"
  );

  // sæt position til en ny klasse
  const p = Math.ceil(Math.random() * 5);
  bomb.classList.add(`position${p}`);
}

function gameOver() {
  console.log("Game Over");
  console.log(gameover);
  gameover.classList.remove("hidden");
  document.querySelector("#gameOver_sound").play();
  document.querySelector("#gameOver_sound").currentTime = 0;
}

function startTimer() {
  console.log("Timer starter");
  document.querySelector("#time_sprite").classList.add("shrink");
  document
    .querySelector("#time_sprite")
    .addEventListener("animationend", timeIsUp);
}

function timeIsUp() {
  console.log("Tiden er gået!");

  if (score >= 5) {
    levelComplete();
  } else {
    gameOver();
  }
}

function displayPoints() {
  console.log("vis score");
  document.querySelector("#score").textContent = score;
}

function listeners() {
  document.querySelector("#game_elements_human").addEventListener("animationiteration", humanRestart);
  document.querySelector("#game_elements_human2").addEventListener("animationiteration", humanRestart);
  document.querySelector("#game_elements_human3").addEventListener("animationiteration", humanRestart);
  document.querySelector("#game_elements_human4").addEventListener("animationiteration", humanRestart);
  document.querySelector("#game_elements_human5").addEventListener("animationiteration", humanRestart);
}

function bomblisteners() {
  document.querySelector("#game_elements_bomb").addEventListener("animationiteration", bombRestart);
  document.querySelector("#game_elements_bomb2").addEventListener("animationiteration", bombRestart);
  document.querySelector("#game_elements_bomb3").addEventListener("animationiteration", bombRestart);
  document.querySelector("#game_elements_bomb4").addEventListener("animationiteration", bombRestart);
  document.querySelector("#game_elements_bomb5").addEventListener("animationiteration", bombRestart);
}

function Registerclick() {
  // Registrer click
  document.querySelector("#game_elements_human").addEventListener("click", HumanClicked);
  document.querySelector("#game_elements_human2").addEventListener("click", HumanClicked);
  document.querySelector("#game_elements_human3").addEventListener("click", HumanClicked);
  document.querySelector("#game_elements_human4").addEventListener("click", HumanClicked);
  document.querySelector("#game_elements_human5").addEventListener("click", HumanClicked);
  document.querySelector("#game_elements_bomb").addEventListener("click", bombClicked);
  document.querySelector("#game_elements_bomb2").addEventListener("click", bombClicked);
  document.querySelector("#game_elements_bomb3").addEventListener("click", bombClicked);
  document.querySelector("#game_elements_bomb4").addEventListener("click", bombClicked);
  document.querySelector("#game_elements_bomb5").addEventListener("click", bombClicked);
}

function startAnimations() {
  let human1 = document.querySelector("#game_elements_human");
  let human2 = document.querySelector("#game_elements_human2");
  let human3 = document.querySelector("#game_elements_human3")
  let human4 = document.querySelector("#game_elements_human4");
  let human5 = document.querySelector("#game_elements_human5");

  document.querySelector("#game_elements_bomb").classList.add("falling");
  document.querySelector("#game_elements_bomb2").classList.add("falling");
  document.querySelector("#game_elements_bomb3").classList.add("falling");
  document.querySelector("#game_elements_bomb4").classList.add("falling");
  document.querySelector("#game_elements_bomb5").classList.add("falling");

  human1.classList.add("falling");
  human2.classList.add("falling");
  human3.classList.add("falling");
  human4.classList.add("falling");
  human5.classList.add("falling");
}

function startPositions() {
  let human1 = document.querySelector("#game_elements_human");
  let human2 = document.querySelector("#game_elements_human2");
  let human3 = document.querySelector("#game_elements_human3");
  let human4 = document.querySelector("#game_elements_human4");
  let human5 = document.querySelector("#game_elements_human5");
  human1.classList.add("position1");
  human2.classList.add("position2");
  human3.classList.add("position3");
  human4.classList.add("position4");
  human5.classList.add("position5");
}