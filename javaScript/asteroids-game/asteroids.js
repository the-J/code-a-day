/**
 * Created by juliusz.jakubowski@gmail.com on 08.11.18.
 */

const FPS = 30; // frames per second
const SHIP_SIZE = 30; // ship height in px
const TURN_SPEED = 360; // rotate speed in deg / sec
const SHIP_THRUST = 5; // acceleration of ship px / sec / sec
const FRICTION = 0.7; // friction coefficient of space ( 0 = no, 1 = lost)
const ROIDS_NUM = 3; // starting num of asteroids
const ROIDS_SIZE = 100; // starting size in px
const ROIDS_SPD = 50; // max starting speed od asteroids in px / sec
const ROIDS_VERT = 10; // average numb of vertices on each asteroid
const ROIDS_JAG = 0.4; // jaggednes of the asteroids 0 = none
const SHOW_HIDE_SHIPS_CENTER_DOT = false;

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

// asteroids
var roids = [];
createAsteroidBelt();

// setup game loop
setInterval(update, 1000 / FPS);

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

function distBetweenPoints( x1, y1, x2, y2 ) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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

    // draw asteroids
    ctx.strokeStyle = 'slategrey';
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
            ctx.lineTo(
                x + r * offs[ j ] * Math.cos(a + j * Math.PI * 2 / vert),
                y + r * offs[ j ] * Math.sin(a + j * Math.PI * 2 / vert)
            );
        }
        ctx.closePath();
        ctx.stroke();

        // move asteroid
        roids[ i ].x += roids[ i ].xv;
        roids[ i ].y += roids[ i ].yv;

        // handle edge of screen
        if (roids[ i ].x < 0 - roids[ i ].r) roids[ i ].x = canv.width + roids[ i ].r;
        else if (roids[ i ].x > canv.width + roids[ i ].r) roids[ i ].x = 0 - roids[ i ].r;

        if (roids[ i ].y < 0 - roids[ i ].r) roids[ i ].y = canv.height + roids[ i ].r;
        else if (roids[ i ].y > canv.height + roids[ i ].r) roids[ i ].y = 0 - roids[ i ].r;
    }

    // center dot
    if (SHOW_HIDE_SHIPS_CENTER_DOT) {
        ctx.fillStyle = 'red'; // center ship dot
        ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
    }

    // rotate ship
    ship.a += ship.rot;

    // thrust and move the ship
    if (ship.thrusting) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;

        // draw the thruster
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
    else {
        ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
        ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
    }

    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;

    // handle screen edge
    if (ship.x < 0 - ship.r) ship.x = canv.width + ship.r;
    else if (ship.x > canv.width + ship.r) ship.x = 0 - ship.r;

    if (ship.y < 0 - ship.r) ship.y = canv.height + ship.r;
    else if (ship.y > canv.height + ship.r) ship.y = 0 - ship.r;
}
