(function () {
    'use strict';

    var LoginView = Backbone.View.extend({
        el: '#loginView',

        render: function () {

            if (window.LOGIN_ERROR) {
                this.$('.help-block').html('- ' + window.LOGIN_ERROR + '<br />');
            }

            return this;
        }
    });

    new LoginView().render();
}());