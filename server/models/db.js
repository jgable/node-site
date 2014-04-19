
var Sequelize = require('sequelize');

var db = new Sequelize('site-db', 'user', 'pass', {
    dialect: 'sqlite',

    storage: 'site-db.sqlite'
});

module.exports = {
    instance: db,
    init: function (done) {
        // Authenticate the db
        db.authenticate()
            .complete(function (err) {
                if (err) {
                    return done(err);
                }

                // Synchronize the db
                db.sync()
                    .complete(function (err) {
                        if (err) {
                            return done(err);
                        }

                        done();
                    });
            });
    }
};