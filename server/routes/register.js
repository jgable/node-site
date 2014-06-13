
var _ = require('lodash');

var User = require('../models/user');

module.exports = function (app) {
    app.post('/', function (req, res) {
        var username = req.param('username'),
            password = req.param('password');

        var newUser = User.build({
            username: username
        });

        var errors = newUser.validate();

        if (password.length < 6 || password.length > 128) {
            errors = errors || {};
            errors.password = 'Password must be between 6 and 128 characters';
        }

        if (errors) {
            return res.json({
                error: errors.username || errors.password || 'Unknown validation error'
            });
        }

        User.register(newUser, password, function (err, registeredUser) {
                if (err) {
                    return res.json({
                        error: 'Unable to register at this time.'
                    });
                }

                // Generate a token for the user on registration
                registeredUser.generateToken()
                    .success(function (savedUser) {
                        req.login(savedUser, function (err) {
                            if (err) {
                                return res.json({
                                    error: 'Unable to log in at this time'
                                });
                            }

                            return res.json({
                                user: _.pick(savedUser.values, 'id', 'username', 'createdAt', 'updatedAt'),
                                ref: req.param('ref')
                            });
                        });
                    })
                    .error(function () {
                        res.json({
                            error: 'Unable to generate token at this time.'
                        });
                    });
            });
    });
};