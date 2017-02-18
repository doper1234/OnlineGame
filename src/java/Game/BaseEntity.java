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
public class BaseEntity {
    protected int locX, locY, movementSpeed;
    protected Direction direction;
    protected boolean isAlive;

    public enum Direction{
        LEFT, RIGHT, UP, DOWN
    }
    public BaseEntity(int x, int y){
        direction = Direction.DOWN;
        locX = x;
        locY = y;
        movementSpeed = 0;
    }
    public BaseEntity(int x, int y, Direction direc){
        this(x,y);
        direction = direc;
    }
    
    public int getLocX(){
        return locX;
    }
    
    public int getLocY(){
        return locY;
    }
    
    public boolean isAlive(){
        return isAlive;
    }
}
