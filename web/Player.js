/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Player(spriteImage){
    charSize = 3*16; //TODO make constant
    this.x = 0;
    this.y = 0;
    this.direction = "DOWN";
    this.image = spriteImage;
    this.update = function(context, frameNumber, x,y){
        
    if (direction === "LEFT")
        context.drawImage(image, 24 * (frameNumber + 6), 0, 22, 22, x, y, charSize, charSize);
    else if (direction === "RIGHT")
        context.drawImage(image, 24 * (frameNumber + 3), 0, 22, 22, x, y, charSize, charSize);
    else if (direction === "UP")
        context.drawImage(image, 24 * (frameNumber + 9), 0, 22, 22, x, y, charSize, charSize);
    else if (direction === "DOWN")
        context.drawImage(image, 24 * (frameNumber + 0), 0, 22, 22, x, y, charSize, charSize);
    };
}
