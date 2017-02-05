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

var players = [];
var player1;
var player2;

window.onload = function(){
    player1 = new Player("/Online2D/images/mario.png");
    player2 = new Player("/Online2D/images/player1.png");
    players.push(player1);
    players.push(player2);
    
    setInterval(function () {

        var canvas = document.getElementById("coinAnimation");
        var context = canvas.getContext("2d");
        console.log("draw?");
      //  context.drawImage(player1.Image, player1.X, player1.Y);
      //  context.drawImage(player2.Image, player2.X, player2.Y);
        context.drawImage(new Image("/Online2D/images/mario.png"), 400, 100);
        context.drawImage(new Image("/Online2D/images/player1.png"), 300, 150);
        console.log("draw???");
    }, 3000);
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
        canvas.width = 600;
	canvas.height = 600;
        
        var context = canvas.getContext("2d");
        //context.fillStyle = "#FFFFFF";
        //context.fill();
        
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

