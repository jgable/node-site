module.exports = {
    swagger: {
        files: {
            'build/js/swagger.js': [
                'client/swagger/js/shred.bundle.js',
                'client/swagger/js/jquery-1.8.0.min.js',
                'client/swagger/js/jquery.slideto.min.js',
                'client/swagger/js/jquery.wiggle.min.js',
                'client/swagger/js/jquery.ba-bbq.min.js',
                'client/swagger/js/handlebars-1.0.0.js',
                'client/swagger/js/underscore-min.js',
                'client/swagger/js/backbone-min.js',
                'client/swagger/js/swagger.js',
                'client/swagger/js/highlight.7.3.pack.js',
                'client/swagger/js/swagger-ui.js',
                'client/swagger/js/main.js'
            ]
        }
    },
    vendor: {
        files: {
            'build/js/vendor.js': [
                'client/components/jquery/dist/jquery.min.js',
                'client/components/handlebars/handlebars.js',
                'client/components/ember/ember.js',
                'client/components/ember-data/ember-data.js',
                'client/components/loader.js/loader.js',
                'client/components/ember-resolver/dist/ember-resolver.js',
                'client/components/ic-ajax/dist/globals/main.js',
                'client/components/ember-load-initializers/ember-load-initializers.js',
                'client/components/lodash/dist/lodash.min.js',
                'client/components/moment/min/moment.min.js',
                'client/components/bootstrap/dist/js/bootstrap.js'
            ]
        }
    }
};