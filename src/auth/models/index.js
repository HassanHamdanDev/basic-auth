'use strict';

const POSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');

let sequlizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

let sequelize = new Sequelize(POSTGRES_URL, sequlizeOptions);

const userSchema = require('./users.model');
const userModel = userSchema(sequelize, DataTypes);
const Collection = require('./lib/collection-class.model');
const userCollection = new Collection(userModel);

module.exports = {
    db: sequelize,
    userCollection: userCollection
}