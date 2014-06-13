
var passport = require('passport');

module.exports = {
	ensureAuthenticated: function (ref) {
		ref = ref || 'home';

		return function (req, res, next) {
			// If this is a request from a logged in user
			if (req.isAuthenticated()) {
				return next();
			} else if (req.get('x-token') || req.query.token) {
				// If this is an API request with a token
				return passport.authenticate('token')(req, res, next);
			}

			res.redirect('/login?ref=' + ref);
		};
	}
};