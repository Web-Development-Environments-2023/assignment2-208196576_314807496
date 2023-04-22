// Fig. 14.27 cannon.js
// Logic of the Cannon Game
var canvas; // the canvas
var context; // used for drawing on the canvas

// constants for game play
var TARGET_PIECES = 7; // sections in the target
var MISS_PENALTY = 2; // seconds deducted on a miss
var HIT_REWARD = 3; // seconds added on a hit
var TIME_INTERVAL = 25; // screen refresh interval in milliseconds

// variables for the game loop and tracking statistics
var intervalTimer; // holds interval timer
var timerCount; // number of times the timer fired since the last second
var timeLeft; // the amount of time left in seconds
var shotsFired; // the number of shots the user has fired
var timeElapsed; // the number of seconds elapsed

// variables for the blocker and target
var blocker; // start and end points of the blocker
var blockerDistance; // blocker distance from left
var blockerBeginning; // blocker distance from top
var blockerEnd; // blocker bottom edge distance from top
var initialBlockerVelocity; // initial blocker speed multiplier
var blockerVelocity; // blocker speed multiplier during game
var highScoreArray;

var target; // start and end points of the target
var targetDistance; // target distance from left
var targetBeginning; // target distance from top
var targetEnd; // target bottom's distance from top
var pieceLength; // length of a target piece
var initialTargetVelocity; // initial target speed multiplier
var targetVelocity; // target speed multiplier during game

var lineWidth; // width of the target and blocker
var hitStates; // is each target piece hit?
var targetPiecesHit; // number of target pieces hit (out of 7)

// variables for the cannon and cannonball
var cannonball; // cannonball image's upper-left corner
var cannonballVelocity; // cannonball's velocity
var cannonballOnScreen; // is the cannonball on the screen
var cannonballRadius; // cannonball radius
var cannonballSpeed; // cannonball speed
var cannonBaseRadius; // cannon base radius
var cannonLength; // cannon barrel length
var barrelEnd; // the end point of the cannon's barrel
var canvasWidth; // width of the canvas
var canvasHeight; // height of the canvas
var chickenArray = new Array(); // array of chickens
var enemyCanonBall = new Array();
var points;
var loses;

// variables for sounds
var targetSound;
var cannonSound;
var blockerSound;

// called when the app first launches
function setupGame()
{
   highScoreArray = new Array();
   // stop timer if document unload event occurs
   document.addEventListener( "unload", stopTimer, false );

   // get the canvas, its context and setup its click event handler
   canvas = document.getElementById( "theCanvas" );
   context = canvas.getContext("2d");
   enemyCanShoot = true


   // JavaScript Object representing game items
   blocker = new Object(); // object representing blocker line
   blocker.start = new Object(); // will hold x-y coords of line start
   blocker.end = new Object(); // will hold x-y coords of line end
   target = new Object(); // object representing target line
   target.start = new Object(); // will hold x-y coords of line start
   target.end = new Object(); // will hold x-y coords of line end
   cannonball = new Object(); // object representing cannonball point
   barrelEnd = new Object(); // object representing end of cannon barrel
   var player;

   // initialize hitStates as an array
   hitStates = new Array(TARGET_PIECES);

   // get sounds
   targetSound = document.getElementById( "targetSound" );
   cannonSound = document.getElementById( "cannonSound" );
   blockerSound = document.getElementById( "blockerSound" );
} // end function setupGame

// set up interval timer to update game
function startTimer()
{
   canvas.addEventListener( "click", fireCannonball, false );
   intervalTimer = window.setInterval( updatePositions, TIME_INTERVAL );
} // end function startTimer

// terminate interval timer
function stopTimer()
{
   canvas.removeEventListener( "click", fireCannonball, false );
   window.clearInterval( intervalTimer );
   context.clearRect(0, 0, canvas.width, canvas.height);
} // end function stopTimer

