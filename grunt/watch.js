module.exports = {
    less: {
        files: ['client/less/**/*.less', 'client/swagger/less/*.less'],
        tasks: ['clean:build', 'build', 'hash'],
        options: {
            livereload: true
        }
    },
    templates: {
        files: ['client/app/templates/**/*.hbs'],
        tasks: ['clean:build', 'build', 'hash']
    },
    scripts: {
        files: ['client/app/**/*.js', 'client/swagger/js/*.js'],
        tasks: ['clean:build', 'build', 'hash'],
        options: {
            livereload: true
        }
    },
    express: {
        options: {
            spawn: false
        },
        files: [
            'server/**/*'
        ],
        tasks: [
            'express:dev'
        ]
    }
};