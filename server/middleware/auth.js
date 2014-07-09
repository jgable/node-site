
var passport = require('passport');

module.exports = {
	ensureAuthenticated: function () {
		return function (req, res, next) {
			// If this is a request from a logged in user
			if (req.isAuthenticated()) {
				return next();
			} else if (req.get('x-token') || req.query.token) {
				// If this is an API request with a token
				return passport.authenticate('token', { session: false })(req, res, next);
			}

			res.send(401, 'Unauthorized');
		};
	}
};