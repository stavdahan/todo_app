const getTodos = (req, res) => {
    res.status(200).json({message: 'from controller'})
}

const getTodo = (req, res) => { 
    res.status(200).json({ message: `from controller ${req.params.id}`})
}

const setTodo = (req, res) => { 
    res.status(200).json({ message: `create a new todo` })
}

const updateTodo = (req, res) => { 
    res.status(200).json({ message: `updated todo number: ${req.params.id}`})
}

const deleteTodo = (req, res) => { 
    res.status(200).json({ message: `deleted todo number ${req.params.id}`})
}


const checkTodoIsCorrect = ({ text, isCompleted, date }) => { 
    if (text && isCompleted && date) {
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