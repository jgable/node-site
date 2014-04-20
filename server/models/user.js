
var Sequelize = require('sequelize'),
    sequelize = require('./db').instance,
    passportLocalSequelize = require('passport-local-sequelize');

var User = passportLocalSequelize.defineUser(sequelize, {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [6, 128],
                msg: 'Username must be between 6 and 128 characters in length'
            },
            isEmail: {
                msg: 'Email address must be valid'
            }
        },
    }
});

module.exports = User;