export default Ember.Handlebars.helper('asset', function asset(name) {
	if (!window.ENV.APP.assets || !window.ENV.APP.assets[name]) {
		return name;
	}

	return window.ENV.APP.assets[name];
});
