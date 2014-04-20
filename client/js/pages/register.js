(function () {
    'use strict';

    var RegisterView = Backbone.View.extend({
        el: '#registerView',

        render: function () {

            if (window.REGISTER_ERROR) {
                this.$('.help-block').html('- ' + window.REGISTER_ERROR + '<br />');
            }

            return this;
        }
    });

    new RegisterView().render();
}());