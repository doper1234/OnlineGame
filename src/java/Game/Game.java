/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Game;

import Constants.Constants;
import Game.BaseEntity.Direction;
import Server.EndPoint;
import java.util.*;

/**
 *
 * @author Chris
 */
public final class Game {

    public static final int BOARD_WIDTH_MAX = 500, BOARD_HEIGHT_MAX = 500, BOARD_WIDTH_MIN = 0, BOARD_HEIGHT_MIN = 0;

    private final List<Tank> players;
    private final List<Bomb> bombs;
    private int numberOfPlayers;
    private final int[][] gameboard;
    private final EndPoint server;
    private Timer gameTimer;

    public Game(EndPoint endpoint) {
        players = new ArrayList<>();
        bombs = new ArrayList<>();

        this.server = endpoint;
        this.numberOfPlayers = EndPoint.clients.size() + 1;
        gameboard = new int[20][20];
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
