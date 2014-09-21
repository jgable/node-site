module.exports = {
    // CSS related tasks
    'styles': ['less'],

    // JS related tasks
    'scripts': ['transpile:app', 'concat:swagger', 'concat:vendor', 'concat_sourcemap:app'],
    'scripts:dist': ['transpile:app', 'concat:swagger', 'concat:dist'],
    'templates': ['emberTemplates:debug'],
    'templates:dist': ['emberTemplates:dist'],

    // Image related tasks
    'images': ['copy:images'],
    'images:min': ['imagemin'],

    // Minifying and hashing
    'minify': ['cssmin:build', 'uglify:build'],
    'hash': ['filerev', 'filerev_assets'],

    // Build aliases
    'build': ['styles', 'images', 'scripts', 'templates'],
    'build:dist': ['styles', 'images', 'scripts:dist', 'templates:dist'],

    // Starting the server
    'server': ['express:dev', 'watch'],

    // Special steps for node-inspector debugging + live reload
    'server:debug': ['concurrent:debug'],

    // Development specific aliases
    'dev': ['clean:build', 'build', 'hash', 'copy:scripts', 'copy:dist', 'server'],

    // Special steps for node-inspector debugging + live reload
    'dev:build': ['clean:build', 'build', 'hash', 'copy:scripts', 'copy:dist'],

    // Special steps for node-inspector debugging + live reload
    'dev:debug': ['dev:build', 'server:debug'],

    // Production specific aliases
    'assets': ['clean:build', 'build:dist', 'minify', 'hash', 'copy:dist'],
    'cdn': ['assets', 's3'],
    'prod': ['assets', 'server'],

    // Watch related task for rebuilding on changes
    'rebuild': ['clean:build', 'build', 'hash', 'copy:dist'],

    // Default to dev mode
    'default': ['dev']
};