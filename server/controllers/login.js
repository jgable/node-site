
var passport = require('passport');

module.exports = function (app) {
    app.get('/', function (req, res) {
        if (req.isAuthenticated()) {
            return res.redirect('/home');
        }

        res.render('login', {
            user: req.user,
            ref: req.param('ref'),
            pageScripts: ['login']
        });
    });

    app.post('/', function (req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (err) { return next(err); }

            if (!user) {
                return res.render('login', {
                    user: req.user,
                    username: req.param('username'),
                    password: req.param('password'),
                    ref: req.param('ref'),
                    loginError: 'Invalid user name or password',
                    pageScripts: ['login']
                });
            }

            req.login(user, function (err) {
                if (err) {
                    return res.render('login', {
                        user: req.user,
                        username: req.param('username'),
                        password: req.param('password'),
                        ref: req.param('ref'),
                        loginError: 'Unable to log in at this time.',
                        pageScripts: ['login']
                    });
                }

                if (req.param('ref')) {
                    // TODO: Verify local refer not external
                    return res.redirect(req.param('ref').replace('http', '').replace('.', '-'));
                }

                res.redirect('/home');
            });
        })(req, res, next);
    });
};