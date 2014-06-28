
var winston = require('winston'),
    loggingCfg = require('config').Logging;

var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: loggingCfg.level
        }),
        /*
        new winston.transports.File({
            filename: 'somefile.log'
        })
        */
    ]
});

module.exports = logger;
