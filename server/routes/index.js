'use strict';

var _ = require('lodash'),
    auth = require('../middleware/auth');

module.exports = function (app) {
    var pageRoutes = [
            '/',
            '/login',
            '/register',
            '/forgotpassword',
            '/forgotpassword/reset/:resetKey',
            '/home'
        ],
        authenticatedRoutes = [
            '/user'
        ],
        renderIndexPage = function (req, res) {
            if (!req.user) {
                return res.render('index');
            }

            res.render('index', {
                user: JSON.stringify(_.pick(req.user.values, 'id', 'username', 'createdAt', 'updatedAt'))
            });
        };

    pageRoutes.forEach(function (route) {
        app.get(route, renderIndexPage);
    });

    authenticatedRoutes.forEach(function (route) {
        app.get(route, auth.ensureAuthenticated(), renderIndexPage);
    });
};