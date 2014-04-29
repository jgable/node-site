
var passport = require('passport');

module.exports = function (app) {
    app.get('/', function (req, res) {
        if (req.isAuthenticated()) {
            return res.redirect('/home');
        }

        res.render('login', {
            user: req.user,
            ref: req.param('ref')
        });
    });

    app.post('/', function (req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (err) { return next(err); }

            if (!user) {
                return res.json({
                    error: 'Invalid user name or password'
                });
            }

            req.login(user, function (err) {
                if (err) {
                    return res.json({
                        error: 'Unable to log in at this time'
                    });
                }

                return res.json({
                    user: user,
                    ref: req.param('ref')
                });
            });
        })(req, res, next);
    });
};