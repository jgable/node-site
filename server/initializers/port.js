
var port = process.env.PORT || 3000;

module.exports = {
    configure: function (app) {
        app.set('port', port);
    }
};