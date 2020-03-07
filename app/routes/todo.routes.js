module.exports = (app) => {
    const todos = require('../controllers/todo.controller');

    //create a new todo item with
    app.post('/todos', todos.create);

    // retrieve a single note with todo id
    app.get('/todos/:todoId', todos.findOne);

    // retrieve all todos
    app.get('/todos', todos.findAll);

    // update a todo item with todo id
    app.put('/todos/:todoId', todos.update);

    // delete a todo item with todo id
    app.delete('/todos/:todoId', todos.delete);
}