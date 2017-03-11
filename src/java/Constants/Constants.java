/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Constants;

import java.util.List;
import java.util.ArrayList;

/**
 *
 * @author Chris
 */
public final class Constants {
    
    public static final int MILLISECOND = 1;
    public static final int SECOND = 1000;
    public static final int MINUTE = SECOND * 60;
    public static final int HOUR = MINUTE * 60;
    
    private static final List<Integer> bombIds = new ArrayList<>();
    private static final List<Integer> enemyIds = new ArrayList<>();
    
    private Constants(){
    }
    
    public static int getBombId(){
        int bombId = bombIds.size() +1;
        bombIds.add(bombId);
        return bombId;
    }
    
    public static int getEnemyId(){
        int enemyId = enemyIds.size() +1;
        enemyIds.add(enemyId);
        return enemyId;
    }
    
    public static void removeBombId(int bombId){
        bombIds.remove(bombId);
    }
}
