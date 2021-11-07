'use strict';

const express = require('express');
require('dotenv').config();
const server = express();
const PORT = process.env.PORT || 3004;

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');




server.use(express.json());

server.use('*', notFoundHandler);
server.use(errorHandler);




function start() {
    server.listen(PORT, () => {
        console.log(`Server Listening on ${PORT}`);
    });
}

module.exports = {
    server: server,
    start: start,
}