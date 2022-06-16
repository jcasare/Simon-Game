let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
$(document).on("keypress", function(){
  if(!started){
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }

})

$(".btn").on("click", function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentState){
  if(gamePattern[currentState]===userClickedPattern[currentState]){
    console.log("success");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
        $("#level-title").text("Level "+ level);
      },1000)
    }

    }
    else{
      console.log("wrong");
      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200)
      startOver();
  }

}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  userClickedPattern=[];
}

function playSound(name) {
  let soundToPlay = new Audio("./sounds/" + name + ".mp3");
  soundToPlay.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}

function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}
