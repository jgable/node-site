import ajax from 'appkit/utils/ajax';

export default Ember.ObjectController.extend({
    actions: {
        login: function () {
            var self = this;

            this.set('error', false);
            
            return ajax({
                url: '/login',
                type: 'POST',
                data: {
                    username: this.get('username'),
                    password: this.get('password'),
                    ref: this.get('ref')
                }
            }).then(function (resp) {
                if (resp && resp.user) {
                    self.transitionToRoute(resp.ref || 'home');
                }

                self.set('error', resp.error);
            });
        }
    },
});