
module.exports = {
	ensureAuthenticated: function (ref) {
		ref = ref || 'home';

		return function (req, res, next) {
			if (req.isAuthenticated()) {
				return next();
			}

			res.redirect('/login?ref=' + ref);
		};
	}
};