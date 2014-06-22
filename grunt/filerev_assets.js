var assetsRoot = require('config').Assets.root;

module.exports = {
    options: {
        prettyPrint: true
    },
    build: {
        options: {
            cwd: 'build',
            dest: 'server/assets.json',
            prefix: assetsRoot
        }
    }
};
