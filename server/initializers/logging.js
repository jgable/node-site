var morgan = require('morgan');

module.exports = {
	name: 'logging',

	configure: function (app) {
		app.use(morgan('dev'));
	}
};
