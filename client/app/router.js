// ensure we don't share routes between all Router instances
var Router = Ember.Router.extend({
	location: 'pushState' in window.history ? 'history' : undefined
});

Router.map(function () {
    this.route('login');
    this.route('register');
    this.route('forgotpassword');
    this.route('home');
});

export default Router;
