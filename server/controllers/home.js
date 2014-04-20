
var ensureAuthenticated = require('../middleware/auth').ensureAuthenticated;

module.exports = function (app) {
    app.get('/', ensureAuthenticated('home'), function (req, res) {
        res.render('home', {
            user: req.user
        });
    });
};