module.exports = {
    'styles': ['less'],
    'scripts': ['concat', 'copy:scripts', 'transpile:app', 'concat_sourcemap:app'],
    'images': ['copy:images'],
    'templates': ['emberTemplates:debug'],
    'build': ['styles', 'images', 'scripts', 'templates'],
    'minify': ['cssmin:build', 'uglify:build'],
    'hash': ['filerev', 'filerev_assets'],
    'assets': ['clean:build', 'build', 'minify', 'hash'],
    'cdn': ['assets', 's3'],
    'server': ['express:dev', 'watch'],
    'dev': ['clean:build', 'build', 'hash', 'server'],
    'prod': ['assets', 'server'],
    'default': ['dev']
};