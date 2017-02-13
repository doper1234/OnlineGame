window.onload = WebSocketTest();
var ws;
var playerNumber;
var initialized = false;
var player1Direction = "DOWN";
var player2Direction = "DOWN";
function WebSocketTest()
{
    if ("WebSocket" in window)
    {
       // alert("WebSocket is supported by your Browser!");

        // Let us open a web socket
        ws = new WebSocket("ws://192.168.1.102:8080/Online2D/game");
        ws.onopen = function ()
        {
            // Web Socket is connected, send data using send()
            //ws.send("Message to send");
            //alert("Message is sent...");
        };

        ws.onmessage = function (evt)
        {
            var received_msg = evt.data;
            if(!initialized){
                playerNumber = parseInt(received_msg);
                initialized = true;
                alert("You are player " + received_msg);
            }
            //alert("Message is received..." + received_msg);
            var message = received_msg.split(",");
            if(message[0] === "joined"){
                //players.push(player2);
                alert("You are player " + received_msg);
            }
            else if(message[0] === "move"){
                if (parseInt(message[1]) === 0) {
                    player1x = parseInt(message[2]);
                    player1y = parseInt(message[3]);
                    player1Direction = message[4];
                }
                else if (parseInt(message[1]) === 1) {
                    player2x = parseInt(message[2]);
                    player2y = parseInt(message[3]);
                    player2Direction = message[4];
                }
                console.log(player1Direction + message[4]);
                //players.push(player2);
            }
        };

        ws.onclose = function ()
        {
            // websocket is closed.
           // alert("Connection is closed...");
        };
    } else
    {
        // The browser doesn't support WebSocket
       // alert("WebSocket NOT supported by your Browser!");
    }
    
}

this.sendMessage = function (message){
        console.log(message);
        ws.send(message);
    };
