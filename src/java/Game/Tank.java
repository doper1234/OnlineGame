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
public class Tank extends Entity{
    
    public Type type;
    
    public enum Type{
        PLAYER, ENEMY
    }
    
    public enum Speed{
        SLOW, NORMAL, FAST
    }
    
    public enum Level{
        ONE, TWO, THREE, FOUR
    }
    
    public Tank(int x, int y, Direction direc, Type type) {
        super(x, y, direc, Entity.Health.DEFAULT_HEALTH);
        this.type = type;
    }
    
}
