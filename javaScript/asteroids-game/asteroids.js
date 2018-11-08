/**
 * Created by juliusz.jakubowski@gmail.com on 08.11.18.
 */

// DEV CONST
const SHOW_BOUNDING = false; // show hide collision bounding
const SHOW_HIDE_SHIPS_CENTER_DOT = false; // read the name

// GAME CONST
const FPS = 30; // frames per second
const FRICTION = 0.7; // friction coefficient of space ( 0 = no, 1 = lost)
const LASER_MAX = 10; // max num of lasers on the screen at once
const LASER_SPD = 500; // speed of lasers px /sec
const LASER_DIST = 0.6; // max dist laser can travel as fraction of screan width

const SHIP_SIZE = 30; // ship height in px
const SHIP_TURN_SPEED = 360; // rotate speed in deg / sec
const SHIP_THRUST = 5; // acceleration of ship px / sec / sec
const SHIP_EXPLODE_DUR = 0.3; // duration of ships explosion
const SHIP_INV_DUR = 3; // duration of the ship's invisibility sec
const SHIP_BLINK_DUR = 0.1; // duration of the ship's blink during invisibility sec

const ROIDS_NUM = 3; // starting num of asteroids
const ROIDS_SIZE = 100; // starting size in px
const ROIDS_SPD = 50; // max starting speed od asteroids in px / sec
const ROIDS_VERT = 10; // average numb of vertices on each asteroid
const ROIDS_JAG = 0.4; // jaggednes of the asteroids 0 = none

// setup game loop
setInterval(update, 1000 / FPS);

/**type {HTMLCanvasElement} */
var canv = document.getElementById('gameCanvas');
var ctx = canv.getContext('2d');

var ship = newShip();
var roids = []; // asteroids

function newShip() {
    return {
        x: canv.width / 2,
        y: canv.height / 2,
        r: SHIP_SIZE / 2,
        a: 90 / 180 * Math.PI, // convert angle to radians - facing up
        rot: 0, // initial rotating speed

        thrusting: false,
        thrust: {
            x: 0,
            y: 0
        },

        explodeTime: 0,
        blinkTime: Math.ceil(SHIP_BLINK_DUR * FPS),
        blinkNum: Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR),

        canShoot: true,
        lasers: []
    };
}

function explodeShip() {
    ship.explodeTime = Math.floor(SHIP_EXPLODE_DUR * FPS);
}

function shootLaser() {
    // create laser obj
    if (ship.canShoot && ship.lasers.length < LASER_MAX) {
        ship.lasers.push({ // laser cord - from ships nose
            x: ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
            y: ship.y - 4 / 3 * ship.r * Math.sin(ship.a),
            xv: LASER_SPD * Math.cos(ship.a) / FPS,
            yv: -LASER_SPD * Math.sin(ship.a) / FPS,
            dist: 0
        });
    }
    // prevent further shooting
    ship.canShoot = false;
}

function createAsteroidBelt() {
    roids = [];
    var x, y;
    for (var i = 0; i < ROIDS_NUM; i++) {
        do {
            x = Math.floor(Math.random() * canv.width);
            y = Math.floor(Math.random() * canv.height);
        } while (distBetweenPoints(ship.x, ship.y, x, y) < ROIDS_SIZE * 2 + ship.r);

        roids.push(newAsteroid(x, y));
    }
}

function newAsteroid( x, y ) {
    var roid = {
        x: x,
        y: y,
        xv: Math.random() * ROIDS_SPD / FPS * (Math.random() < 0.5 ? 1 : -1),
        yv: Math.random() * ROIDS_SPD / FPS * (Math.random() < 0.5 ? 1 : -1),
        r: ROIDS_SIZE / 2,
        a: Math.random() * Math.PI * 2, // in radians
        vert: Math.floor(Math.random() * (ROIDS_VERT + 1) + ROIDS_VERT / 2),
        offs: []
    };

    // create vertexs offset
    for (var i = 0; i < roid.vert; i++) {
        roid.offs.push(Math.random() * ROIDS_JAG * 2 + 1 - ROIDS_JAG);
    }

    return roid;
}

function distBetweenPoints( x1, y1, x2, y2 ) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// set event handlers for keyboard
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown( /** @type {KeyboardEvent} */ ev ) {
    switch (ev.keyCode) { //rotate and move ship
        case 32: // space bar - shoot laser
            shootLaser();
            break;
        case 37: // rotate left
            ship.rot = SHIP_TURN_SPEED / 180 * Math.PI / FPS;
            break;
        case 38: // thrusting
            ship.thrusting = true;
            break;
        case 39: // rotate right
            ship.rot = -SHIP_TURN_SPEED / 180 * Math.PI / FPS;
            break;
        case 40:
            break;
        default:
            return;
    }
}

