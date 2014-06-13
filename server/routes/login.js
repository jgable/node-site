
var _ = require('lodash'),
    passport = require('passport'),
    auth = require('../middleware/auth');

module.exports = function (app) {
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
                    user: _.pick(user.values, 'id', 'username', 'createdAt', 'updatedAt'),
                    ref: req.param('ref')
                });
            });
        })(req, res, next);
    });

    app.get('/validate', auth.ensureAuthenticated(), function (req, res) {
        res.json({
            success: true,
            timestamp: Date.now(),
            user: _.omit(req.user.values, 'hash', 'salt', 'activationKey', 'resetPasswordKey')
        });
    });
};