const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const server = express();
mongoose.connect('mongodb+srv://geral:geral@mongo-next.waaaw.mongodb.net/mongo-next?retryWrites=true&w=majority', {useNewUrlParser: true})

server.use(express.json());
server.use(router);
server.listen(3001);