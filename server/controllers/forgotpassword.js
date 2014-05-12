
var User = require('../models/user'),
    _ = require('lodash'),
    mailer = require('nodemailer');

var sendMail = function (mailData, done) {
    var transport = mailer.createTransport('direct');

    transport.sendMail(mailData, done);
};

module.exports = function (app) {
    app.post('/', function (req, res) {
        User.setResetPasswordKey(req.param('username'), function (err, resettedUser) {
            if (err) {
                return res.json({
                    error: 'Unable to set reset password key: ' + err.message
                });
            }

            console.log('sendmail', resettedUser.username, resettedUser.get('username'));

            // TODO: Load from config
            var siteUrl = 'localhost:3000',
                messageOpts = {
                    from: 'donotreply@node-site.com',
                    to: resettedUser.username,
                    subject: 'Reset Password Link',
                    text: 'Looks like you need a new password, follow the link below to make that happen: \n\n' +
                            'http://' + siteUrl + '/forgotpassword/reset/' + resettedUser.resetPasswordKey + ' \n\n' +
                            'Have an awesome day!'
                };

            sendMail(messageOpts, function (err, response) {
                if (err) {
                    return res.json({
                        error: 'An error occurred sending the email: ' + err.message
                    });
                }

                var timeoutHandler,
                    sendSuccess = function () {
                        clearTimeout(timeoutHandler);
                        res.send(200);
                    };

                response.statusHandler.once('sent', sendSuccess);
                response.statusHandler.once('requeued', sendSuccess);

                response.statusHandler.once('failed', function () {
                    clearTimeout(timeoutHandler);
                    res.json({
                        error: 'Failed to send the reset password email.'
                    });
                });

                timeoutHandler = setTimeout(function () {
                    res.json({
                        error: 'Failed to send the reset password email in a timely manner.'
                    });
                }, 60000);
            });
        });
    });

    app.post('/reset', function (req, res) {
        var resetKey = req.param('resetKey'),
            username = req.param('username'),
            password = req.param('password');

        User.resetPassword(username, password, resetKey, function (err, resettedUser) {
            if (err) {
                return res.json({
                    error: err.message
                });
            }

            req.login(resettedUser, function (err) {
                if (err) {
                    return res.json({
                        error: 'Unable to log in at this time'
                    });
                }

                return res.json({
                    user: _.pick(resettedUser.values, 'id', 'username', 'createdAt', 'updatedAt')
                });
            });
        });
    });
};