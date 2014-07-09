
var User = require('../models/user'),
    _ = require('lodash'),
    mailer = require('nodemailer'),
    config = require('config'),
    siteConfig = config.Site,
    mailConfig = config.Mail;

var sendMail = function (mailData, done) {
    var transport = mailer.createTransport(mailConfig.transport, mailConfig.server);

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

            // TODO: Load SSL status from config
            var siteUrl = 'http://' + siteConfig.domain,
                messageOpts = {
                    from: 'Retriever of Lost Passwords <donotreply@' + mailConfig.domain + '>',
                    to: resettedUser.username,
                    subject: 'Your password misses you',
                    text: 'Looks like you need a new password, follow the link below to make that happen: \n\n' +
                            siteUrl + '/forgotpassword/reset/' + resettedUser.resetPasswordKey + ' \n\n' +
                            'Have an awesome day!'
                };

            sendMail(messageOpts, function (err) {
                if (err) {
                    return res.json({
                        error: 'An error occurred sending the email: ' + err.message
                    });
                }

                res.send(200);
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