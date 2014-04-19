
var User = require('../models/user');

module.exports = function (app) {
	app.get('/', function (req, res) {
		res.render('register');
	});

	app.post('/', function (req, res) {
		var username = req.param('username'),
			password = req.param('password');

		console.log('register', username, password);

		var newUser = User.build({
			username: username,
			password: password
		});

		var errors = newUser.validate();

		if (errors) {
			console.log('register errors', errors);
			return res.render('register', {
				errors: errors
			});
		}

		newUser.save()
			.success(function (savedUser) {
				console.log('register saved', savedUser);
				req.login(savedUser, function (err) {
					if (err) {
						return res.render('register', {
							failed: 'login'
						});
					}

					console.log('register redirect', username, password);
					res.redirect('/home');
				});
			})
			.error(function (err) {
				console.log('register error', err.message);
				res.render('register', {
					failed: 'save',
					message: err.message
				});
			});
	});
}