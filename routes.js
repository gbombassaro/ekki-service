const express = require('express');
const {createUser, listUsers, getUser} = require('./server/controllers/user');
const {newTransaction} = require('./server/controllers/transaction');

const routes = express.Router();

routes.post('/api/user/create', createUser);
routes.get('/api/user/list', listUsers);
routes.get('/api/user', getUser);

routes.post('/api/user/beneficiary', getUser);
routes.put('/api/user/beneficiary', getUser);
routes.delete('/api/user/beneficiary', getUser);

routes.post('/api/transaction/new', newTransaction);

module.exports = routes;