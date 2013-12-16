/* MovieAppView view */

var MovieAppView = Backbone.View.extend({
    initialize: function(attrs, options) {
        _.bindAll(this, 'changeTitle');
        this.model.bind('change:title', this.changeTitle);
    },
    // user events to handlers
    events: {
        "onclick .title": "handleTitleClick"
    },
    render: function() {
        // "ich" is ICanHaz.js magic
        this.el = ich.movie(this.model.toJSON());
        return this;
    },
    changeTitle: function() {

    },
    handleTitleClick: function() {
        alert("You a hust clicked a Title");
    }
});
