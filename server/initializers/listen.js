
var Prom = require('bluebird'),
    logger = require('../logger');

module.exports = {
    name: 'listen',
    after: 'routes',

    configure: function (app) {
        return new Prom(function (resolve) {
            // Start listening for requests
            var httpServer = app.listen(app.get('port'), function () {
                logger.info('Now listening on port ' + app.get('port'));

                // For referencing later if necessary
                app.set('httpServer', httpServer);

                // Support for naught clustering (startup)
                if (process.send) { process.send('online'); }

                resolve();
            });
        });
    }
};
