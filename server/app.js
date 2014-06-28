var express  = require('express'),
    initialize = require('express-initializers'),
    logger = require('./logger'),

    app = express();

logger.profile('startup');
// Let the initializers run
initialize(app)
    .then(function () {
        // Start listening for requests
        app.listen(app.get('port'), function () {
            console.log('Now listening on port ' + app.get('port'));
        });
    })
    .catch(function (err) {
        console.log('Unable to initialize app: ' + err.message);
        console.log(err.stack);
    })
    .finally(function () {
        logger.profile('startup');
    });

module.exports = app;
