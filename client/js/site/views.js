(function () {
    /* global Backbone, _, $ */

    Backbone.TemplateView = Backbone.View.extend({
        // Set this to your stache name, or a function that takes template data and returns html
        template: null,

        render: function () {
            var template = this.getTemplate();

            // Set the html based on the template
            this.$el.html(template(this.getTemplateData()));

            // Allow for fiddling after rendered
            this.afterRender();

            return this;
        },

        getTemplate: function () {
            // Compile the template if needed
            if (_.isString(this.template)) {
                this.template = this._compileTemplate(this.template);
            }

            // If we already have a template function
            if (_.isFunction(this.template)) {
                return this.template;
            }

            // Otherwise return an empty string template.
            return function () { return ''; };
        },

        getTemplateData: function () {
            // If there is a model call toJSON on it
            if (this.model && _.isFunction(this.model.toJSON)) {
                return this.model.toJSON();
            }

            // Also check for a collection
            if (this.collection && _.isFunction(this.collection.toJSON)) {
                return this.collection.toJSON();
            }

            // Otherwise, empty object
            return {};
        },

        _compileTemplate: function (tpl) {
            // TODO: Implement your own
            return window.JST[tpl];
        },

        // By default, do nothing after rendering
        afterRender: $.noop
    });

    // A base view that allows for adding and disposing subviews in a tidy way.
    Backbone.SubViewableView = Backbone.TemplateView.extend({
        initialize: function () {
            this.subviews = {};
        },

        subview: function (name, view) {

            // Allow passing just the view and use the cid as the name.
            if (!_.isString(name) && _.isObject(name)) {
                view = name;
                name = view.cid;
            }
            
            // Get a view by name if only name passed
            if (name && !view) {
                return this.subviews[name];
            }

            // Remove any existing subviews
            this.removeSubview(name);

            this.subviews[name] = view;

            return view;
        },

        appendSubview: function (name, view) {
            view = this.subview(name, view);

            view.render();
            this.$el.append(view.el);
        },

        addSubviewToContainer: function (containerSelector, subviewName, SubviewClass, subviewAttrs) {
            subviewAttrs = subviewAttrs || {};

            // Instantiate with the el set to the container, unless we pass append
            var $container = this.$el.find(containerSelector),
                elAttrs = subviewAttrs.append === true ? {} : {el: $container},
                attrs = _.extend(subviewAttrs, elAttrs),
                subview = new SubviewClass(attrs);

            // Render the subview
            subview.render();

            // Add to our collection of subviews.
            this.subview(subviewName, subview);

            // Append to the container if that was what we wanted
            if (subviewAttrs.append) {
                $container.append(subview.el);
            }

            return subview;
        },

        removeSubview: function (name) {
            var view = this.subview(name),
                subviews = this.subviews;

            if (view && _.isFunction(view.remove)) {
                view.remove();
            }

            delete subviews[name];
        },

        remove: function () {
            var self = this;

            // remove all of our subviews on remove
            _.each(this.subviews, function (view, name) {
                self.removeSubview(name);
            });

            // Remove all event handlers on collection
            if (this.collection) {
                this.collection.off(null, null, this);
            }

            // Remove all event handlers on model
            if (this.model) {
                this.model.off(null, null, this);
            }

            Backbone.TemplateView.prototype.remove.call(this);
        }
    });

    Backbone.CollectionView = Backbone.SubViewableView.extend({
        // This will need to be set
        itemView: null,

        itemContainer: function () {
            return this.$el;
        },

        initialize: function (attrs) {

            this.collection.on('reset', this.resetItems, this);
            this.collection.on('add', this.renderNewItem, this);
            this.collection.on('destroy', this.removeItem, this);

            Backbone.SubViewableView.prototype.initialize.call(this, attrs);

            if (!this.itemView || !_.isFunction(this.itemView)) {
                throw new Error('No itemView provided to CollectionView');
            }
        },

        afterRender: function () {
            this.renderItems();
        },

        resetItems: function (models, opts) {
            var self = this;

            // Remove the previous models
            // NOTE: Not available in our version of Backbone (0.9.2)
            if (opts.previousModels) {
                _.each(opts.previousModels, function (model) {
                    self.removeItem(model);
                });
            } else {
                _.each(this.subviews, function (view, key) {
                    if (key.slice(0, 5) === 'item-') {
                        self.removeSubview(key);
                    }
                });
            }

            // Render the new models
            this.renderItems(models);
        },

        renderItems: function (models) {
            models = models || this.collection;

            var self = this,
                fragment;

            // Bug out if no models to render
            if (!models || models.length < 1) {
                return;
            }

            // Build up all the new rendered views in a fragment then append it
            fragment = document.createDocumentFragment();

            models.each(function (model) {
                var view = new self.itemView({model: model});

                self.subview('item-' + model.cid, view);

                fragment.appendChild(view.render().el);
            });

            // Append to the dom
            this.itemContainer().append(fragment);
        },

        renderNewItem: function (modelToAdd) {
            // render and append to $el.
            var view = new this.itemView({model: modelToAdd});

            // Keep track as a subview by the model.cid
            this.subview('item-' + modelToAdd.cid, view);

            // Append to the dom
            this.itemContainer().append(view.render().el);
        },

        removeItem: function (modelToRemove) {
            this.removeSubview('item-' + modelToRemove.cid);
        },

        remove: function () {
            // Remove all handlers
            this.collection.off(null, null, this);

            // Remove all subviews (items)
            Backbone.SubViewableView.prototype.remove.call(this);
        }
    });
}());