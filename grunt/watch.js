module.exports = {
    less: {
        files: ['client/less/**/*.less'],
        tasks: ['less'],
        options: {
            livereload: true
        }
    },
    templates: {
        files: ['client/templates/**/*.stache'],
        tasks: ['handlebars']
    },
    scripts: {
        files: ['client/js/**/*.js'],
        tasks: ['scripts'],
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