// called by function newGame to scale the size of the game elements
// relative to the size of the canvas before the game begins
function resetElements()
{
   var img = new Image();
   var chicken;
   chickenArray = new Array();
   img.src = "chicken.png";
   img.onload = function() {
   for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 5; j++) {
         chicken = {
            width: j * (canvas.width / 5),
            height: i * (canvas.height / 8)+25,
            dead : 0
         };
         chickenArray.push(chicken)
         context.drawImage(img, chicken.width, chicken.height, canvas.width / 20, canvas.height / 20);
      }
    }
  };
  player = {
   width: canvas.width / 2, //middle of the screen
   height: canvas.height- canvasHeight/20 // start at the lowest point
  }
  var img1 = new Image();
  img1.src = "player.png"
  context.drawImage(img1, player.width, player.height, canvas.width / 20, canvas.height / 20);
   
} // end function resetElements

// reset all the screen elements and start a new game
function newGame()
{
   var startGameAgain = document.getElementById('StartGameAgain');
   startGameAgain.style.visibility = "visible"
   points = 0;
   loses = 0;
   canvas.style.width = "100%";
   canvas.style.height = "100%";
   canvas.style.visibility = "visible";
   canvasHeight = canvas.height
   canvasWidth = canvas.w
   context = canvas.getContext("2d");
   cannonballRadius = canvasHeight / 30
   resetElements(); // reinitialize all game elements
   stopTimer(); // terminate previous interval timer
   document.getElementById("soundTrack").play();

   // set every element of hitStates to false--restores target pieces
   for (var i = 0; i < TARGET_PIECES; ++i)
      hitStates[i] = false; // target piece not destroyed

   targetPiecesHit = 0; // no target pieces have been hit
   blockerVelocity = canvas.width/30; // set initial velocity
   targetVelocity = canvas.width/30; // set initial velocity
   cannonballVelocityY = -canvasHeight/6;
   timeLeft = Math.max(120,playing_time); // start the countdown at 10 seconds
   timerCount = 0; // the timer has fired 0 times so far
   cannonballOnScreen = false; // the cannonball is not on the screen
   shotsFired = 0; // set the initial number of shots fired
   timeElapsed = 0; // set the time elapsed to zero
   document.addEventListener('keydown', function(event) {
      switch (event.key) {
        case 'ArrowLeft':
          // Left pressed
          player.width = Math.max(0,player.width-canvas.width/20)
          break;
        case 'ArrowRight':
          // Right pressed
          player.width = Math.min(canvas.width-canvas.width / 20,player.width + canvas.width/20)
          break;
        case 'ArrowUp':
          // Up pressed
          player.height = Math.max(chickenArray[chickenArray.length-1].height+(canvas.height / 20)+(canvas.height / 20),player.height-canvas.height/20)
          break;
        case 'ArrowDown':
          // Down pressed
          player.height = Math.min(canvas.height-canvas.height / 20,player.height + canvas.height/20)
          break;
      }
      if (event.key == shooting_key){
         fireCannonball()
      }
    });

   startTimer(); // starts the game loop
} // end function newGame

