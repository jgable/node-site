export default Ember.Route.extend({
  model: function() {
    return {
        error: window.REGISTER_ERROR
    };
  }
});
