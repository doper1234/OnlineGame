window.onload = WebSocketTest();
var ws;
var playerNumber;
var initialized = false;
function WebSocketTest()
{
    if ("WebSocket" in window)
    {
        alert("WebSocket is supported by your Browser!");

        // Let us open a web socket
        ws = new WebSocket("ws://localhost:8080/Online2D/game");
        ws.onopen = function ()
        {
            // Web Socket is connected, send data using send()
            ws.send("Message to send");
            alert("Message is sent...");
        };

        ws.onmessage = function (evt)
        {
            var received_msg = evt.data;
            if(!initialized){
                playerNumber = parseInt(received_msg);
                initialized = true;
            }
            alert("Message is received..." + received_msg);
            var message = received_msg.split(",");
            if(message[1] === "joined"){
                players.push(player2);
            }
        };

        ws.onclose = function ()
        {
            // websocket is closed.
            alert("Connection is closed...");
        };
    } else
    {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
    }
    
}

this.sendMessage = function (message){
        console.log(message);
        ws.send(message);
    };
