const fs = require("fs");
const data = fs.readFileSync("./db.json");
const todos = JSON.parse(data);
const { v4: uuidv4 } = require("uuid");

const getTodos = (req, res) => {
  res.status(200).json(todos);
};

const getTodo = (req, res) => {
  todo = todos.find((todo) => todo.id == req.params.id);
  todo
    ? res.status(200).json(todo)
    : res.status(200).json({ err: "cant find the todo" });
};

const setTodo = (req, res) => {
  todoText = req.body.text;
  id = uuidv4();
  if (checkTodoIsCorrect(todoText)) {
    const newTodo = {
      id,
      text: todoText,
      isCompleted: false,
      date: Date.now(),
    };
    todos.push(newTodo);
    fs.writeFileSync("./db.json", JSON.stringify(todos));
  } else {
    console.log("This todo exists in the DB");
  }
  res.status(200).json({ message: `create a new todo` });
};

const updateTodo = (req, res) => {
  const id = req.params.id;
  console.log(id);
  for (const todo of todos) {
    if (todo.id == id) {
      todo.isCompleted = !todo.isCompleted;
    }
  }
  fs.writeFileSync("./db.json", JSON.stringify(todos));
  res.status(200).json({ message: `updated todo number: ${req.params.id}` });
};

const deleteTodo = (req, res) => {
  res.status(200).json({ message: `deleted todo number ${req.params.id}` });
};

const checkTodoIsCorrect = (text) => {
  let isAvailable = !checkTodoIsAvailable(text);
  console.log(typeof text);
  console.log(isAvailable);
  if (typeof text == "string" && isAvailable) {
    return true;
  } else {
    return false;
  }
};

const checkTodoIsAvailable = (text) => {
  todos.find((todo) => todo.text == text);
};

module.exports = {
  getTodos,
  getTodo,
  setTodo,
  updateTodo,
  deleteTodo,
};
