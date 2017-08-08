// imports
var mongoose = require('mongoose'),
    db;
const config = require('./config.js');
const bodyParser = require('body-parser');
const path = require('path');
//const morgan = require('morgan');
const express = require('express');


// constants
const app = express();
const routes = require('./routes');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// path to serve our angular static content
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(morgan('dev'));
app.use(express.static('public'))


app.set('superSecret', config.secret);


// Turn on that server!
app.listen(8080, () => {
    console.log('App listening on port 8080');
});

//  Connect all our routes to our application
app.use('/api', routes);
// ---- paths for AngularJS Routes -----
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});
//--- paths for AngularJS Routes -----

app.use(function(req, res, next){
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});
