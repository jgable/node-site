module.exports = {
    'styles': ['less'],
    'scripts': ['concat', 'copy:scripts', 'transpile:app', 'concat_sourcemap:app'],
    'images': ['copy:images'],
    'templates': ['emberTemplates:debug'],
    'server': ['clean:build', 'styles', 'images', 'scripts', 'templates', 'express:dev', 'watch'],
    'default': ['server']
};