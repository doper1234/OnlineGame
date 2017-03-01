/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//onkeydown
//onkeypress
//onkeyup
document.getElementById("rightButton").onclick = function(){ButtonClick("right");};
document.getElementById("leftButton").onclick = function(){ButtonClick("left");};
document.getElementById("upButton").onclick = function(){ButtonClick("up");};
document.getElementById("downButton").onclick = function(){ButtonClick("down");};
document.getElementById("layBombButton").onclick = function(){ButtonClick("bomb");};

window.onkeydown = function (event) {
    var x = event.keyCode;
    var keys = new Keys();
    console.log(x);
    if (x === keys.Up)  //Added else so only one can be pressed at once
        sendMessage(playerNumber + ", up");
    else if (x === keys.Down)
        sendMessage(playerNumber + ", down");
    else if (x === keys.Left)
        sendMessage(playerNumber + ", left");
    else if (x === keys.Right)
        sendMessage(playerNumber + ", right");
    if (x === keys.Space)
        sendMessage(playerNumber + ", bomb");
    if (x === keys.Enter)
        console.log("enter");
    if (x === keys.A)
        console.log("a");
    
};

function ButtonClick(direction){
    console.log(direction);
    sendMessage(playerNumber + ", " + direction);
}

function Keys(){
    
    this.Up = 38;
    this.Down = 40;
    this.Left = 37;
    this.Right = 39;
    this.Space = 32;
    this.Enter = 13;
    this.A = 65; //numbers go up from A
    this.B = 66;
}