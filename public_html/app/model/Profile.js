/* Profile */

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

