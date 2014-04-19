
var passport = require('passport'),
    User = require('../models/user');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('login');
    });

    app.post('/', passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login?reason=incorrect'
    }));
};