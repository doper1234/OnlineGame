/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Game;

/**
 *
 * @author Chris
 */
public class Entity {
    private int locX, locY, health, movementSpeed;
    private Direction direction;
    private boolean isAlive, isInvulnerable;
    
    public Entity(int x, int y, Direction direc, int health){
        direction = direc;
        locX = x;
        locY = y;
        isAlive = true;
        isInvulnerable = true;
        this.health = health;
        movementSpeed = 1;
    }
    
    public void go(Direction direction){
        this.direction = direction;
        switch(direction){
            case LEFT:
                if(locX - movementSpeed > Game.BOARD_WIDTH_MIN)
                    locX-= movementSpeed;
                break;
            case RIGHT:
                if(locX + movementSpeed <= Game.BOARD_WIDTH_MAX)
                    locX+= movementSpeed;
                break;
            case UP:
                if(locY - movementSpeed > Game.BOARD_HEIGHT_MIN)
                    locY-= movementSpeed;
                break;
            case DOWN:
                if(locY + movementSpeed <= Game.BOARD_HEIGHT_MAX)
                    locY+= movementSpeed;
                break;
            default:
                break;
        }
    }
    
    public void hit(int damage){
        health -= damage;
        if(health <= 0)
            this.isAlive = false;
        
    }
    
    public enum Direction{
        LEFT, RIGHT, UP, DOWN
    }
    
    public class Health{
        static final int DEFAULT_HEALTH = 1;
        
    }
}
