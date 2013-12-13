/* 
 * Base Backbone model
 * 
 * Dependencies: 
 *  jQuery, Underscore, Backbone.Babysitter, Backbone.Wreckl, Backbone,
 *  RequiredJS, Backbone.Marionette, json2
 */

/* Models */

var Movie = Backbone.Model.extend({
    initialize: function(attrs, aptions) {
        Backbone.Model.apply(this, attrs);
    }
});

var thePlaceBeyondThePines = new Movie;
thePlaceBeyondThePines.set({
    title: "The Place Beyond The Pines",
    release: 2012
});

var title = thePlaceBeyondThePines.get('title');
var release = thePlaceBeyondThePines.get('release');

console.log([title, release].join('\n'));

/* Exception */
var Exception = Backbone.Model.extend({
    constructor: function() {
        Backbone.Model.apply(this, arguments);
    },
    initialize: function(attr, options) {
        if (!_.isNull(attrs.msg)) {
            this.msg = attr.msg;
        }
        if (!_.isNull(attrs.cause)) {
            this.cause = attr.cause;
        }
    },
    print: function() {
        var result = "";
        if (!_.isNull(this.msg)) {
            result = result + this.msg;
        }
        if (!_.isNull(this.cause)) {
            result = result + this.cause;
        }
        return result;
    }
});

/* Actor */
var Actor = Backbone.Model.extend({
    constructor: function() {
        Backbone.Model.apply(this, arguments);
    },
    initialize: function(attrs, options) {
        if (!_.isNull(attrs.sex)) {
            this.sex = attrs.sex;
        } else {
            this.sex = SEX.UNDEFINED;
        }
        if (!_.isNull(attrs.name)) {
            this.name = attrs.name;
        } else {
            throw new Exception({msg: "Name is not defined"});
        }
        if (!_.isNull(attrs.age)) {
            this.age = attrs.age;
        } else {
            throw new Exception({msg: "Age is not defined"});
        }
    },
    validate: function(attrs) {
        var result = [];
        if (_.isEmpty(attrs.age) && !_.isNumber(attrs.age)) {
            result.push("Age field is not valid");
        }
        if (_.isEmpty(attrs.name) && !_.isString(attrs.name)) {
            result.push("Name field is not valid");
        }
        if (_.isEmpty(attrs.sex)) {
            result.push("Sex field is not valid");
        }
        return result.join('\n');
    }
});

/* SEX */
var Sex = Backbone.Model.extend({
    initialize: function(attr) {
        this.MALE = "male";
        this.FEMALE = "female";
        this.UNDEFINED = "undefined";
    }
});

console.log([Sex.MALE, Sex, FEMALE, Sex.UNDEFINED].join('\n'));

var EvaMendez = new Actor({name: "Eva Mendez", age: 35, sex: "male"});
var RyanGosling = new Actor({name: "Ryan Gosling", age: 41, sex: "female"});

console.log([EvaMendex, RyanGosling].join('\n'));

var Profile = Backbone.Model.extend({
    initialize: function(attrs, options) {
        this.profileId = generateProfileId();
        var attempt = 0;
        while (!checkUniqueness("profile", this.profileId) || attempt >= ATTEMPT_LIMIT) {
            Backbone.Model.apply(this, attrs);
            attempt = attempt + 1;
            return;
        }
        this.profileId = undefined;
        console.log("Could not generate a profile id.. Retry later");
    }
});

function generateProfileId() {
    var lastUsedId = getLastUsedId();
    var id = '' + lastUsedId + new Date().getTime();
    return id;
}

var ATTEMPT_LIMIT = 5

function checkUniqueness(name, id) {
    var attempt = 0;
    while (attempt < ATTEMPT_LIMIT) {
        try {
            $.ajax("/check/" + name + "/" + id, {
                method: "GET",
                async: true,
                cache: false,
                dataType: "text",
                data: "text",
                timeout: 1000,
                success: function(data) {
                    if (data == "true") {
                        return true;
                    }
                }
            })
        } catch (e) {
            console.log("rror while while checking a uniqueness of +" + name + "+ id.. Retry");
        }
    }
}
function getLastUsedId() {
    var attempt = 0;
    while (attempt < ATTEMPT_LIMIT) {
        try {
            $.ajax("/profile/lastUsedId", {
                method: "GET",
                async: true,
                cache: false,
                type: "text",
                datType: "text",
                timeout: 1000,
                success: function(data) {
                    if (!_.isEmpty(data)) {
                        lastUsedId = data.trim();
                        return lastUsedId;
                    }
                }
            });
        } catch (e) {
            console.log("Error while generationg a last used id.. Retry");
        }
        attempt = attempt + 1;
    }
    if (!_.isNull(lastUsedId)) {
        return lastUsedId;
    } else {
        throw new Exception("Couldn't retrieve a last used id. Retry later..");
    }
}

/* Collections */

var MovieLibrary = Backbone.Model.extend({
    model: Movie,
    initialize: function(attrs, aptions) {
        Backbone.Model.apply(this, attrs);
    },
    comparator: function() {

    }
});

var library = new MovieLibrary();

var movie43 = new Movie({title: "Movie 43", release: 2012});

library.add(movie43);
library.add(thePlaceBeyondThePines);

var release2012 = library.where({release: 2012});

var MovieView = Backbone.View.extend({
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

/* Controller */

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

var MovieAppView = Backbone.Model.extend({
    initialize: function(attrs) {
        Backbone.Model.apply(this, attrs);
        // Binds all nodel events to view functions
        this.model.mo
    }
});

/* Singleton */ 
var MovieAppController = {
    init: function(spec) {
        this.config = {
            connect: true
        };

        _.extend(this.config, spec);

        /* model is a movie "The Place Beyond the Pines */
        this.model = new MovieAppModel({
            title: "The Palce Beyond the Pines",
            release: new Date(2013,5,19),
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




