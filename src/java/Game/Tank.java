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
public class Tank extends PlayerEntity{
    
    public Type type;
    
    private int bombRange;
    private int bombCapacity;
    private int currentBombAmount;
    private int playerNumber;
    
    public enum Type{
        PLAYER, ENEMY
    }
    
    public enum Speed{
        SLOW, NORMAL, FAST
    }
    
    public enum Level{
        ONE, TWO, THREE, FOUR
    }
    
    public Tank(int x, int y, Direction direc, Type type, int playerNo) {
        super(x, y, direc, PlayerEntity.Health.DEFAULT_HEALTH);
        this.type = type;
        bombRange = 2;
        bombCapacity = 10;
        currentBombAmount = 0;
        playerNumber = playerNo;
    }
    
    public int getPlayerNumber(){
        return playerNumber;
    }

    public int getBombRange(){
        return bombRange;
    }
    
    public void increaseBombRange(){
        //TODO
        //if(bombRange < MAX_BOMB_RANGE)
        bombRange++;
    }
    
    public boolean canLayBomb() {
        return bombCapacity != currentBombAmount;
    }

    public void layedBomb() {
        currentBombAmount++;
    }
    
    public void bombExploded() {
        currentBombAmount--;
    }
    
    public void increaseBombCapacity(){
        //if(bombCapacity < MAX_BOMB_CAPACITY
        bombCapacity++;
    }
    
}
