
var path = require('path'),
    exphbs = require('express3-handlebars');

module.exports = {
    name: 'views',
    after: 'static',

    configure: function (app) {
        // Set up the handlebars view engine
        var hbs = exphbs.create({
            layoutsDir: path.join(__dirname, '..', 'views', 'layouts'),
            partialsDir: path.join(__dirname, '..', 'views', 'partials'),
            defaultLayout: path.join(__dirname, '..', 'views', 'layouts', 'layout.stache'),
            extname: '.stache',
            // Specify helpers here
            helpers: {
                foo: function () { return 'FOO!'; },
                bar: function () { return 'BAR!'; }
            }
        });
        app.engine('.stache', hbs.engine);

        app.set('views', path.join(__dirname, '..', 'views'));
        app.set('view engine', '.stache');
    }
};
