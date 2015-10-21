/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package websocket;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author camilo.posadaa
 */
@ServerEndpoint("/chat")
public class EchoServer {
    
    
    private static final Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    
    @OnMessage
    public void onMessage(String message,   Session client) throws IOException, EncodeException {
        
        //Envio a todos los peers el menssage
        for (Session peer:peers){
            peer.getBasicRemote().sendObject(message);
        }
        
    }

    @OnClose
    public void onClose(Session peer) {
        //Elimino de la lista de sessiones al peer actual.
        peers.remove(peer);
    }

    @OnOpen
    public void onOpen(Session peer) {
        //Adiciono a mi lista de sessiones el nuevo peer.
        peers.add(peer);
    }
    
    
    
}
