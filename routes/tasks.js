const express = require('express');
const router = express.Router();

const validator = require('../middleware/validation-middleware')
const tasksController = require('../controllers/tasks');

router.get('/', tasksController.getAll);

router.get('/:id', tasksController.getOne);

router.post('/', validator.validateTask, tasksController.createTask);

router.put('/:id', validator.validateTask, tasksController.updateTask);

router.delete('/:id', tasksController.deleteTask);

module.exports = router;