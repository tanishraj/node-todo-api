const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    text: { type: String },
    completed: { type: Boolean }
},
    {
        timestamp: true
    }
)

module.exports = mongoose.model('Todo', TodoSchema);