
var passport = require('passport'),
    User = require('../models/user');

module.exports = {
    name: 'passport',
    after: 'session',

    configure: function (app) {
        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(User.createStrategy());
        passport.use(User.createTokenStrategy());

        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
    }
};
