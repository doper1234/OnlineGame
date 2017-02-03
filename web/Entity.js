/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Entity() {
    this.direction = "UP";
    this.locX = 0;
    this.locY = 0;
    this.isDead = false;
    this.hasPowerUp = false;
    this.health = 1;
    this.canMove = true;
    this.sprite = new Image;
    this.movementSpeed = 1;
    this.bulletSpeed = 2;
    this.move = function (directionToMove) {
        direction = directionToMove;
        if (directionToMove === Direction.up) {
            locY-=movementSpeed;
        }
        if (directionToMove === Direction.down) {
            locY+=movementSpeed;
        }
        if (directionToMove === Direction.left) {
            locX-=movementSpeed;
        }
        if (directionToMove === Direction.right) {
            locX+=movementSpeed;
        }
    };
    this.fire = function(){
        
    };
}
 
Entity.prototype.getInfo = function() {
    return this.color + ' ' + this.type + ' apple';
};

function Direction(){
    this.left = "LEFT";
    this.right = "RIGHT";
    this.up = "UP";
    this.down = "DOWN";
}