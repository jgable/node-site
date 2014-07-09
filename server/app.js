var http = require('http'),
    express  = require('express'),
    initialize = require('express-initializers'),
    logger = require('./logger'),

    app = express();

// Increase the global maxSockets value
http.globalAgent.maxSockets = 1000;

logger.profile('startup');
// Let the initializers run
initialize(app)
    .catch(function (err) {
        logger.error('Unable to initialize app: ' + err.message);
        logger.error(err.stack);
    })
    .finally(function () {
        logger.profile('startup');
    });

module.exports = app;
