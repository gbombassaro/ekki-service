const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express();
mongoose.connect('mongodb+srv://geral:geral@mongo-next.waaaw.mongodb.net/mongo-next?retryWrites=true&w=majority', {useNewUrlParser: true})

server.use(express.json());
server.use(routes);
server.listen(3001);