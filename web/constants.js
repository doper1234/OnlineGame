/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var initialized = false;
var player1Direction = "DOWN";
var player2Direction = "DOWN";
var player3Direction = "DOWN";
var player4Direction = "DOWN";
var bombs = [];

var globalMultiplier = 3;
var pixelLength = 16;
var tilesX = 13;
var tilesY = 11;

var charSize = pixelLength * globalMultiplier;
var gameWidth = 256 * globalMultiplier;
var gameHeight = 232 * globalMultiplier;

var players = [];
var guy = document.getElementById("coin");//new Image("/Online2D/images/guymoving.png");
var p1down = document.getElementById("p1down");
var p2down = document.getElementById("p2down");
var p3down = document.getElementById("p3down");
var p4down = document.getElementById("p4down");
var player1 = document.getElementById("mario");
var player2 = document.getElementById("player1");

var mariosprites = document.getElementById("mariosprites");//= new Image();
//mariosprites.Imagesrc = "/Online2D/images/mariosprites.png";
var boardOffSetX = (24)*globalMultiplier;
var boardOffSetY = (40)* globalMultiplier;
var player1x = boardOffSetX;
var player1y = boardOffSetY;
var player2x = 50;
var player2y = 50;
var player3x = 150;
var player3y = 150;
var player4x = 250;
var player4y = 250;