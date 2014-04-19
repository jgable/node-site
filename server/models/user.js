
var Sequelize = require('sequelize'),
    sequelize = require('./db').instance,
    passportLocalSequelize = require('passport-local-sequelize');

var User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    accountType: {
        type: Sequelize.STRING,
        defaultValue: 'local',
        allowNull: false,
    },
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
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 128],
                msg: 'Password must be between 6 and 128 characters in length'
            }
        }
    }
});

passportLocalSequelize(User);

module.exports = User;