package EndPoints;

import java.io.IOException;
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
    
    int playerNumber = 0;
    static List<EndPoint> clients = new CopyOnWriteArrayList<>();
    Session session;
    
    @OnOpen
    public void onOpen(Session session, EndpointConfig eC){
        this.session = session;
        clients.add(this);
        playerNumber = clients.size();
        try {
            if(playerNumber > 4){
               session.getBasicRemote().sendText("Server is full!");
               clients.remove(this);
                    try {
                        session.close();
                    } catch (IOException ex1) {
                        ex1.printStackTrace();
                    }
               
            }else{
               session.getBasicRemote().sendText(playerNumber +"");
            }
        } catch (IOException ex) {
            
        }
        //broadcast("someone joined");
    }
    
    @OnClose
    public void onClose(Session session, CloseReason reason){
        System.out.println("socket closed: " + reason.getReasonPhrase());
        playerNumber--;
    }
    
    @OnMessage
    public void onMessage(String message){
        broadcast(message);
    }
    
    private void broadcast(String message){
        String[] result = message.split(" ");
        int number = 0;
        try {
            number = Integer.parseInt(result[0]);
        }
        catch(NumberFormatException e){
            
        }
        //System.out.println(number + "p is moving right?");
        System.out.println(message);
        
        for(EndPoint client : clients){
            try{
            if(clients.get(number-1) != client){
                try {
                    client.session.getBasicRemote().sendText(/*playerNumber + " " +*/message);
                } catch (IOException ex) {
                    clients.remove(this);
                    playerNumber--;
                    try {
                        client.session.close();
                    } catch (IOException ex1) {
                        ex1.printStackTrace();

                    }
                } catch(IllegalStateException e){
                    e.printStackTrace();
                }
            }//else{
//               try {
//                    client.session.getBasicRemote().sendText("You are moving?");
//                } catch (IOException ex) {
//                    
//                } 
//            }
            }
            catch (Exception e){
                System.out.println(e.getMessage());
            }
        }
    }
}

