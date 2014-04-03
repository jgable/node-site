var path     = require('path'),
    express  = require('express'),
    enrouten = require('express-enrouten'),
    exphbs   = require('express3-handlebars'),

    app = express(),
    hbs,
    port = process.env.PORT || 3000;

app.set('port', port);

// Set up the handlebars view engine
hbs = exphbs.create({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: path.join(__dirname, 'views', 'layouts', 'layout.stache'),
    extname: '.stache',
    // Specify helpers here
    helpers: {
        foo: function () { return 'FOO!'; },
        bar: function () { return 'BAR!'; }
    }
});
app.engine('.stache', hbs.engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.stache');

// Setup the client side static assets in the client folder
app.use(express.static(path.join(__dirname, '..', 'build')));

// Setup the page routing
app.use(enrouten({
    directory: 'server/controllers'
}));

// Start the app
if (!module.parent) {
    app.listen(app.get('port'), function () {
        console.log('Now listening on port ' + app.get('port'));
    });
}

module.exports = app;
