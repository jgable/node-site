
var path = require('path'),
    favicon = require('serve-favicon');

module.exports = {
    configure: function (app) {
        // Set the favicon
        app.use(favicon(path.join(__dirname, '..', '..', 'favicon.ico')));
    }
};
