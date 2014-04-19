
var passport = require('passport');

module.exports = function (app) {
	app.get('/', passport.authenticate('local', {
		failureRedirect: '/login?ref=/home'
	}), function (req, res) {
		res.render('home');
	});
};