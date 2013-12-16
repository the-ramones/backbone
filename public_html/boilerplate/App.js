/* App */

var AppView = Backbone.View.extend({
    el: "#container",
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html("Single-page app using Backbone.js");
    }
});

var appView = new AppView();

var TemplatedView = Backbone.View.extend({
    el: "#container-template",
    template: _.template("<em>Templated single-page application using <%= lib %></em>"),
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template({lib: "Backbone.js"}));
    }
});

var templatedView = new TemplatedView();

