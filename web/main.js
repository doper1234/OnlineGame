// Copyright 2013 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 
(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik MÃ¶ller. fixes from Paul Irish and Tino Zijdel
	// MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

function Player(imageLocation){
    this.X = 100;
    this.Y = 100;
    this.Image = new Image(imageLocation);        
}

var globalMultiplier = 3;
var pixelLength = 16;

var charSize = pixelLength* globalMultiplier;
var gameWidth = 256*globalMultiplier;
var gameHeight = 232*globalMultiplier;

var players = [];
var guy = document.getElementById("coin")//new Image("/Online2D/images/guymoving.png");
var p1down = document.getElementById("p1down");
var player1 = document.getElementById("mario");
var player2 = document.getElementById("player1");

var mariosprites = document.getElementById("mariosprites")//= new Image();
//mariosprites.Imagesrc = "/Online2D/images/mariosprites.png";
var player1x = 0;
var player1y = 0;
var bomb = document.getElementById("bomb");
var explosionCenter = document.getElementById("explosionCenter");
var explosionup = document.getElementById("explosionUp");
var explosionupCenter = document.getElementById("explosionUpCenter");
var stagescreen = document.getElementById("stagescreen");
var imageWidth = 320;
var frameNumber = 0;
var bombFrame = 0;
var explosionFrame = 0;
var rowNumber = 0;
var frameHeight = 32;
var canvas = document.getElementById("coinAnimation");
var context = canvas.getContext("2d");
window.onload = function(){
//    player1 = new Player("/Online2D/images/mario.png");
//    player2 = new Player("/Online2D/images/player1.png");
//    players.push(player1);
//    players.push(player2);
MapGenerator();    
    setInterval(function () {

        var canvas = document.getElementById("coinAnimation");
        var context = canvas.getContext("2d");
       // console.log("draw?");
      //  context.drawImage(player1.Image, player1.X, player1.Y);
      //  context.drawImage(player2.Image, player2.X, player2.Y);
        explosionFrame++;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(stagescreen,0,0, gameWidth, gameHeight);
     //   context.drawImage(player1, player1x, player1y);
      //  context.drawImage(player2, 300, 150);
      //  context.drawImage(guy, imageWidth*frameNumber, rowNumber*frameHeight, 0,0);
       // context.drawImage(mariosprites, 12*frameNumber, 10, 20,20,0,0,100,100);
        DrawMap();
        context.drawImage(p1down, 24*frameNumber, 0, 22,22,player1x,player1y, charSize, charSize);
        context.drawImage(bomb, 16*bombFrame++, 0, 16,16,64,0,32,32);
        context.drawImage(explosionCenter, 16*(explosionFrame), 0, 16,16,8*32,5*32, charSize, charSize);
        context.drawImage(explosionup, 16*explosionFrame, 0, 16,16,8*32,3*32, charSize, charSize);
        context.drawImage(explosionupCenter, 16*explosionFrame, 0, 16,16,8*32,4*32, charSize, charSize);
        
        //context.drawImage(explosiondown, 16*explosionFrame++, 0, 16,16,50,50,32,32);
        //context.drawImage(explosionleft, 16*explosionFrame++, 0, 16,16,50,50,32,32);
        //context.drawImage(explosionright, 16*explosionFrame++, 0, 16,16,50,50,32,32);
        frameNumber++;
        if(bombFrame >= 2)
            bombFrame = 0;
        if(frameNumber === 12){
            frameNumber = 0;
            bombFrame = 2;
        }
        if(explosionFrame === 3)
            explosionFrame = 0;
        //image, frameIndex * width / numberOfFrames, 0, width / numberOfFrames,height, 0, 0,width / numberOfFrames, height;
        //console.log("draw???");
    }, 30);
};




(function () {
			
	var coin,
		coinImage,
		canvas;					

	function gameLoop () {
	
	  window.requestAnimationFrame(gameLoop);

	  coin.update();
	  coin.render();
	}
	
	function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
                
		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		that.render = function () {
		
		  // Clear the canvas
		  //that.context.clearRect(0, 0, that.width, that.height);
                  
		  
		  // Draw the animation
//		  that.context.drawImage(
//		    that.image,
//		    frameIndex * that.width / numberOfFrames,
//		    0,
//		    that.width / numberOfFrames,
//		    that.height,
//		    0,
//		    0,
//		    that.width / numberOfFrames,
//		    that.height);
		};
		
		return that;
	}
	
	// Get canvas
	canvas = document.getElementById("coinAnimation");
        canvas.width = gameWidth;
	canvas.height = gameHeight;
        
        var context = canvas.getContext("2d");
        context.fillStyle = "#FFF00F";
        context.fill();
        
	// Create sprite sheet
	coinImage = new Image();	
	
	// Create sprite
	coin = sprite({
		context: canvas.getContext("2d"),
		width: 1000,
		height: 100,
		image: coinImage,
		numberOfFrames: 10,
		ticksPerFrame: 4
	});
	
	// Load sprite sheet
	coinImage.addEventListener("load", gameLoop);
	coinImage.src = "/Online2D/images/coin-sprite-animation.png";

} ());

