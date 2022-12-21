const fs = require('fs')
const data = fs.readFileSync('./db.json')
const todos = JSON.parse(data)

const getTodos = (req, res) => {
    res.status(200).json(todos)
}

const getTodo = (req, res) => { 
    todo = todos.find(todo => todo.id == req.params.id)
    todo ? res.status(200).json(todo) : res.status(200).json({err: 'cant find the todo'})
}

const setTodo = (req, res) => { 
    new_todo = req.body
    if (checkTodoIsCorrect(new_todo)) {
        todos.push(new_todo)
        fs.writeFileSync('./db.json', JSON.stringify(todos))
    } else {

     }
    res.status(200).json({ message: `create a new todo` })
}

const updateTodo = (req, res) => { 
    res.status(200).json({ message: `updated todo number: ${req.params.id}`})
}

const deleteTodo = (req, res) => { 
    res.status(200).json({ message: `deleted todo number ${req.params.id}`})
}


const checkTodoIsCorrect = ({ id, text, isCompleted, date }) => { 
    console.log(id, text, isCompleted, date)
    if (typeof text == 'string' && typeof date == 'number') {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    getTodos,
    getTodo,
    setTodo,
    updateTodo,
    deleteTodo,
}