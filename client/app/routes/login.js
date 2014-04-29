import ajax from 'appkit/utils/ajax';

export default Ember.Route.extend({
    model: function () {
        return {
            username: '',
            password: '',
            ref: '',
            error: window.LOGIN_ERROR
        };
    }
});
