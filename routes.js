const express = require('express');
const {createUser, listUsers} = require('./server/controllers/user');
const {newTransaction} = require('./server/controllers/transaction');

const routes = express.Router();

routes.get('/api/user/list', listUsers);
routes.post('/api/user/create', createUser);

routes.post('/api/transaction/new', newTransaction);

module.exports = routes;