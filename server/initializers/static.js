
var path = require('path'),
    express = require('express');

module.exports = {
    name: 'static',
    after: 'favicon',

    configure: function (app) {
        // Setup the client side static assets in the client folder
        app.use(express.static(path.join(__dirname, '..', '..', 'build')));
    }
};
