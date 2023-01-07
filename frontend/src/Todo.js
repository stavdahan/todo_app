import React from "react";

const Todo = ({ todo, index, completeTodo, removeTodo }) => {
    return (
        <div
            style={{textDecoration: todo.isCompleted ? 'line-through' : '' }}
            className="todo">{todo.text}
            <div>
                <button onClick={() => completeTodo(todo.id)}>Complete</button>
                <button onClick={() => removeTodo(todo.id)}>x</button>
        </div>
        </div>
            
    )
}
 
export default Todo