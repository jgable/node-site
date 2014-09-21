'use strict';

var _ = require('lodash'),
    debug = require('config').Site.debug,
    auth = require('../middleware/auth'),
    assetsHash = require('../assets.json');

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
            var templateData = {
                debug: debug
            };

            if (!req.user) {
                return res.render('index', templateData);
            }

            res.render('index', _.extend(templateData, {
                user: JSON.stringify(_.pick(req.user.values, 'id', 'username', 'createdAt', 'updatedAt')),
                assets: JSON.stringify(assetsHash),
            }));
        };

    pageRoutes.forEach(function (route) {
        app.get(route, renderIndexPage);
    });

    authenticatedRoutes.forEach(function (route) {
        app.get(route, auth.ensureAuthenticated(), renderIndexPage);
    });
};