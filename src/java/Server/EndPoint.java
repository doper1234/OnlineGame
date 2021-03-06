package Server;

import Game.BaseEntity.Direction;
import Game.Bomb;
import Game.Enemy;
import Game.LivingEntity;
import Game.Game;
import Game.Player;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import javax.websocket.CloseReason;
import javax.websocket.EndpointConfig;
import javax.websocket.*;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/game")
public class EndPoint {

    /**
     *
     * @author Chris
     */
    static Game game;
    int playerNumber = 0;
    public static List<EndPoint> clients = new CopyOnWriteArrayList<>();
    Session session;

    @OnOpen
    public void onOpen(Session session, EndpointConfig eC) {
        this.session = session;
        playerNumber = clients.size();
        if (clients.isEmpty()) {
            game = new Game(this);
        }
        else
            game.addPlayer(playerNumber);
        
        try {
            if (playerNumber > 4) {
                session.getBasicRemote().sendText("Server is full!");
                clients.remove(this);
                try {
                    session.close();
                } catch (IOException ex1) {
                    ex1.printStackTrace();
                }

            } else {
                clients.add(this);
                session.getBasicRemote().sendText(playerNumber + "");
                broadcast(playerNumber, playerNumber + ",joined");
            }
        } catch (IOException ex) {

        }
        //broadcast("someone joined");
    }

    @OnClose
    public void onClose(Session session, CloseReason reason) {
        System.out.println("socket closed: " + reason.getReasonPhrase());
        playerNumber--;
        clients.remove(this);
        game.removePlayer(playerNumber);
    }

    @OnMessage
    public void onMessage(String message) {
        Bomb bomb = null;
        System.out.println(message);
        String[] input = message.split(", ");
        if(input[0].equalsIgnoreCase("message")){
                broadcast(message);
                return;
        }
        message = input[1];
        int playerNo;
        try {
            playerNo = Integer.parseInt(input[0]);
        } catch (NumberFormatException e) {
            return;
        }
        if (message.equalsIgnoreCase("up")) {
            game.movePlayer(playerNo, Direction.UP);
        } else if (message.equalsIgnoreCase("down")) {
            game.movePlayer(playerNo, Direction.DOWN);
        } else if (message.equalsIgnoreCase("left")) {
            game.movePlayer(playerNo, Direction.LEFT);
        } else if (message.equalsIgnoreCase("right")) {
            game.movePlayer(playerNo, Direction.RIGHT);
        } 
        
        Player player = game.getPlayer(playerNo);
        if (message.equalsIgnoreCase("bomb")){
            bomb = game.addBomb(player);
        }
        if(bomb != null)
            broadcast("bomb," + bomb.getBombId() + "," + bomb.getLocX() +"," + bomb.getLocY());
        else
            broadcast("move," + playerNo +","+ player.getLocX() +"," + player.getLocY() + "," + player.getDirection().toString());
    }

    private void broadcast(String message) {
        for(EndPoint client: clients){
        try {
                client.session.getBasicRemote().sendText(message);
            } 
        catch (IOException ex) {
                clients.remove(this);
                playerNumber--;
                try {
                    client.session.close();
                } catch (IOException ex1) {
                    System.err.println(ex1.getMessage());

                }
            } catch (IllegalStateException e) {
                System.err.println(e.getMessage());
            }
        }
        
    }
    
    private void broadcast(int playerNumberNotToSendTo, String message) {
        clients.stream().filter((client) -> (client.playerNumber != playerNumberNotToSendTo)).forEach((client) -> {
            try {
                client.session.getBasicRemote().sendText(message);
            } catch (IOException ex) {
                clients.remove(this);
                playerNumber--;
                try {
                    client.session.close();
                } catch (IOException ex1) {
                    System.err.println(ex1.getMessage());

                }
            } catch (IllegalStateException e) {
                System.err.println(e.getMessage());
            }
        });
    }

    public int getPlayerNumber() {
        return playerNumber;
    }

    public void newEnemy(Enemy e){
        broadcast("newenemy," + e.getId()+ "," + e.getLocX() + "," + e.getLocY() + "," + e.getDirection());
    }
    
    public void bombExploded(int bombId, String bombExplosionArea) {
        broadcast("bombexploded," + bombId + "," + bombExplosionArea);
    }
}
