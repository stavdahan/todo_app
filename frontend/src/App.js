import React, { useState, use } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import './App.css'

  const initTodos = () => { 
    if (localStorage.getItem('todos')) { 
      return JSON.parse(localStorage.getItem('todos'))
    } else {
      return [
    {
      text: 'Learn about React',
      isCompleted: false,
      date: 1
    },
    {
      text: 'Meet friend for lunch',
      isCompleted: false,
      date: 3
    },
    {
      text: 'Build really cool todo app',
      isCompleted: false,
      date: 2
    }
  ] } 
  }

function App() { 
  const [todos, setTodos] = useState(() => initTodos())

  const addTodo = text => { 
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const completeTodo = index => { 
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const removeTodo = index => { 
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const sortByDate = () => { 
    const newTodos = [...todos];
    newTodos.sort((todo1, todo2) => {
      if (todo1.date > todo2.date) { 
        return 1;
      } else if (todo1.date < todo2.date) { 
        return -1;
      }
      return 0;
    })
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const sortAlphabetically = () => {
    const newTodos = [...todos];
    newTodos.sort((todo1, todo2) => { 
      if (todo1.text > todo2.text) { 
        return 1;
      } else if (todo1.text < todo2.text) { 
        return -1;
      }
      return 0;
    })
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos));
   }

  return (
    <div className="app">
      <button onClick={sortByDate}>Date</button>
      <button onClick={sortAlphabetically}>A-Z</button>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            removeTodo={removeTodo}
            completeTodo={completeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
}

export default App;