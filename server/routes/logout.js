
module.exports = function (app) {
    app.get('/', function (req, res) {
        if (req.logout) {
            req.logout();
        }

        res.redirect('/');
    });
};