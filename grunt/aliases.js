module.exports = {
    'styles': ['less'],
    'scripts': ['concat', 'copy:scripts', 'transpile:app', 'concat_sourcemap:app'],
    'images': ['copy:images'],
    'templates': ['emberTemplates:debug'],
    'build': ['styles', 'images', 'scripts', 'templates'],
    'hash': ['filerev', 'filerev_assets'],
    'assets': ['clean:build', 'build', 'uglify:build', 'hash'],
    'prod': ['assets', 's3'],
    'server': ['clean:build', 'build', 'hash', 'express:dev', 'watch'],
    'default': ['server']
};