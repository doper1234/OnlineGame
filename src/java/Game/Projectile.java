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
class Projectile {
    
    private int LocX, LocY;
    public Projectile(int x, int y){
        LocX = x;
        LocY = y;
    }
    
    public int getLocX(){
        return LocX;
    }
    
    public int getLocY(){
        return LocY;
    }
    
    
}
