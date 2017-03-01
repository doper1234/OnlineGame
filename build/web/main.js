(function () {
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik MÃ¶ller. fixes from Paul Irish and Tino Zijdel
    // MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            },
                    timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

function Player(imageLocation) {
    this.X = 100;
    this.Y = 100;
    this.Image = new Image(imageLocation);
}


//var player1Direction = "LEFT";
function Bomb(bombId,x,y){
    this.id = bombId;
    this.x = x;
    this.y = y;
    this.exploded = false;
    //alert(x +" " + y);
}
var bombImage = document.getElementById("bomb");
var explosionCenter = document.getElementById("explosionCenter");
var explosionup = document.getElementById("explosionUp");
var explosiondown = document.getElementById("explosionDown");
var explosionleft = document.getElementById("explosionLeft");
var explosionright = document.getElementById("explosionRight");
var explosionHorizontalCenter = document.getElementById("explosionHorizontalCenter");
var explosionVerticalCenter = document.getElementById("explosionVerticalCenter");
var stagescreen = document.getElementById("stagescreen");
var imageWidth = 320;
var frameNumber = 0;
var bombFrame = 0;
var explosionFrame = 0;
var rowNumber = 0;
var frameHeight = 32;
var context;
window.onload = function () {
//    player1 = new Player("/Online2D/images/mario.png");
//    player2 = new Player("/Online2D/images/player1.png");
//    players.push(player1);
//    players.push(player2);
    var canvas = document.getElementById("coinAnimation");
    canvas.width = gameWidth;
    canvas.height = gameHeight;
    
    console.log(canvas.width + ", " + canvas.height);
    context = canvas.getContext("2d");
    MapGenerator();
    setInterval(function () {

        explosionFrame++;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(stagescreen, 0, 0, gameWidth, gameHeight);
        
        DrawMap();
        drawBombs();
        DrawPlayer(1);
        DrawPlayer(2);
        DrawPlayer(3);
        DrawPlayer(4);
        
        
        //context.drawImage(explosionVerticalCenter, 16 * bombFrame, 0, 16, 16, 48, 48, 48, 48);
        //context.drawImage(explosionHorizontalCenter, 16 * bombFrame, 0, 16, 16, 96, 96, 48, 48);
        //context.drawImage(explosionCenter, 16 * (explosionFrame), 0, 16, 16, 8 * 32, 5 * 32, charSize, charSize);
        //context.drawImage(explosionup, 16 * explosionFrame, 0, 16, 16, 8 * 32, 3 * 32, charSize, charSize);
        //context.drawImage(explosionupCenter, 16 * explosionFrame, 0, 16, 16, 8 * 32, 4 * 32, charSize, charSize);

        bombFrame++,
        frameNumber++;
        if (bombFrame >= 2)
            bombFrame = 0;
        if (frameNumber === 2) {
            frameNumber = 0;
            bombFrame = 2;
        }
        if (explosionFrame === 3)
            explosionFrame = 0;
    
    }, 50);//interval frequency in milliseconds
};


function drawBombs(){
    bombs.forEach(function(bomb) {
        if(bomb.exploded){
            context.drawImage(explosionCenter, 16 * explosionFrame, 0, 16, 16, bomb.x, bomb.y, 48, 48);
            for (var i = bomb.x+1; i <= bomb.x + (bomb.right-1); i++) {
                context.drawImage(explosionHorizontalCenter, 16 * explosionFrame, 0, 16, 16, bomb.x + (i - bomb.x)*charSize, bomb.y, 48, 48);
            }
            for (var i = bomb.x-1; i >= bomb.x - (bomb.left-1); i--) {
                context.drawImage(explosionHorizontalCenter, 16 * explosionFrame, 0, 16, 16, bomb.x - (i - bomb.x) - charSize, bomb.y, 48, 48);
            }
            for (var i = bomb.y+1; i <= bomb.y + (bomb.up-1); i++) {
                context.drawImage(explosionVerticalCenter, 16 * explosionFrame, 0, 16, 16, bomb.x, bomb.y + (i - bomb.y) - charSize, 48, 48);
            }
            for (var i = bomb.y-1; i >= bomb.y - (bomb.down-1); i--) {
                context.drawImage(explosionVerticalCenter, 16 * explosionFrame, 0, 16, 16, bomb.x, bomb.y - (i - bomb.y)*charSize, 48, 48);
            }
            context.drawImage(explosionright, 16 * explosionFrame, 0, 16, 16, bomb.x + (bomb.right * charSize), bomb.y, 48, 48);
            context.drawImage(explosionleft, 16 * explosionFrame, 0, 16, 16, bomb.x - (bomb.left * charSize), bomb.y, 48, 48);
            context.drawImage(explosionup, 16 * explosionFrame, 0, 16, 16, bomb.x, bomb.y - (bomb.up * charSize), 48, 48);
            context.drawImage(explosiondown, 16 * explosionFrame, 0, 16, 16, bomb.x, bomb.y + (bomb.down * charSize), 48, 48);
        }
        else
            context.drawImage(bombImage, 16 * bombFrame, 0, 16, 16, bomb.x, bomb.y, 48, 48);
        console.log(bomb.x +", "+ bomb.y);
    });
}

function updatePlayers(){
    players.forEach(function() {
        
    });
}

function DrawPlayer(playerNo) {
    var direction, image;
    var x = boardOffSetX;
    var y = boardOffSetY;
    console.log(x);
    if(playerNo === 1){
        direction = player1Direction;
        image = p1down;
        x += player1x;
        y += player1y;
    }
    else if(playerNo === 2){
        direction = player2Direction;
        image = p2down;
        x += player2x;
        y += player2y;
    }
    else if(playerNo === 3){
        direction = player3Direction;
        image = p3down;
        x += player3x;
        y += player3y;
    }
    
    else if(playerNo === 4){
        direction = player4Direction;
        image = p4down;
        x += player4x;
        y += player4y;
    }
    console.log(x);    
    if (direction === "LEFT")
        context.drawImage(image, 24 * (frameNumber + 6), 0, 22, 22, x, y, charSize, charSize);
    else if (direction === "RIGHT")
        context.drawImage(image, 24 * (frameNumber + 3), 0, 22, 22, x, y, charSize, charSize);
    else if (direction === "UP")
        context.drawImage(image, 24 * (frameNumber + 9), 0, 22, 22, x, y, charSize, charSize);
    else if (direction === "DOWN")
        context.drawImage(image, 24 * (frameNumber + 0), 0, 22, 22, x, y, charSize, charSize);
    //console.log(player1Direction + " " + player1Direction.length);
}
