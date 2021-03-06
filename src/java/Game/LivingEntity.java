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
public class LivingEntity extends BaseEntity{
    protected int health;
    protected boolean isInvulnerable;
    
    public LivingEntity(int x, int y, Direction direc, int health){
        super(x, y, direc);
        locX = x;
        locY = y;
        isAlive = true;
        isInvulnerable = true;
        this.health = health;
        movementSpeed = 3;
    }
    
    public void go(Direction direction){
        this.direction = direction;
        switch(direction){
            case LEFT:
                if(locX - movementSpeed > Game.BOARD_WIDTH_MIN)
                    locX-= movementSpeed;
                break;
            case RIGHT:
                if(locX + movementSpeed <= Game.BOARD_WIDTH_MAX - 16*3)
                    locX+= movementSpeed;
                break;
            case UP:
                if(locY - movementSpeed > Game.BOARD_HEIGHT_MIN)
                    locY-= movementSpeed;
                break;
            case DOWN:
                if(locY + movementSpeed <= Game.BOARD_HEIGHT_MAX- 16*3)
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
    
    public class Health{
        static final int DEFAULT_HEALTH = 1;
        
    }
    
    public Direction getDirection(){
        return direction;
    }
}
