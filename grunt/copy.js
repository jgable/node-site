var path = require('path'),
    grunt = require('grunt');

module.exports = {
    scripts: {
        files: [{
            'build/js/jquery.min.map': 'client/components/jquery/dist/jquery.min.map'
        }]
    },
    images: {
        files: [{
            expand: true,
            cwd: 'client/img',
            src: '*',
            dest: 'build/img/',
        }, {
            expand: true,
            cwd: 'client/swagger/img',
            src: '*',
            dest: 'build/img/',
        }]
    },
    dist: {
        files: [{
            expand: true,
            cwd: '.grunt/build',
            src: '**/*.*',
            dest: 'build',
            filter: function (filepath) {
                var dest = path.join(
                    'build',
                    // Remove the parent 'js/src' from filepath
                    filepath.split(path.sep).slice(2).join(path.sep)
                );
                var doesntExist = !grunt.file.exists(dest);

                if (!doesntExist) {
                    grunt.log.writeln('Skipping existing file: ' + dest);
                }

                return doesntExist;
            },
        }]
    }
};