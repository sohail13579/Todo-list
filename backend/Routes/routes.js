const express = require('express');
const { getAllTodos, createTodo, updateTodo, deleteTodo, completed } = require('../controllers/todoController');

const router = express.Router();

router.get('/', getAllTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.put('/:id/completed', completed);


module.exports = router;