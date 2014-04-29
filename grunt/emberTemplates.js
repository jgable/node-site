
module.exports = {
    options: {
        templateBasePath: /app\//,
        templateFileExtensions: /\.(hbs|hjs|handlebars)/,
        templateRegistration: function (name, template) {
            var newName = name.replace('client/', '');
            return "define('appkit/" + newName + "', ['exports'], function(__exports__){ __exports__['default'] = " + template + "; });";
        }
    },
    debug: {
        options: {
            precompile: false
        },
        src: 'client/app/**/*.{hbs,hjs,handlebars}',
        dest: 'build/js/templates.js'
    },
    dist: {
        src: '<%= emberTemplates.debug.src %>',
        dest: '<%= emberTemplates.debug.dest %>'
    }
};
