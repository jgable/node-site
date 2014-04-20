
var User = require('../models/user');

module.exports = function (app) {
    app.get('/', function (req, res) {
        if (req.isAuthenticated()) {
            var ref = req.param('ref') || 'home';
            return res.redirect('/' + ref);
        }

        res.render('register', {
            ref: req.param('ref'),
            pageScripts: ['register']
        });
    });

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
            return res.render('register', {
                ref: req.param('ref'),
                username: username,
                password: password,
                registerError: errors.username || errors.password || 'Unknown validation error',
                pageScripts: ['register']
            });
        }

        User.register(newUser, password, function (err, savedUser) {
                if (err) {
                    return res.render('register', {
                        ref: req.param('ref'),
                        registerError: 'Unable to register at this time.',
                        pageScripts: ['register']
                    });
                }

                req.login(savedUser, function (err) {
                    if (err) {
                        return res.render('register', {
                            ref: req.param('ref'),
                            registerError: 'Unable to log in at this time',
                            pageScripts: ['register']
                        });
                    }

                    var ref = req.param('ref') || 'home';
                    res.redirect('/' + ref);
                });
            });
    });
};