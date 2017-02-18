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
import java.nio.file.Paths;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

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

    private final List<Tank> players;
    private final List<Bomb> bombs;
    private int mapNumber = 1;
    private int numberOfPlayers;
    private final int[][] gameboard;
    private final EndPoint server;
    private Timer gameTimer;
    

    public Game(EndPoint endpoint) {
        players = new ArrayList<>();
        bombs = new ArrayList<>();

        this.server = endpoint;
        this.numberOfPlayers = EndPoint.clients.size() + 1;
        gameboard = new int[BOARD_TILES_X][BOARD_TILES_Y];
        initializeGameBoard(mapNumber);
        startTimer();
        addPlayer(endpoint.getPlayerNumber());
    }

    public void addPlayer(int playerNumber) {
        numberOfPlayers++;
        players.add(new Tank(0, 0, Direction.UP, Tank.Type.PLAYER));
    }

    public void movePlayer(int playerNumber, Direction dir) {
        Tank player = players.get(playerNumber);
        player.go(dir);
    }

    public Tank getPlayer(int playerNumber) {
        return players.get(playerNumber);
    }

    public Bomb addBomb(Tank player) {
        if (player.canLayBomb()) {
            player.layedBomb();
            int x = player.getLocX()/20 * 16;
            int y = player.getLocY()/20 * 16;
            Bomb bomb = new Bomb(x, y, player.getBombRange());
            bombs.add(bomb);
            return bomb;
        }
        return null;
    }

    private void updateBombs() {
        for (Iterator<Bomb> it = bombs.iterator(); it.hasNext();) {
            Bomb b = it.next();
            b.tick();
            if (!b.isAlive()) {
                server.bombExploded(b.getBombId());
                it.remove();
            }
        }
    }
    
    private void initializeGameBoard(int mapNumber) {
       try {
            int x = 0;
            int y = 0;
            for (String line : Files.readAllLines(Paths.get("\\OnlineGame\\web\\maps\\map"+mapNumber+".txt"))) {
                for (String part : line.split("")) {
                    int block = Integer.parseInt(part);
                    gameboard[x][y] = block;
                    y++;
                }
                x++;
            }
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
        }, 2 * Constants.MINUTE);
    }

}
