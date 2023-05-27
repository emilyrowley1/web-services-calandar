const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/tasks', require('./tasks'));
router.use('/activities', require('./activities'));


module.exports = router;