// called every TIME_INTERVAL milliseconds
function updatePositions()
{
   // update the blocker's position
   var blockerUpdate = TIME_INTERVAL / 1000.0 * blockerVelocity;
   blocker.start.y += blockerUpdate;
   blocker.end.y += blockerUpdate;

   // update the target's position
   var targetUpdate = TIME_INTERVAL / 1000.0 * targetVelocity;
   chickenArray.forEach(element => {
      element.width += targetUpdate
   });

   // if the blocker hit the top or bottom, reverse direction
   if (blocker.start.y < 0 || blocker.end.y > canvasHeight)
      blockerVelocity *= -1;

   // if the target hit the top or bottom, reverse direction
   if (chickenArray[0].width <= 0 || chickenArray[chickenArray.length - 1].width >= canvas.width - canvas.width / 20)
      targetVelocity *= -1;
   
   var interval = TIME_INTERVAL / 1000.0;
   // update enemyballs locations
   enemyCanonBall.forEach(element=> {
      element.y -= interval * cannonballVelocityY; // same speed as player canonBall but different direction
   })

   if (cannonballOnScreen) // if there is currently a shot fired
   {
      // update cannonball position
      cannonball.x += interval * cannonballVelocityX;
      cannonball.y += interval * cannonballVelocityY;

      // check for collisions with top and bottom walls
      if (cannonball.y + cannonballRadius > canvasHeight || 
         cannonball.y - cannonballRadius < 0)
      {
         cannonballOnScreen = false; // make the cannonball disappear
      } // end else if

      //check ball collision with chicken
      for (var i=0;i<chickenArray.length;i++){
         if(chickenArray[i].dead == 0 && cannonballOnScreen){
            var alphaX = Math.abs(chickenArray[i].width-cannonball.x);
            var alphaY = Math.abs(chickenArray[i].height-cannonball.y)
            if(alphaX<= cannonballRadius + canvas.width / 20 && alphaY <= cannonballRadius + canvas.height / 20){
               document.getElementById("targetSound").play();
               chickenArray[i].dead = 1;
               if(i<5){
                  points += 20;
               }
               else if(i>=5 && i< 10){
                  points += 15
               }
               else if(i>=10 && i< 15){
                  points += 10
               }
               else if(i>=15){
                  points += 5
               }
               cannonballOnScreen = false;
            }
         }
      }
   } // end if
   // create enemy balls
   if(enemyCanonBall.length ==0){ // if no balls we create first with random chicken location
      let created = false;
      while(!created){
         let randomlocation = Math.floor(Math.random()*(chickenArray.length-1));
         if(chickenArray[randomlocation].dead == 0){
            created = true;
            let ball = {
               x: Math.max(cannonballRadius,chickenArray[randomlocation].width),
               y: chickenArray[randomlocation].height
            }
            enemyCanonBall.push(ball)
         }
      }
   }
   else if(enemyCanonBall.length>=1){
      if(enemyCanonBall[0].y >= canvas*0.75){ // if the ball moved more the 75 percent of the canvas we can create another one
         created = false;
         while(!created){
            let randomlocation = Math.floor(Math.random()*chickenArray.length-1);
            if(chickenArray[randomlocation].dead == 0){
               created = true;
               let ball = {
                  x: Math.max(cannonballRadius,chickenArray[randomlocation].width),
                  y: chickenArray[randomlocation].height
               }
               enemyCanonBall.push(ball)
            }
         }
      }
   }
   // remove enemy canon balls after leaving canvas
   enemyCanonBall.forEach((element,index) => {
      if(element.y >= canvas.height){
         enemyCanonBall.splice(index,1)
      }
   })

   // check enemy canon balls colision with ship

   enemyCanonBall.forEach((element,index)=> {
      var alphaX = Math.abs(player.width-element.x);
      var alphaY = Math.abs(player.height-element.y)
      if(alphaX<= cannonballRadius + canvas.width / 20 && alphaY <= cannonballRadius + canvas.height / 20){
         document.getElementById("blockerSound").play();
         loses += 1
         if(loses == 3){
            gameOver();
         }
         player = {
            width: canvas.width / 2, //middle of the screen
            height: canvas.height- canvasHeight/20 // start at the lowest point
         }
         enemyCanonBall.splice(index,1)
      }
   })
   //check if winner
   let allDead = true;
      chickenArray.forEach(element => {
         if (element.dead == 0){
            allDead = false;
         }
      })
      if(allDead){
         gameOver();
      }


   ++timerCount; // increment the timer event counter

   // if one second has passed
   if (TIME_INTERVAL * timerCount >= 1000)
   {
      --timeLeft; // decrement the timer
      ++timeElapsed; // increment the time elapsed
      if(timeElapsed == 5 || timeElapsed == 10 || timeElapsed == 15 || timeElapsed == 20){
         if (targetVelocity > 0){
            targetVelocity += canvas.width/15
         }
         else{
            targetVelocity -= canvas.width/15
         }
         cannonballVelocityY -= canvas.height/20
      }
      timerCount = 0; // reset the count
   } // end if

   draw(); // draw all elements at updated positions

   // if the timer reached zero
   if (timeLeft <= 0)
   {
      stopTimer();
      showGameOverDialog("You lost"); // show the losing dialog
   } // end if
} // end function updatePositions

