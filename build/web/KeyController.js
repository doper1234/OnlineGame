/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//onkeydown
//onkeypress
//onkeyup

window.onkeydown = function () {
    var x = event.keyCode;
    
    if (x === Keys.Up) {  //UP Added else so only one can be pressed at once
    }
    else if (x === Keys.Down) {  //down
    }
    else if (x === Keys.Left) {  //LEFT
    }
    else if (x === Keys.Right) {  //right
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