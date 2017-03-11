/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Game;

import Constants.Constants;

/**
 *
 * @author Chris
 */
public class Bomb extends Projectile {
    
    private final int range;
    private final int bombId;
    private final Player player;
    private int ticks;
    private final int EXPLODING_TICK = 10;
    
    public Bomb(int x, int y, int r, Player player) {
        super(x, y);
        this.range = r;
        bombId = Constants.getBombId();
        this.player = player;
    }
    
    public int getRange(){
        return range;
    }
    
    public void tick(){
        ticks++;
        if(ticks == EXPLODING_TICK){
            explode();
        }
    }
    
    public void explode(){
        player.increaseBombCapacity();
        this.isAlive = false;
    }
    
    public int getBombId(){
        return bombId;
    }
}
