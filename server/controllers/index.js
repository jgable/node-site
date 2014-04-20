'use strict';

module.exports = function (app) {
    // The default route for the server
    app.get('/', function (req, res) {
        res.render('index', {
            user: req.user
        });
    });
};