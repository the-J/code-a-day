/**
 * Created by juliusz.jakubowski@gmail.com on 08.11.18.
 */

const FPS = 30; // frames per second
const SHIP_SIZE = 30; // ship height in px
const TURN_SPEED = 360; // rotate speed in deg / sec
const SHIP_THRUST = 5; // acceleration of ship px / sec / sec
const FRICTION = 0.7; // friction coefficient of space ( 0 = no, 1 = lost)

/**type {HTMLCanvasElement} */
var canv = document.getElementById('gameCanvas');
var ctx = canv.getContext('2d');
var ship = {
    x: canv.width / 2,
    y: canv.height / 2,
    r: SHIP_SIZE / 2,
    a: 90 / 180 * Math.PI, // convert angle to radians - facing up
    rot: 0, // initial rotating speed
    thrusting: false,
    thrust: {
        x: 0,
        y: 0
    }
};

// setup game loop
setInterval(update, 1000 / FPS);

// set event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown( /** @type {KeyboardEvent} */ ev ) {
    switch (ev.keyCode) { //rotate and move ship
        case 37: // rotate left
            ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
            break;
        case 38: // thrusting
            ship.thrusting = true;
            break;
        case 39: // rotate right
            ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;
            break;
        case 40:
            break;
        default:
            return;
    }
}

function keyUp( /** @type {KeyboardEvent} */ ev ) {
    switch (ev.keyCode) { //rotate and move ship
        case 37: // left - stop rotating
            ship.rot = 0;
            break;
        case 38: // up - thrusting
            ship.thrusting = false;
            break;
        case 39: // stop rotate right
            ship.rot = 0;
            break;
        case 40:
            break;
        default:
            return;
    }
}

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
    ship.a += ship.rot;

    // thrust the ship
    if (ship.thrusting) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;
    }
    else {
        ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
        ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
    }


    //move the ship
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;
}
