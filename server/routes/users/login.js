const User = require('./models/user.js');
const config = require('../../config.js');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');

module.exports = (req, res) => {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if(!user) {
            res.status(401).json({ success: false, message: 'Authentication failed. Invalid username or password.' });
            console.log('FAILED -- user not found.');
        } else if (user) {
            if (!passwordHash.verify(req.body.password, user.password)) {
                res.status(401).json({ success: false, message: 'Authentication failed. Invalid username or password.' });
                console.log('FAILED -- password isn\'t the same.');
            } else {
                // getting rid of the password field so we don't transmit that freely
                user = user.toObject();
                delete user['password'];

                // generate token with expire time of half an hour
                var token = jwt.sign(user, config.secret, { 
                    expiresIn: 604800 // 1 week
                });

                //console.log(token);
                res.json({
                    success: true,
                    token: token,
                    username: user.username,
                    email: user.email
                });
            }
        }
    });
};
