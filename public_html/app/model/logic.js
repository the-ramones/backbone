/* Logic */

var thePlaceBeyondThePines = new Movie;
thePlaceBeyondThePines.set({
    title: "The Place Beyond The Pines",
    release: 2012
});

var title = thePlaceBeyondThePines.get('title');
var release = thePlaceBeyondThePines.get('release');

console.log([title, release].join('\n'));

console.log([Sex.MALE, Sex.FEMALE, Sex.UNDEFINED].join('\n'));

var EvaMendez = new Actor({name: "Eva Mendez", age: 35, sex: "male"});
var RyanGosling = new Actor({name: "Ryan Gosling", age: 41, sex: "female"});

console.log([EvaMendez, RyanGosling].join('\n'));

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
            console.log("Error while while checking a uniqueness of +" + name + "+ id.. Retry");
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

var library = new MovieLibrary();

var movie43 = new Movie({title: "Movie 43", release: 2012});

library.add(movie43);
library.add(thePlaceBeyondThePines);

var release2012 = library.where({release: 2012});




