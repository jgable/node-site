module.exports = {
    client: {
        options: {
            namespace: 'JST',
            processName: function (filePath) {
                return filePath.replace('client/templates/', '').replace('.stache', '');
            }
        },
        files: {
            'build/js/templates.built.js': ['client/templates/**/*.stache']
        }
    }
};