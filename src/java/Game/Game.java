/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Game;

import Constants.Constants;
import Game.BaseEntity.Direction;
import Server.EndPoint;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

/**
 *
 * @author Chris
 */
public final class Game {

    public static final int BOARD_TILES_X = 13;
    public static final int BOARD_TILES_Y = 11;
    public static final int GLOBAL_MULTIPLIER = 3;
    public static final int PIXEL_SIZE = 16 * GLOBAL_MULTIPLIER;
    
    public static final int BOARD_WIDTH_MAX = BOARD_TILES_X * PIXEL_SIZE;
    public static final int BOARD_HEIGHT_MAX = BOARD_TILES_Y * PIXEL_SIZE;
    public static final int BOARD_WIDTH_MIN = 0;
    public static final int BOARD_HEIGHT_MIN = 0;
    
    private static final String GROUND = "O";
    private static final String PLAYER = "P";
    private static final String ENEMY = "E";
    private static final String BRICK = "B";
    private static final String STEEL = "S";

    private final List<Player> players;
    private final List<Enemy> enemies;
    private final List<Bomb> bombs;
    private int mapNumber = 1;
    private int numberOfPlayers;
    private final String[][] gameboard;
    private final EndPoint server;
    private Timer gameTimer;
    
    public Game(EndPoint endpoint) {
        players = new ArrayList<>();
        enemies = new ArrayList<>();
        bombs = new ArrayList<>();

        this.server = endpoint;
        this.numberOfPlayers = EndPoint.clients.size() + 1;
        gameboard = new String[BOARD_TILES_X][BOARD_TILES_Y];
        initializeGameBoard(mapNumber);
        startTimer();
        addPlayer(endpoint.getPlayerNumber());
    }

    public void addPlayer(int playerNumber) {
        numberOfPlayers++;
        players.add(new Player(0, 0, Direction.UP, Player.Type.PLAYER, playerNumber));
    }

    public void movePlayer(int playerNumber, Direction dir) {
        Player player = players.get(playerNumber);
        player.go(dir);
    }

    public Player getPlayer(int playerNumber) {
        return players.get(playerNumber);
    }

    public Bomb addBomb(Player player) {
        if (player.canLayBomb()) {
            player.layedBomb();
            int locX = (player.getLocX()/13);
            int locY = (player.getLocY()/11);
            int x = locX * (13);
            int y = locY * (11);
            System.out.println(x +"," + y +"," + locX + "," + locY + "," + player.getLocX() + "," + player.getLocY());
            Bomb bomb = new Bomb(x, y, player.getBombRange(), player);
            bombs.add(bomb);
            return bomb;
        }
        return null;
    }
    
    public void addEnemy(int x, int y){
        Enemy e = new Enemy(x,y, Direction.DOWN, 1);
        enemies.add(e);
        server.newEnemy(e);
        
    }

    private void updateBombs() {
        for (Iterator<Bomb> it = bombs.iterator(); it.hasNext();) {
            Bomb b = it.next();
            b.tick();
            if (!b.isAlive()) {
                server.bombExploded(b.getBombId(), getBombExplosionArea(b));
                it.remove();
            }
        }
    }
    
    private String getBombExplosionArea(Bomb b){
        int x = b.getLocX()/(16*3);
        int y = b.getLocY()/(16*3);
        int range = b.getRange();
        int left,right,up,down;
        left = right = up = down = 0;
        
        for (int i = x; i < gameboard.length && i < x + range; i++) {
            if(gameboard[i][y] != (GROUND))
                break;
            right++;
        }
        
        for (int i = x; i > 0 && i > x - range; i--) {
            if(!gameboard[i][y].equals(GROUND))
                break;
            left++;
        }
        
        for (int i = y; i < gameboard.length && i < y + range; i++) {
            if(!gameboard[x][i].equals(GROUND))
                break;
            down++;
        }
        
        for (int i = y; i > 0 && i > y - range; i--) {
            if(!gameboard[x][i].equals(GROUND))
                break;
            up++;
        }
        
        return String.format("%1$d,%2$d,%3$d,%4$d,%5$d",range,left,right,up,down);
    }
    
    private void initializeGameBoard(int mapNumber) {
       try {
            int x = 0;
            int y = 0;
            Path path = Paths.get("C:\\Users\\Chris\\Documents\\NetBeansProjects\\Online2D\\src\\java\\maps\\map1.txt");
            List<String> file = Files.readAllLines(path);
            for (String line : file) {
                String[] part = line.split("");
                for (int i = 0; i < gameboard.length; i++) {
                    //int block = Integer.parseInt(part);
                    if(part[i].equals(ENEMY))
                            addEnemy(y,x);
                        
                    gameboard[y][x] = part[i];
                    System.out.print(part[i]);
                    y++;
                }
                y=0;
                System.out.println();
                x++;
            }
            System.out.println(Arrays.toString(gameboard));
        } catch (FileNotFoundException ex) {
            System.out.println(ex.getMessage());
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
    }

    private void startTimer() {
        gameTimer = new Timer();
        gameTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                updateBombs();
            }
        },0, Constants.SECOND * 8);
        
    }

    public void removePlayer(int playerNumber) {
        Player player = null;
        for(Player p : players){
            if (p.getPlayerNumber() == playerNumber) {
                player = p;
                break;
            }
        }
        if(player != null){
            players.remove(player);
        }
    }

}
