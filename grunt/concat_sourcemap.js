module.exports = {
    app: {
        src: ['.grunt/build/js/app/**/*.js'],
        dest: '.grunt/build/js/app-built.js',
        options: {
            sourcesContent: true
        },
    }
};
