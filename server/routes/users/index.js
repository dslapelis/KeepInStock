const users = require('express').Router();
const register = require('./register.js');
const login = require('./login');
const refresh = require('./refresh-token.js');
const jwt = require('jsonwebtoken');

users.post('/register', register);

users.post('/login', login);

users.get('/refresh', refresh);

module.exports = users;
