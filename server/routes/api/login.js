
var _ = require('lodash'),
    passport = require('passport'),
    auth = require('../../middleware/auth');

module.exports = function (router) {
    router.post('/', function (req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (err) { return next(err); }

            if (!user) {
                return res.json({
                    success: false,
                    message: 'Invalid user name or password'
                });
            }

            res.json({
                success: true,
                message: 'Success',
                user: _.pick(user.values, 'id', 'username', 'token', 'createdAt', 'updatedAt'),
            });
        })(req, res, next);
    });

    router.get('/validate', auth.ensureAuthenticated(), function (req, res) {
        res.json({
            success: true,
            timestamp: Date.now(),
            user: _.pick(req.user.values, 'id', 'username', 'token', 'createdAt', 'updatedAt')
        });
    });
};
