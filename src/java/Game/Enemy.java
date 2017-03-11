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
public class Enemy extends LivingEntity{
    
    private final int id;
    
    public Enemy(int x, int y, Direction direc, int health) {
        super(x, y, direc, health);
        id = Constants.getEnemyId();
    }
    
    public int getId(){
        return id;
    }
}
