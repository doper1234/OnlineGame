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
public class Bomb extends Projectile {
    
    private final int range;
    
    public Bomb(int x, int y, int r) {
        super(x, y);
        this.range = r;
    }
    
    public int getRange(){
        return range;
    }
    
}
