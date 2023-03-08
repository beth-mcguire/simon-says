var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(()=>{
    if(!started){
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
})

$('.btn').click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    makeSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
});

function makeSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $('#' + currentColor).addClass('pressed');

    setTimeout(() => {
        $('#' + currentColor).removeClass('pressed')
    }, 100);
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level ' + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    makeSound(randomChosenColor);
    
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');
    
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
        nextSequence();
        }, 1000);
    }

    }
    else {
      makeSound('wrong');
      $('body').addClass('game-over');
      setTimeout(() => {
        $('body').removeClass('game-over')
      }, 200);
      $('#level-title').text('GAME OVER, Press Any Key to Restart');
      startOver();

    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
