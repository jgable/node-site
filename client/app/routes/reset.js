
export default Ember.Route.extend({
	model: function (params) {
		return {
			username: '',
			resetKey: params.resetKey
		};
	}
});