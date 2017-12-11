var jwt = require('jsonwebtoken');
var config = require('../../config');

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token){
    	console.log("no token provided");
        res.locals.userId = null;
        return next();
    }
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err){
        	console.log("Auth Error");
        	// return;
             return res.status(500).send({ auth: false, message: 'Unauthorized token.' });
        }
        res.locals.userId = decoded.id;
        return next();
    });
}

module.exports = verifyToken;