// fires a cannonball
function fireCannonball()
{
   if (cannonballOnScreen) // if a cannonball is already on the screen
      return; // do nothing

   // move the cannonball to be inside the cannon
   cannonball.x = player.width; // align x-coordinate with cannon
   cannonball.y = player.height; // centers ball vertically
   document.getElementById("cannonSound").play();

   // get the x component of the total velocity
   cannonballVelocityX = 0;

   // get the y component of the total velocity
   cannonballOnScreen = true; // the cannonball is on the screen
   ++shotsFired; // increment shotsFired

   //t play cannon fired sound
   //tcannonSound.play();
} // end function fireCannonball


// draws the game elements to the given Canvas
function draw()
{
   context.clearRect(0, 0, canvas.width, canvas.height);

   // display time remaining and score
   context.fillStyle = "black";
   context.font = "bold 8px serif";
   context.textBaseline = "top";
   context.fillText("Time remaining: " + timeLeft,0,0);
   context.fillText("Score:" + points,0,8)
   context.fillText("Disqualifications:" + loses,0,16)
   //draw ball if on the screen
   if (cannonballOnScreen)
   { 
      context.fillStyle = "black";
      context.beginPath();
      context.arc(cannonball.x, cannonball.y, cannonballRadius, 
         0, Math.PI * 2);
      context.closePath();
      context.fill();
   } // end if
   var img = new Image();
   img.src = "chicken.png";
   img.onload = function() {
      chickenArray.forEach(element => {
         if (element.dead == 0){
            context.drawImage(img, element.width, element.height, canvas.width / 20, canvas.height / 20);
         }
      })
  };
  enemyCanonBall.forEach(element =>{
   context.fillStyle = "red";
   context.beginPath();
   context.arc(element.x, element.y, cannonballRadius, 
      0, Math.PI * 2);
   context.closePath();
   context.fill();
  })
  var img1 = new Image();
  img1.src = "player.png"
  context.drawImage(img1, player.width, player.height, canvas.width / 20, canvas.height / 20);
} // end function draw

function gameOver(){
   stopTimer()
   var currLocation;
   var lowest = true;
   highScoreArray.forEach((element,index) => {
      if(element < points){
         currLocation = index + 1
         highScoreArray.splice(index,0,points)
         lowest = false;
      }
   }) 
   if(highScoreArray.length == 0 || lowest){
      highScoreArray.push(points)
      currLocation = highScoreArray.length
   }
   let listOfScores = document.getElementById("myList")
   while (listOfScores.firstChild) {
      listOfScores.removeChild(listOfScores.firstChild);
   }
   let newItem = document.createElement("li");
   let textNode = document.createTextNode("place : points");
   newItem.appendChild(textNode);
   listOfScores.appendChild(newItem);
   highScoreArray.forEach((element,index) => {
      let newItem = document.createElement("li");
      let textNode = document.createTextNode((index+1) + ": " + element);
      newItem.appendChild(textNode);
      listOfScores.appendChild(newItem);
   }) 
   document.getElementById("curr_location").innerHTML = "your place is:" + currLocation
   if(points<100){
      alert("you can do better")
   }
   else{
      let allDead = true;
      chickenArray.forEach(element => {
         if (element.dead == 0){
            allDead = false;
         }
      })
      if(allDead){
         alert("Champion!")
      }
      else{
         alert("Winnner!")
      }
   }
   document.getElementById("soundTrack").pause();
   showDiv('highScore_div')
}
// display an alert when the game ends
function showGameOverDialog(message)
{
   alert(message + "\nShots fired: " + shotsFired + 
      "\nTotal time: " + timeElapsed + " seconds ");
} // end function showGameOverDialog

window.addEventListener("load", setupGame, false);


/*************************************************************************
* (C) Copyright 1992-2012 by Deitel & Associates, Inc. and               *
* Pearson Education, Inc. All Rights Reserved.                           *
*                                                                        *
* DISCLAIMER: The authors and publisher of this book have used their     *
* best efforts in preparing the book. These efforts include the          *
* development, research, and testing of the theories and programs        *
* to determine their effectiveness. The authors and publisher make       *
* no warranty of any kind, expressed or implied, with regard to these    *
* programs or to the documentation contained in these books. The authors *
* and publisher shall not be liable in any event for incidental or       *
* consequential damages in connection with, or arising out of, the       *
* furnishing, performance, or use of these programs.                     *
*************************************************************************/