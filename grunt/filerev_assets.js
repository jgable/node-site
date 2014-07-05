var assetsRoot = require('config').Assets.root;

module.exports = {
    options: {
        prettyPrint: true
    },
    build: {
        options: {
            cwd: '.grunt/build',
            dest: 'server/assets.json',
            prefix: assetsRoot
        }
    }
};
