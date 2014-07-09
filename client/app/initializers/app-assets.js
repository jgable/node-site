
export default {
    name: 'assets',

    initialize: function (container, application) {
        var assets = application.get('assets') || {};

        container.register('assets:app', assets, { instantiate: false });

        container.injection('component', 'assets', 'assets:app');
        container.injection('view', 'assets', 'assets:app');
        container.injection('route', 'assets', 'assets:app');
        container.injection('controller', 'assets', 'assets:app');
    }
};
