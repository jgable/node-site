
export default Ember.Component.extend({
    tagName: 'img',
    attributeBindings: ['assetPath:src', 'alt', 'title'],

    img: null,

    assetPath: function () {
        var assets = this.get('assets'),
            img = this.get('img');

        return assets[img];
    }.property('img')
});