
var Sequelize = require('sequelize'),
    dbConfig = require('config').Database;

var db = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.pass, dbConfig.server);

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