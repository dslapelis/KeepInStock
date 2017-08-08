const customers = require('express').Router();
const add = require('./add.js');
const edit = require('./edit.js');
const list = require('./list.js');
const remove = require('./remove.js');
const config = require('../../config.js');
const jwt = require('jsonwebtoken');

// route middleware to verify a token
customers.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var tokenHeader = req.headers['authorization'];
  var token = tokenHeader.replace('Bearer ', '');
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});

customers.post('/add', add);

customers.post('/edit', edit);

//inventory.post('/remove', remove);

//inventory.get('/list', list);

module.exports = customers;
