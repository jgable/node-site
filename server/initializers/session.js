
var session = require('express-session'),
    SequelizeStore = require('connect-session-sequelize')(session.Store),
    db = require('../models/db');

module.exports = {
    name: 'session',
    after: 'parsers',

    configure: function (app) {
        app.use(session({
            store: new SequelizeStore({
                db: db.instance
            }),
            secret: 'super-secret'
        }));
    }
};
