import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import "./App.css";

const TODOS_API = "http://localhost:4000/api";

function App() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const initTodos = async () => {
      const response = await axios.get(`${TODOS_API}/todos`);
      const todos = response.data;
      setTodos(todos);
    };
    initTodos();
  }, []);

  const addTodo = async (text) => {
    const response = await axios.post(`${TODOS_API}/todos`, { text: text });
    if (response.status == 200) {
      const newTodos = [...todos, { text }];
      setTodos(newTodos);
    }
  };

  const completeTodo = async (id) => {
    const response = await axios.put(`${TODOS_API}/todos/${id}`, { id });
    if (response.status == 200) {
      const newTodos = [...todos];
      const index = newTodos.findIndex((todo) => todo.id == id);
      newTodos[index].isCompleted = true;
      setTodos(newTodos);
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const sortByDate = () => {
    const newTodos = [...todos];
    newTodos.sort((todo1, todo2) => {
      if (todo1.date > todo2.date) {
        return 1;
      } else if (todo1.date < todo2.date) {
        return -1;
      }
      return 0;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const sortAlphabetically = () => {
    const newTodos = [...todos];
    newTodos.sort((todo1, todo2) => {
      if (todo1.text > todo2.text) {
        return 1;
      } else if (todo1.text < todo2.text) {
        return -1;
      }
      return 0;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className="app">
      <button onClick={sortByDate}>Date</button>
      <button onClick={sortAlphabetically}>A-Z</button>
      <div className="todo-list">
        {todos
          ? todos.map((todo, index) => (
              <Todo
                key={index}
                index={index}
                todo={todo}
                removeTodo={removeTodo}
                completeTodo={completeTodo}
              />
            ))
          : console.log(1)}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
