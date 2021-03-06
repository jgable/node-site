
var db = require('../models/db'),
    Prom = require('bluebird');

module.exports = {
    configure: function (app) {
        return new Prom(function (resolve, reject) {
            // Start the db connection
            db.init(function (err) {
                if (err) {
                    return reject(new Error('Failed to initialize database: ' + err.message));
                }

                // Sync all the associations
                db.sync(function (err) {
                    if (err) {
                        return reject(new Error('Failed to sync database: ' + err.message));
                    }

                    app.set('db', db.instance);

                    resolve();
                });
            });
        });
    }
};