/* TODOs */

var app = {};

app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

var todo = new app.Todo({title: "Learn Backbone.js", completed: false});

todo.get('title');
todo.get('completed');
todo.get('created_at');
todo.set('created_at', new Date());
todo.get('created_at');

console.log(todo.get('title'));
console.log(todo.get('completed'));
console.log(todo.get('created_at').toString());
console.log(todo.get('title'));
console.log(todo.get('created_at').toString());

app.TodoList = Backbone.Collection.extend({
    model: app.Todo,
    localStorage: new Store("backbone-todo"),
    addAll: function() {
    }
});

app.todoList = new app.TodoList();

var todoList = app.todoList;
todoList.create({title: 'Learn Backbone\'a Collection'});
var lmodel = new app.Todo({title: 'Learn Models', completed: true});
todoList.add(lmodel);
console.log(todoList.pluck('title').join(', '));
console.log(todoList.pluck('completed').join(', '));
var todos = JSON.stringify(app.todoList);

console.log(todoList);

app.TodoView = Backbone.View.extend({
    el: "#todo-list",
    tagName: 'li',
    template: _.template($('#item-template').html()),
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.append(this.template(this.model.toJSON()));
        // console.log("TO JSON: " + JSON.stringify(this.model));
        return this;
    }
});

var rmodel = new app.Todo({title: 'Write a Book', completed: false});
var todoView = new app.TodoView({model: rmodel});
var mmodel = new app.Todo({title: 'Make it Possible', completed: false});
var todoView = new app.TodoView({model: mmodel});
var dmodel = new app.Todo({title: 'Just Do It', completed: false});
var todoView = new app.TodoView({model: dmodel});

/* Events */

/*
 * todoList.on('add', this.addAll, this);
 */

app.AppView = Backbone.View.extend({
    el: "#todoapp",
    initialize: function() {
        this.input = this.$("#new-todo");
        app.todoList.on('add', this.addOne, this);
        app.todoList.on('reset', this.addAll, this);
        app.todoList.fetch();  /* Loads list from local storage */
    },
    events: {
        'keypress #new-todo': 'createTodoOnEnter'
    },
    createTodoOnEnter: function(e) {
        if (e.which !== 13 || !this.input.val().trim()) {
            return;
        }
        app.todoList.create(this.newAttributes());
        this.input.val('');
    },
    newAttributes: function() {
        return {
            title: this.input.val().trim(),
            campleted: false
        };
    },
    addOne: function(todo) {
        var view = new app.TodoView({model: todo});
        $('#todo-list').append(view.render().el);
    },
    addAll: function() {
        $('#todo-list').html('');
        app.todoList.each(this.addOne,this);        
    }
});

var appView = new app.AppView();




