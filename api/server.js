const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const { restricted } = require('../auth/restricted');
const userRouter = require('../users/user-router')
const configureRoutes = require('../config/routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

configureRoutes(server);
server.use("/api/users", userRouter);

module.exports = server;
