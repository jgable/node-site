// ensure we don't share routes between all Router instances
var Router = Ember.Router.extend({
    location: 'pushState' in window.history ? 'history' : undefined
});

Router.map(function () {
    this.route('login');
    this.route('register');
    this.route('forgotpassword');
    this.route('forgotpassword/reset', { path: '/forgotpassword/reset/:resetKey' });
    this.route('home');
    this.route('user');
});

export default Router;
