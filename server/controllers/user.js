
var ensureAuthenticated = require('../middleware/auth').ensureAuthenticated;

module.exports = function (app) {
	app.get('/', ensureAuthenticated('user'), function (req, res) {
		res.render('user', {
			user: req.user.values,
		});
	});
};