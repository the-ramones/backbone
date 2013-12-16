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


