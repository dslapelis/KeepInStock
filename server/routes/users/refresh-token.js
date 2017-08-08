const jwt = require('jsonwebtoken');
const config = require('../../config.js');
var User = require('./models/user.js');


module.exports = (req, res) => {
    var tokenHeader = req.headers['authorization'];
    var token = tokenHeader.replace('Bearer ', '');
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                console.log('TOKEN ERROR: ' + err);
                // Check to see if the token is expired, or if it's just bullshit
                if(err.name == 'TokenExpiredError' && (err.expiredAt <= new Date() - 3)) {
                    // looks like it's just expired. let's check to see if the user still exists
                    token = jwt.decode(token);
                    var uid = token._id;

                    var user = User.findOne({
                        _id: uid
                    }, function(err, user) {
                        if(user)
                        {   
                            // they exist so we return a fresh-baked token
                            user = user.toObject();
                            delete user['password'];
                            token = jwt.sign(user,config.secret, {
                                expiresIn: 604800
                            });

                            res.json({
                                success: true, 
                                token: token,
                                expiresIn: 604800
                            });
                        } else{
                            // user no longer exists. adios.
                            res.status(403).json({success: false});
                        }
                    });
                }
                else
                {
                    // it's a bullshit token
                    res.status(403).json( {success: false} );
                }
            }   else {
                // token is still valid. carry on.
                res.json({token: token});
            }
        });
    } else {
        // user didn't give us a token.
        return res.status(403).send({
            success: false
        });

    }
};