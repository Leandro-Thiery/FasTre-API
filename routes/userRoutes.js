const express = require('express');
const {getAllQueueByUserId} = require('../controllers/userController');

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/:userId/queues').get(getAllQueueByUserId);

module.exports = router;
