
var cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    multiParty = require('connect-multiparty');

module.exports = {
    name: 'parsers',
    after: 'views',

    configure: function (app) {
        app.use(bodyParser());
        app.use(multiParty());
        app.use(cookieParser());
    }
};
