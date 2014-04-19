
module.exports = function (app) {
	app.get('/', function (req) {
        if (!req.logout) {
            return req.redirect('/');
        }

        req.logout();
    });
};