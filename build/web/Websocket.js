window.onload = WebSocketTest();
var ws;
var playerNumber;
var chatText;
var chatArea ;
var chatButton;

function WebSocketTest()
{
    if ("WebSocket" in window)
    {
       // alert("WebSocket is supported by your Browser!");

        // Let us open a web socket
        ws = new WebSocket("ws://192.168.1.104:8080/Online2D/game");
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
            switch (message[0]) {
                case "joined":
                    //players.push(player2);
                    alert("You are player " + received_msg);
                    break;

                case "move":
                    if (parseInt(message[1]) === 0) {
                        player1x = parseInt(message[2]);
                        player1y = parseInt(message[3]);
                        player1Direction = message[4];
                    } else if (parseInt(message[1]) === 1) {
                        player2x = parseInt(message[2]);
                        player2y = parseInt(message[3]);
                        player2Direction = message[4];
                    } else if (parseInt(message[1]) === 2) {
                        player3x = parseInt(message[2]);
                        player3y = parseInt(message[3]);
                        player3Direction = message[4];
                    } else if (parseInt(message[1]) === 3) {
                        player4x = parseInt(message[2]);
                        player4y = parseInt(message[3]);
                        player4Direction = message[4];
                    }
                    console.log(player1Direction + message[4]);
                    //players.push(player2);
                    break;
                case "bomb":
                    addBomb(parseInt(message[1]), parseInt(message[2]), parseInt(message[3]));
//                alert(message);
                    break;
                case "bombexploded":
                    explodeBomb(parseInt(message[1]), parseInt(message[2]), parseInt(message[3]), parseInt(message[4]), parseInt(message[5]), parseInt(message[6]));
                    // alert(message);
                    break;
                case "enemy":
                    moveEnemy(message[1], message[2], message[3], message[4]);

                case "message":
                    displayMessage("Player " + message[1] + "said: " + message[2]);
                    break;
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
function sendChatMessage(){
    sendMessage("message, "+ playerNumber +","+chatText.value);
    chatText.value = "";
}

function displayMessage(message){
 chatArea.value +=message + "\\\n";   
}

function addEnemy(enemyId,x,y,direction){
    enemies.push(new Enemy(enemyId,x,y,direction));
}

function moveEnemy(enemyId,x,y,direction){
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].id === enemyId) {
            enemies[i].x = x;
            enemies[i].y = y;
            enemies[i].direction = direction;
            break;
        }
    }
}

function explodeBomb(id, range, left, right,up, down) {
    for (var i = 0; i < bombs.length; i++) {
        if (bombs[i].id === id) {
            bombs[i].range = range;
            bombs[i].left = left;
            bombs[i].right = right;
            bombs[i].up = up;
            bombs[i].down = down;
            bombs[i].exploded = true;
            break;
        }
    }
}

function addBomb(id, x,y){
    //alert(x + ", " + y);
    bombs.push(new Bomb(id, x + boardOffSetX, y + boardOffSetY));
}

this.sendMessage = function (message){
        console.log(message);
        ws.send(message);
    };
