module.exports = {
    build: {
        files: [{
            expand: true,
            cwd: 'build/css',
            src: '**/*.css',
            dest: 'build/css'
        }]
    }
};
