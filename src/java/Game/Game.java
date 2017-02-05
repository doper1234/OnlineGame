/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Game;

import Game.Entity.Direction;
import Server.EndPoint;
import java.util.*;

/**
 *
 * @author Chris
 */
public class Game {
    public static final int BOARD_WIDTH_MAX = 500, BOARD_HEIGHT_MAX = 500, BOARD_WIDTH_MIN = 0, BOARD_HEIGHT_MIN = 0;
    
    private List<Tank> players;
    private int numberOfPlayers;
    private final int [][] gameboard;
    private EndPoint server;
    
    public Game(EndPoint endpoint){
        players = new ArrayList<>();
        this.server = endpoint;
        this.numberOfPlayers = EndPoint.clients.size() +1;
        gameboard = new int[20][20];
        addPlayer(endpoint.getPlayerNumber());
                
    }
    
    public void addPlayer(int playerNumber){
        numberOfPlayers++;
        players.add(new Tank(0, 0, Direction.UP, Tank.Type.PLAYER));
    }
    
    public void movePlayer(int playerNumber, Direction dir){
        Tank player = players.get(playerNumber);
        player.go(dir);
    }
    
    
}
