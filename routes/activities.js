const express = require('express');
const router = express.Router();

const validator = require('../middleware/validation-middleware');
const activitiesController = require('../controllers/activities');

router.get('/', activitiesController.getAll);

router.get('/:id', activitiesController.getOne);

router.post('/', validator.validateActivity, activitiesController.createActivity);

router.put('/:id', validator.validateActivity, activitiesController.updateActivity);

router.delete('/:id', activitiesController.deleteActivity);

module.exports = router;