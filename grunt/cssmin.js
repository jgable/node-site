module.exports = {
    build: {
        files: [{
            expand: true,
            cwd: '.grunt/build/css',
            src: '**/*.css',
            dest: '.grunt/build/css'
        }]
    }
};
