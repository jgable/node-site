module.exports = {
    options: {
        script: 'server/app.js',
        output: 'listening on port'
    },
    dev: {
        options: {
            script: 'server/app.js',
            output: 'listening on port',
            debug: true
        }
    }
};