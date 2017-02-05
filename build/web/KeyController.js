/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//onkeydown
//onkeypress
//onkeyup

window.onkeydown = function (event) {
    var x = event.keyCode;
    console.log(x);
    if (x === /*Keys.Up*/38) {  //UP Added else so only one can be pressed at once
        sendMessage(playerNumber + ", up");
    }
    else if (x === /*Keys.Down*/ 40) {  //down
        sendMessage(playerNumber + ", down");
    }
    else if (x === /*Keys.Left*/ 37) {  //LEFT
        sendMessage(playerNumber + ", left");
    }
    else if (x === /*Keys.Right*/39) {  //right
        sendMessage(playerNumber + ", right");
    }
    if (x === Keys.Space) {  //SPACE
    }
    if (x === Keys.Enter) {  //ENTER
    }
    if (x === Keys.A) {  //A, numbers go up alphabetically from A
    }
    
};

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