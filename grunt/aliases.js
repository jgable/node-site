module.exports = {
    'styles': ['less'],
    'scripts': ['concat', 'copy:scripts'],
    'images': ['copy:images'],
    'templates': ['handlebars'],
    'server': ['clean:build', 'styles', 'images', 'scripts', 'templates', 'express:dev', 'watch'],
    'default': ['server']
};