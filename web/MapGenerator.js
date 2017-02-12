/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var map;
var map1Image;
function MapGenerator(){
    
map1Image = document.getElementById("map1Image");

var rawFile = new XMLHttpRequest();
var file = "maps/map1.txt";
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                map = allText.split("\n");
                
//                var index
//                while((index = map.indexOf("")) !== -1){
//
//                if (index > -1) {
//                    map.splice(index, 1);
//                    console.log("spliced")
//                }
////                for (i = 0; i < split.length; i++) { 
////                   context.drawImage(map1Image, i*16, 0);
////                }
//                }
                console.log(map);
            }
        }
    };
    rawFile.send(null);
}

function DrawMap() {
    var x = 0;
    var y = 0;
    for (i = 0; i < map.length; i++) {
        for (j = 0; j < map[i].length; j++) {
            if(j > 12)
                continue;
            y = j*globalMultiplier;//i % 16;
            //console.log(y);
            //if (i % 16 === 0) {
                x = charSize *i;
                //y = 0;
            //}
            x--;
            x+= charSize*2.5;
            y+= 4.5;
            if (map[i][j] === steel)
                DrawSteel(y * 16, x);
            else if (map[i][j] === brick)
                DrawBrick(y * 16, x);
            else
                DrawGrass(y * 16, x);
            //context.drawImage(map1Image, y * 16, x);
        }
    }
}

function DrawGrass(y, x){
    context.drawImage(map1Image, 0, 0*pixelSize, pixelLength, pixelLength, y, x,  charSize, charSize);
    //context.drawImage(explosionupCenter, 16*explosionFrame, 0, 16,16,200,200,100,100);
}

function DrawSteel(y, x){
    //console.log("steel");
    context.drawImage(map1Image, 3*pixelSize, 0, pixelLength, pixelLength, y, x,  charSize, charSize);
}

function DrawBrick(y, x){
    console.log("brick");
    context.drawImage(map1Image, 2*pixelSize, 0, pixelLength, pixelLength, y, x,  charSize, charSize);
}
var grass = "O";
var brick = "B";
var steel = "S";

var pixelSize = 16;