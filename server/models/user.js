
var Sequelize = require('sequelize'),
    hat = require('hat'),
    TokenStrategy = require('passport-token').Strategy,
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
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    defineOptions: {
        instanceMethods: {
            generateToken: function () {
                this.token = hat();

                return this.save(['token']);
            }
        },

        classMethods: {
            findByToken: function (token) {
                return this.find({
                    where: {
                        token: token
                    }
                });
            },

            createTokenStrategy: function () {
                var self = this,
                    strategyOpts = {
                        // Hard coding these to be same as token so only token is required
                        usernameHeader: 'x-token',
                        usernameField: 'token'
                    };

                // A simple token only strategy
                return new TokenStrategy(strategyOpts, function (username, token, done) {
                    self.findByToken(token)
                        .success(function (found) {
                            if (!found) {
                                return done(null, false);
                            }

                            done(null, found);
                        })
                        .error(function (err) {
                            done(err);
                        });
                });
            }
        }
    }
});

module.exports = User;