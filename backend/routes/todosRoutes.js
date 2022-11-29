const express = require('express');
const router = express.Router()
const { getTodos, getTodo, setTodo, updateTodo, deleteTodo } = require('../controllers/todosController')

router.get('/', getTodos)

router.get('/:id', getTodo)
 
router.post('/', setTodo)
 
router.put('/:id', updateTodo)
 
router.delete('/:id', deleteTodo)

module.exports = router