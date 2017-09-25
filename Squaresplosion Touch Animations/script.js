$(document).ready(function() {

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var squares = [1];
var fireworks = [];
var splits = [];
var wx = 0;
var wy = 0;
var sx = 0;
var sy = 0;
var grav = 0.45;
var vel = -20;

$("#instruct").click(function(ev) {
    $("#instruct").fadeOut();
    if ($("#m1").css("opacity") > 0.3 && squares.length<7) {
   squares.push({sx: ev.clientX, sy: ev.clientY-40, x: wx, y: wy, opac: 0.2, lw: 4});
   } else {
   if ($("#m1").css("opacity")<0.3 && fireworks.length<8) {
   fireworks.push({sx: Math.floor(355*Math.random()), sy:500, tx: ev.clientX, ty: ev.clientY, wx: 3, wy: 3, veloc: -7+Math.floor(-14*Math.random()) });
   }}
});

$("#splash").css({padding: "0 1em"});
$("#splash").animate(({padding: "1em"}), 1200);
$("#m1").css({backgroundColor: "rgb(200,100, 90)"});
$("#m2").css({backgroundColor: "rgb(255,255,255)"});
$("#m1").css({color: "white"});
$("#m2").css({color: "black"});
$("#m1").animate({width: "61%"});
$("#m1").css({opacity: "0.75"});
$("#m2").animate({width: "20%"});
$("#m2").css({opacity: "0.15"});

$("#m1").click(function() {
    $("#m1").css({backgroundColor: "rgb(200,100, 90)"});
    $("#m2").css({backgroundColor: "rgb(255,255,255)"});
    $("#m1").css({color: "white"});
    $("#m2").css({color: "black"});
    $("#m1").animate({width: "61%"});
    $("#m1").css({opacity: "0.75"});
    $("#m2").animate({width: "20%"});
    $("#m2").css({opacity: "0.15"});
    });

$("#m2").click(function() {
if ($("#splash").css("height")) {
   $("#splash").slideUp(600);
}
    $("#m2").css({backgroundColor: "rgb(200,100,90)"});
    $("#m1").css({backgroundColor: "rgb(255,255,255)"});
    $("#m2").css({color: "white"});
    $("#m1").css({color: "black"});
    $("#m2").animate({width: "61%"});
    $("#m2").css({opacity: "0.75"});
    $("#m1").animate({width: "20%"});
    $("#m1").css({opacity: "0.15"});
    });

$(canvas).click(function(ev) {
if ($("#m1").css("opacity") > 0.3 && squares.length<7) {
   squares.push({sx: ev.clientX, sy: ev.clientY-40, x: wx, y: wy, opac: 0.2, lw: 4});
   } else {
   if ($("#m1").css("opacity")<0.3 && fireworks.length<8) {
   fireworks.push({sx: Math.floor(355*Math.random()), sy:500, tx: ev.clientX, ty: ev.clientY, wx: 3, wy: 3, veloc: -7+Math.floor(-14*Math.random()) });
   }}
});

grow = function () {
    for (i = 0; i < squares.length; i++) {
        ctx.lineWidth = squares[i].lw;
        ctx.strokeStyle = "rgba(255,255,255," + squares[i].opac + ")";
        ctx.save();
        if (squares[i].opac >= 0){
        ctx.translate(squares[i].sx+squares[i].x/2, squares[i].sy+squares[i].y/2);
        ctx.rotate(360*squares[i].opac*(Math.PI/180));
        ctx.translate(-(squares[i].sx+squares[i].x/2), -(squares[i].sy+squares[i].y/2));
        }
        ctx.beginPath();
        ctx.rect(squares[i].sx, squares[i].sy, squares[i].x, squares[i].y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        squares[i].opac += 0.02;
        if (squares[i].opac < 0.4){
        squares[i].x += 10;
        squares[i].y += 10;
        squares[i].sx -= 5;
        squares[i].sy -= 5;
        }
        if (squares[i].opac >= 0.9){
        squares[i].x -= 20;
        squares[i].y -= 20;
        squares[i].sx += 10;
        squares[i].sy += 10;
        }
        if (i === 0){
           ctx.clearRect(0,0,355,500);
        }
        if (squares[i].x <= 0) {
        var howMany = Math.floor(24*Math.random()) || 24;
        if (howMany < 8) {
        howMany = 8;
        }
        for (j = 0; j < howMany; j++) {
           var ranChance = Math.round(Math.random());
              splits.push({sx: squares[i].sx, sy: squares[i].sy, x: 2, y: 2, opac: 1, veloc: vel*Math.random() || -15, velx: 7.5*Math.random()});
              if (ranChance){
              splits[splits.length-1].velx *= -1; 
              }
           }
           squares.splice(i, 1);
        }
    }
    requestAnimationFrame(grow);
}

shoot = function () {
    for (i = fireworks.length - 1; i>=0; i--) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgba(255,255,255,1)";
        ctx.beginPath();
        ctx.rect(fireworks[i].sx, fireworks[i].sy, fireworks[i].wx, fireworks[i].wy);
        ctx.stroke();
        ctx.closePath();
        fireworks[i].sy += fireworks[i].veloc;
        fireworks[i].veloc += grav;
        fireworks[i].sx += (fireworks[i].tx-fireworks[i].sx)*0.1;
        if (fireworks[i].veloc >= 3) {
        var howMany = Math.floor(30*Math.random()) || 30;
        if (howMany < 14) {
        howMany = 14;
        }
        for (j = 0; j < howMany; j++) {
           var ranChance = Math.round(Math.random());
              splits.push({sx: fireworks[i].sx, sy: fireworks[i].sy, x: 2, y: 2, opac: 1, veloc: -2+vel*Math.random() || -17, velx: 9*Math.random()});
              if (ranChance){
              splits[splits.length-1].velx *= -1; 
              }
           }
           fireworks.splice(i, 1);
        }
    }
    requestAnimationFrame(shoot);
}

split = function () {
    for (i = 0; i < splits.length; i++) {
        splits[i].veloc += grav;
        ctx.lineWidth = 10;
        if ($("#m2").css("opacity") > 0.3) {
            ctx.lineWidth = 5;
            splits[i].veloc += grav;
        }
        ctx.strokeStyle = "hsla(" + Math.floor(360*Math.random()) + ", 100%, 50%, " + splits[i].opac + ")";
        ctx.beginPath();
        ctx.rect(splits[i].sx, splits[i].sy, splits[i].x, splits[i].y);
        ctx.stroke();
        ctx.closePath();
        splits[i].opac -= 0.03;
        if ($("#m2").css("opacity") > 0.3) {
           splits[i].opac -= 0.018;
        }
        splits[i].sx += splits[i].velx;
        splits[i].sy += splits[i].veloc;
        if (splits[i].opac <= 0) {
           splits.splice(i, 1);
        }
    }
    requestAnimationFrame(split);
}

requestAnimationFrame(grow);
requestAnimationFrame(shoot);
requestAnimationFrame(split);

});