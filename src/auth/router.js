'use strict';

const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcrypt');
const { userCollection } = require('./models/index');
const basicAuth = require('./middleware/basic-auth');

usersRouter.post('/signUp', signUpFunction);
usersRouter.post('/login', basicAuth, loginFunction);

async function signUpFunction(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5);
        const obj = req.body;
        // console.log(obj);
        const user = await userCollection.create(obj);
        // console.log(user);
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

