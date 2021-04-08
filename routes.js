const express = require('express');
const {createUser, listUsers} = require('./server/controllers/user');

const routes = express.Router();

routes.get('/api/user/list', listUsers);
routes.post('/api/user/create', createUser);

module.exports = routes;