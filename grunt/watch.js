module.exports = {
    less: {
        files: ['client/less/**/*.less', 'client/swagger/less/*.less'],
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
        files: ['client/app/**/*.js', 'client/swagger/js/*.js'],
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