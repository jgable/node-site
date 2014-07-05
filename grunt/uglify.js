
module.exports = {
    build: {
        files: [{
            expand: true,
            cwd: '.grunt/build/js',
            src: '**/*.js',
            dest: '.grunt/build/js'
        }]
    }
};
