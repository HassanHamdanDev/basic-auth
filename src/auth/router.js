'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const { userCollection } = require('./models/index');
const basicAuth = require('./middleware/basic-auth');
const usersRouter = express.Router();

usersRouter.post('/signUp', signUpFunction);
usersRouter.post('/login', basicAuth, loginFunction);

async function signUpFunction(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5);
        const obj = req.body;
        const user = await userCollection.create(obj);
        res.status(201).json(user);
        // next();
    } catch (erorr) {
        res.status(403).send('Error occurd');
    }
}

async function loginFunction(req, res) {
    res.status(200).json(req.user);
}

module.exports = usersRouter;

