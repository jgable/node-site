var path     = require('path'),
    express  = require('express'),

    cookieParser = require('cookie-parser'),

    bodyParser = require('body-parser'),

    passport = require('passport'),
    session  = require('express-session'),
    enrouten = require('express-enrouten'),
    exphbs   = require('express3-handlebars'),
    db = require('./models/db'),
    User = require('./models/user'),

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

app.use(bodyParser());
app.use(require('connect-multiparty')());
app.use(cookieParser());
app.use(session({ secret: 'super-secret' }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Setup the client side static assets in the client folder
app.use(express.static(path.join(__dirname, '..', 'build')));

// Setup the page routing
app.use(enrouten({
    directory: path.join(__dirname, 'controllers')
}));

if (!module.parent) {
    // Start the db connection
    db.init(function (err) {
        if (err) {
            throw new Error('Failed to initialize database: ' + err.message);
        }

        app.set('db', db.instance);

        // Start listening for requests
        app.listen(app.get('port'), function () {
            console.log('Now listening on port ' + app.get('port'));
        });
    });
}

module.exports = app;
