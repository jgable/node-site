module.exports = {
    less: {
        files: ['client/less/**/*.less', 'client/swagger/less/*.less'],
        tasks: ['rebuild'],
        options: {
            livereload: true
        }
    },
    templates: {
        files: ['client/app/templates/**/*.hbs'],
        tasks: ['rebuild']
    },
    scripts: {
        files: ['client/app/**/*.js', 'client/swagger/js/*.js'],
        tasks: ['rebuild'],
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