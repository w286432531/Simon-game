//begining level
var level=0;
//current game pattern
var gamePattern=[];
//user clicked pattern
var userClickedPattern=[];
//set buttons
var bottonColours=["red", "blue", "green", "yellow"];
// begining game status
var gameStarted=false;
//heading
var heading=$("h1");
//toggle to see if game started
function gameStatus(){
if (gameStarted==false){
$(document).keypress(nextRound);
}
if (gameStarted==true){
$(document).off("keypress");
}
console.log(gameStarted);}
gameStatus();
//Game start
function nextRound(){
  gameStarted=true;
  console.log("new round start");
  console.log("levelStart "+ level);
  //check game status
  gameStatus();
  //generate random number
  var randomNum=Math.round(Math.random()*3);
  //turn random number into corlor
  var randomChosenColour=bottonColours[randomNum];
  //add random color into current game pattern
  gamePattern.push(randomChosenColour);
  //game chosen button animation
  $("#"+randomChosenColour).fadeOut(300).fadeIn(300);
  //play sound for the chosen button
  playSound(randomChosenColour);
  //game status

  level++;
  heading.text("Level "+level);
  userClickedPattern=[];
  i=0;
}
// function to play the sound
function playSound(color){
switch (color) {
  case "red":
    var sound= new Audio("sounds/red.mp3");
    break;
  case "blue":
    var sound= new Audio("sounds/blue.mp3");
    break;
  case "green":
    var sound= new Audio("sounds/green.mp3");
    break;
  case "yellow":
    var sound= new Audio("sounds/yellow.mp3");
    break;
  default: var sound= new Audio("sounds/wrong.mp3")
}
sound.play();
}
// user game click action
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  // console.log(userChosenColour);
  // console.log(userClickedPattern);
  animatePress(this);
  checkAnswer(userClickedPattern.length-1);
});
//user press button animation
function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout( function() {
    $(currentColour).removeClass("pressed");},100);
}
// check answer when user click
function checkAnswer(i){
  console.log("Current level "+level);
  // console.log("game pattern"+gamePattern);
  // console.log(userClickedPattern);
  if(userClickedPattern[i]==gamePattern[i] && i<=level-1){
    // console.log(userClickedPattern[i]);
    // console.log(gamePattern[i]);
    console.log("success");
    if(userClickedPattern[level-1]==gamePattern[level-1]){
      setTimeout(nextRound(),1000);
  }
  }
    else gameOver();
}
function gameOver(){
heading.text("Game Over, Press Any Key to Restart");
gameStarted=false;
gamePattern=[];
level=0;
$("button").keypress(playSound());
$("body").addClass("game-over");
setTimeout(function(){
  $("body").removeClass("game-over")},200);
gameStatus();} ;
