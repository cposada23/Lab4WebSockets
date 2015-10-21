/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var wsUri = "ws://"+document.location.host + document.location.pathname+ "Chat";

var websocket = new WebSocket(wsUri);

var username;

websocket.onopen = function(evt){
    OnOpen(evt);
};
websocket.onmessage = function(evt){
    OnMessage(evt);
};
websocket.onerror = function(evt){
    OnError(evt);
};

//Aca mando los mensages en el formulario HTML
var output = document.getElementById("output");

//Defino los metodos de los botones Join y Send

function join(){
    username = textField.value;
    websocket.send(username + "Enlazado");
}

function send_message(){
    websocket.send(username + ":"+ textField.value);
}

function OnOpen(evt){
        writeToAScreen("Conectado a " + wsUri);
    
}

function OnMessage(evt){
    console.log("onMessage");
    writeToScreen("RECIBIDO: "+    evt.data);
    if(evt.data.indexOf("enlazado") !==1){
        userField.innerHTML += evt.data.substring(0,evt.data.indexOf("enlazado"))+"\n";
        
    }else{
        chatlogField.innerHTML += evt.data+"\n";        
    }
}

function OnError(evt){
    writeToScreen('<span style = "color:red;">ERROR:</span>' + evt.data);
    
}

function writeToScreen(message){
    
    output.innerHTML+=message+"<br>";
}
