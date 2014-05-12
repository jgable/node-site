import ajax from 'appkit/utils/ajax';

export default Ember.ObjectController.extend({
    username: null,
    error: null,
    success: null,
    
    actions: {
        retrieve: function () {
            var self = this;

            this.set('error', false);
            this.set('success', false);
            
            return ajax({
                url: '/forgotpassword',
                type: 'POST',
                data: {
                    username: this.get('username')
                }
            }).then(function (resp) {
                if (resp.error) {
                    self.set('error', resp.error);
                    return;
                }

                self.set('success', 'Please check your email for instructions on resetting your password.');
            });
        }
    },
});