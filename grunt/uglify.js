
module.exports = {
    build: {
        files: [{
            expand: true,
            cwd: 'build/js',
            src: '**/*.js',
            dest: 'build/js'
        }]
    }
};
