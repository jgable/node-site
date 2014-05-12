
export default Ember.Route.extend({
    actions: {
        loggedIn: function (user) {
            // Update the user on all routes and controllers
            this.container.lookup('user:current').setProperties(user);
        },

        loggedOut: function () {
            // Nullify the user on all routes and controllers
            this.container.lookup('user:current').setProperties({
                id: null,
                username: null
            });
        }
    }
});