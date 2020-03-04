const Todo = require('../models/todo.model');

// create and save a new todo
exports.create = (req, res) => {
    // validate request
    if (!req.body.text) {
        return res.status(400).send({
            message: 'Todo text can not be empty.'
        })
    }

    // create a todo item
    const todo = new Todo({
        text: req.body.text,
        completed: false
    })

    // save a todo item
    todo.save()
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || 'Some error occured while creating a todo item.'
            })
        })
}

// returieve and return all todos from database
exports.findAll = (req, res) => {
    Todo.find()
        .then(todos => {
            res.send(todos);
        }).catch(error => {
            res.status(500).send({
                message: error.message || 'Some error occured while fetchinng all todos items.'
            })
        })
}

// update a single todo with a todo id
exports.update = (req, res) => {
    // validate request input
    if (!req.body.completed) {
        return res.status(400).send({
            message: 'Todo completed status can not be empty.'
        })
    }

    // find note and update it with the request body
    Todo.findByIdAndUpdate(req.params.todoId, {
        completed: req.body.completed
    }, { new: true })
        .then(todo => {
            if (!todo) {
                return res.status(404).send({
                    message: 'Todo item not found with id ' + req.params.todoId
                })
            }

            res.send(todo)
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || 'Error updating todo with id ' + req.params.todoId
            })
        })
}

// delete a single note with a note id
exports.delete = (req, res) => {
    Todo.findByIdAndRemove(req.params.todoId)
        .then(todo => {
            if (!todo) {
                return res.status(404).send({
                    message: 'Todo item not found with id ' + req.params.todoId
                })
            }
            res.send({
                message: 'Todo item deleted successfully.'
            })
        })
        .catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Todo item not found with id ' + req.params.todoId
                })
            }
            return res.status(500).send({
                message: 'Could not delete todo item with id ' + req.params.todoId
            })
        })
}