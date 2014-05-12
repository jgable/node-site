import ajax from 'appkit/utils/ajax';

export default Ember.ObjectController.extend({
    error: null,
    
    actions: {
        reset: function () {
            var self = this;

            this.set('error', false);
            this.set('success', false);
            
            return ajax({
                url: '/forgotpassword/reset',
                type: 'POST',
                data: {
                    username: this.get('username'),
                    password: this.get('password'),
                    resetKey: this.get('resetKey')
                }
            }).then(function (resp) {
                if (resp.error) {
                    self.set('error', resp.error);
                    return;
                }

                self.send('loggedIn', resp.user);

                self.transitionToRoute('home');
            });
        }
    },
});