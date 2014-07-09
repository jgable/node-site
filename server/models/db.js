
var _ = require('lodash'),
    Sequelize = require('sequelize'),
    dbConfig = require('config').Database,
    logger = require('../logger');

var serverConfig = _.merge(dbConfig.server, {
    logging: logger.debug
});

var db = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.pass, serverConfig);

module.exports = {
    instance: db,
    init: function (done) {
        var sync = this.sync;
        // Authenticate the db
        db.authenticate()
            .complete(function (err) {
                if (err) {
                    return done(err);
                }

                // Synchronize the db
                sync(done);
            });
    },
    sync: function (done) {
        db.sync()
            .complete(function (err) {
                if (err) {
                    return done(err);
                }

                done();
            });
    }
};