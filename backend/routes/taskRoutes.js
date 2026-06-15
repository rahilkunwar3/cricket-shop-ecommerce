const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {getTasks, createTask, updateTask, deleteTask} = require('../controllers/taskController');

router.get('/tasks', authenticateToken, getTasks);
router.post('/tasks', authenticateToken, createTask);
router.put('/tasks/:id', authenticateToken, updateTask);
router.delete('/tasks/:id', authenticateToken, deleteTask);

module.exports = router;