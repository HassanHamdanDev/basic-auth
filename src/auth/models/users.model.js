'use strict';

const userSchema = (sequelize, DataTypes) => sequelize.define('users', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = userSchema;