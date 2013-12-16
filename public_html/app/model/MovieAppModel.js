/* MovieAppModel model */

var MovieAppModel = Backbone.Model.extend({
    initialize: function(attrs) {
        this.movies = new MovieLibrary();
        if (_.isEmpty(attrs)) {
            this.movies.add(attrs);
        }
        /* Bind an events to object functions */
        this.movies.bind('add', this.addMovie);
        this.movies.bind('remove', this.removeMovie);
    },
            
    events: {
        /* user events that view to respond to */
    },
    
    render: function() {
        this.el = ich.app(this.model.toJSON());
        
        /* Store a reference to our movie list */
        this.movieLibrary = this.$('#movieLibrary');

        return this;
    },
    
    addMovie: function(movie) {
        var view = new MovieView({model: movie});
        // Append a new movie to the rendered view
        this.movieLibrary.append(view.render().el);
    },
    
    removeMovie: function(movie) {
        this.$('#' + movie.get('htmlId')).remove();
    }    
});

