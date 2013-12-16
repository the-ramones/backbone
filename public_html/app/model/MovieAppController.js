/* MovieAppController controller */

var MovieAppController = {
    init: function(spec) {
        this.config = {
            connect: true
        };

        _.extend(this.config, spec);

        /* model is a movie "The Place Beyond the Pines */
        this.model = new MovieAppModel({
            title: "The Palce Beyond the Pines",
            release: new Date(2013, 5, 19),
            director: "Derec Ciafrance",
            rating: 7.4,
            starts: [EvaMendez, RyanGosling]
        });

        /* view is a out movie view */
        this.view = new MovieView({model: this.model});

        this.movieLibrary = new MovieLibrary;

        return this;
    },
    handlePubSubUpdate: function() {
        /* TODO: write a handler */
    }
};