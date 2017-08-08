const routes = require('express').Router();
const users = require('./users');
const inventory = require('./inventory');
const customers = require('./customers');

routes.use('/users', users);
routes.use('/inventory', inventory);
routes.use('/customers', customers);

module.exports = routes;