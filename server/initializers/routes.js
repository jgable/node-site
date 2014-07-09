
var path = require('path'),
    enrouten = require('express-enrouten');

module.exports = {
    name: 'routes',
    after: 'passport',

    configure: function (app) {
        // Setup the page routing
        app.use(enrouten({
            directory: path.join(__dirname, '..', 'routes')
        }));
    }
};
