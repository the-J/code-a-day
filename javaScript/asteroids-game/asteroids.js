/**
 * Created by juliusz.jakubowski@gmail.com on 08.11.18.
 */

const FPS = 30; // frames per second
const SHIP_SIZE = 30; // ship height in px
/**type {HTMLCanvasElement} */
var canv = document.getElementById('gameCanvas');
var ctx = canv.getContext('2d');
var ship = {
    x: canv.width / 2,
    y: canv.height / 2,
    r: SHIP_SIZE / 2,
    a: 90 / 180 * Math.PI // convert angle to radians
};

setInterval(update, 1000 / FPS);

function update() {
    // draw space
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canv.width, canv.height);

    // draw ship
    ctx.strokeStyle = 'white';
    ctx.lineWidth = SHIP_SIZE / 20;

    ctx.beginPath();

    ctx.moveTo( // ships upper tip
        ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
        ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
    );

    ctx.lineTo( // ships rear left
        ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
    );

    ctx.lineTo( // ships rear right
        ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
    );

    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'red'; // center ship dot
    ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);

    // rotate ship

    //move the ship

}
