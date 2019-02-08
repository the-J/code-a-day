const jwt = require('jsonwebtoken');
const config = require('config');

function auth( req, res, next ) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No token provided');

    try {
        // return decoded payload or exception
        req.user = jwt.verify(token, config.get('jwtPrivateKey'));
        next();
    } catch (ex) {
        res.status(400).send('Invalid auth token');
    }
}

module.exports = auth;
