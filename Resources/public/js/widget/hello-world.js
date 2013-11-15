define(['jquery', 'backbone'], function ($, Backbone) {
    'use strict';

    /**
     * @export  oro/sidebar/widget/hello-world
     */
    var helloWorld = {};

    helloWorld.defaults = {
        title: 'Hello world',
        icon: 'bundles/orosidebar/img/hello-world.ico',
        settings: function () {
            return {
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar.'
            };
        }
    };

    helloWorld.ContentView = Backbone.View.extend({
        template: _.template('<span><%= settings.content %></span>'),

        initialize: function () {
            var view = this;
            view.listenTo(view.model, 'change', view.render);
        },

        render: function () {
            var view = this;
            view.$el.html(view.template(view.model.toJSON()));
            return view;
        }
    });

    helloWorld.SetupView = Backbone.View.extend({
        template: _.template('<h3>Hello world settings</h3><textarea style="width: 250px; height: 150px;"><%= settings.content %></textarea>'),

        events: {
            'keyup textarea': 'onKeyup'
        },

        render: function () {
            var view = this;
            view.$el.html(view.template(view.model.toJSON()));
            return view;
        },

        onKeyup: function (e) {
            var view = this;
            var model = view.model;

            var content = view.$el.find('textarea').val();

            var settings = model.get('settings');
            settings.content = content;

            model.set({ settings: settings }, { silent: true });
            model.trigger('change');
        },
    });

    return helloWorld;
});