function keyUp( /** @type {KeyboardEvent} */ ev ) {
    switch (ev.keyCode) { //rotate and move ship
        case 32: // space bar - allow hoot again
            ship.canShoot = true;
            break;
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

createAsteroidBelt();

// main method
function update() {
    var blinkOn = ship.blinkNum % 2 === 0;
    var exploding = ship.explodeTime > 0;

    // draw space
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canv.width, canv.height);

    // draw ship
    if (!exploding) {
        if (blinkOn) {
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
        }

        // handle blinking
        if (ship.blinkNum > 0) {
            //reduce blink time
            ship.blinkTime--;

            // reduce blink num
            if (ship.blinkTime === 0) {
                ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
                ship.blinkNum--;
            }
        }
    }
    else {
        // draw explosion - need to create loop for that
        ctx.fillStyle = 'darkred';
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 1.7, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 1.1, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 0.8, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 0.5, 0, Math.PI * 2, false);
        ctx.fill();
    }

    if (SHOW_BOUNDING) {
        ctx.strokeStyle = 'lime';
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
        ctx.stroke();
    }

    // draw asteroids
    ctx.lineWidth = SHIP_SIZE / 20;
    var x, y, r, a, vert, offs;
    for (var i = 0; i < roids.length; i++) {
        // get asteroid props
        x = roids[ i ].x;
        y = roids[ i ].y;
        r = roids[ i ].r;
        a = roids[ i ].a;
        vert = roids[ i ].vert;
        offs = roids[ i ].offs;

        // draw path
        ctx.beginPath();
        ctx.moveTo(
            x + r * offs[ 0 ] * Math.cos(a),
            y + r * offs[ 0 ] * Math.sin(a)
        );

        // draw polygon
        for (var j = 1; j < vert; j++) {
            ctx.strokeStyle = 'slategrey';
            ctx.lineTo(
                x + r * offs[ j ] * Math.cos(a + j * Math.PI * 2 / vert),
                y + r * offs[ j ] * Math.sin(a + j * Math.PI * 2 / vert)
            );
        }
        ctx.closePath();
        ctx.stroke();

        if (SHOW_BOUNDING) {
            ctx.strokeStyle = 'lime';
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.stroke();
        }
    }

    // center dot
    if (SHOW_HIDE_SHIPS_CENTER_DOT) {
        ctx.fillStyle = 'red'; // center ship dot
        ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
    }

    // draw lasers
    for (var i = 0; i < ship.lasers.length; i++) {
        ctx.fillStyle = 'salmon';
        ctx.beginPath();
        ctx.arc(ship.lasers[ i ].x, ship.lasers[ i ].y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
        ctx.fill();
    }

    if (!exploding) {
        // check asteroid collisions
        if (ship.blinkNum === 0) {
            for (var i = 0; i < roids.length; i++) {
                if (distBetweenPoints(ship.x, ship.y, roids[ i ].x, roids[ i ].y) < ship.r + roids[ i ].r) {
                    explodeShip();
                }
            }
        }

        // rotate ship
        ship.a += ship.rot;

        // move the ship
        ship.x += ship.thrust.x;
        ship.y += ship.thrust.y;
    }
    else {
        ship.explodeTime--;

        if (ship.explodeTime === 0) {
            ship = newShip();
        }
    }

    // thrusting
    if (ship.thrusting) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;

        // draw the thruster
        if (!exploding && blinkOn) {
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = SHIP_SIZE / 10;
            ctx.beginPath();
            ctx.moveTo( // rear left
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
            );
            ctx.lineTo( // rear center behind ship
                ship.x - ship.r * 6 / 3 * Math.cos(ship.a),
                ship.y + ship.r * 6 / 3 * Math.sin(ship.a)
            );
            ctx.lineTo( // ships rear right
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
            );
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    }
    else {
        ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
        ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
    }

    // handle screen edge
    if (ship.x < 0 - ship.r) ship.x = canv.width + ship.r;
    else if (ship.x > canv.width + ship.r) ship.x = 0 - ship.r;

    if (ship.y < 0 - ship.r) ship.y = canv.height + ship.r;
    else if (ship.y > canv.height + ship.r) ship.y = 0 - ship.r;

    // move the lasers
    for (var i = ship.lasers.length -1; i >= 0; i--) {

        // check traveled dis
        if (ship.lasers[ i ].dist > LASER_DIST * canv.width) {
            ship.lasers.splice(i, 1);
            continue;
        }

        // move lasers
        ship.lasers[ i ].x += ship.lasers[ i ].xv;
        ship.lasers[ i ].y += ship.lasers[ i ].yv;

        // calculate dist traveled
        ship.lasers[ i ].dist += Math.sqrt(Math.pow(ship.lasers[ i ].xv, 2) + Math.pow(ship.lasers[ i ].yv, 2));

        // handle edge of the screen
        if (ship.lasers[ i ].x < 0) ship.lasers[ i ].x = canv.width;
        else if (ship.lasers[ i ].x > canv.width) ship.lasers[ i ].x = 0;

        if (ship.lasers[ i ].y < 0) ship.lasers[ i ].y = canv.height;
        else if (ship.lasers[ i ].y > canv.height) ship.lasers[ i ].y = 0;
    }

    // move asteroid
    for (var i = 0; i < roids.length; i++) {
        roids[ i ].x += roids[ i ].xv;
        roids[ i ].y += roids[ i ].yv;

        // handle edge of screen
        if (roids[ i ].x < 0 - roids[ i ].r) roids[ i ].x = canv.width + roids[ i ].r;
        else if (roids[ i ].x > canv.width + roids[ i ].r) roids[ i ].x = 0 - roids[ i ].r;

        if (roids[ i ].y < 0 - roids[ i ].r) roids[ i ].y = canv.height + roids[ i ].r;
        else if (roids[ i ].y > canv.height + roids[ i ].r) roids[ i ].y = 0 - roids[ i ].r;
    }
}
