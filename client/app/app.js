import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

window.ENV.APP = {
    LOG_ACTIVE_GENERATION:    true,
    LOG_MODULE_RESOLVER:      true,
    LOG_TRANSITIONS:          true,
    LOG_TRANSITIONS_INTERNAL: true,
    LOG_VIEW_LOOKUPS:         true
};

var App = Ember.Application.extend({
    modulePrefix: 'appkit', // TODO: loaded via config
    Resolver: Resolver
});

loadInitializers(App, 'appkit');

export default App;
