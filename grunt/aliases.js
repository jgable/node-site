module.exports = {
    'styles': ['less'],
    'scripts': ['concat:vendor', 'copy:scripts'],
    'templates': ['handlebars'],
    'server': ['styles', 'scripts', 'templates', 'express:dev', 'watch'],
    'default': ['server']
};