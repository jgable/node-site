var gracefulExit = require('express-graceful-exit'),
    logger = require('../logger');

module.exports = {
    configure: function (app) {
        app.use(gracefulExit.middleware(app));

        // Support for naught clustering (shutdown)
        process.on('message', function (message) {
            if (message !== 'shutdown') {
                return;
            }
            
            var db = app.get('db'),
                httpServer = app.get('httpServer');

            if (db) {
                // Disconnect from db
                db.connectorManager.disconnect();
            }

            gracefulExit.gracefulExitHandler(app, httpServer, {
                log: true,
                logger: logger.info
            });
        });
    }
};
