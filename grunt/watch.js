module.exports = {
    less: {
        files: ['client/less/**/*.less'],
        tasks: ['less'],
        options: {
            livereload: true
        }
    },
    templates: {
        files: ['client/app/templates/**/*.hbs'],
        tasks: ['emberTemplates']
    },
    scripts: {
        files: ['client/app/**/*.js'],
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