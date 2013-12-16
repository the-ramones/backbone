/* Generic Exception */

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


