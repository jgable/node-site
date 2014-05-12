export default Ember.Mixin.create({
	loggedInUser: function () {
		return this.get('user');
	}.property('user.isLoggedIn'),

	isLoggedIn: function () {
		var user = this.get('user');

		return user.get('isLoggedIn');
	}.property('user.isLoggedIn')
});