
var path = require('path'),
    exphbs = require('express3-handlebars');

function getAssetsHash() {
    var hash = {};

    try {
        hash = require('../assets.json');
    } catch (e) {
        hash = {};
    }

    return hash;
}

module.exports = {
    name: 'views',
    after: 'static',

    configure: function (app) {
        var assets = getAssetsHash();

        // Specify additional helpers here
        var helpers = {
            asset: function (file) {
                return assets[file] || '';
            }
        };

        // Set up the handlebars view engine
        var hbs = exphbs.create({
            layoutsDir: path.join(__dirname, '..', 'views', 'layouts'),
            partialsDir: path.join(__dirname, '..', 'views', 'partials'),
            defaultLayout: path.join(__dirname, '..', 'views', 'layouts', 'layout.stache'),
            extname: '.stache',
            helpers: helpers
        });
        app.engine('.stache', hbs.engine);

        app.set('views', path.join(__dirname, '..', 'views'));
        app.set('view engine', '.stache');
    }
};
