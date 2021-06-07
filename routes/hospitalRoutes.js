const express = require('express');
const {
  getAllHospital,
  getHospitalById,
  getAllPolyclinic,
  getAllSchedule,
  getScheduleById,
  getPolyclinicById,
} = require('../controllers/hospitalController');
const {
  getAllQueue,
  addQueue,
  getCurrentNumber,
  getQueueById,
  getQueueByUserId,
  editQueueById} = require('../controllers/queueController');

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/').get(getAllHospital);

router.route('/:id').get(getHospitalById);

router.route('/:id/polyclinics').get(getAllPolyclinic);

router.route('/:id/polyclinics/:polyId').get(getPolyclinicById);

router.route('/:id/polyclinics/:polyId/queues').get(getAllQueue).post(addQueue);

router.route('/:id/polyclinics/:polyId/queues/:queueId')
    .get(getQueueById)
    .put(editQueueById);

router.route('/:id/polyclinics/:polyId/queues/user/:userId')
    .get(getQueueByUserId);

router.route('/:id/polyclinics/:polyId/currentNumber').get(getCurrentNumber);

router.route('/:id/schedules').get(getAllSchedule);

router.route('/:id/schedules/:scheduleId').get(getScheduleById);

module.exports = router;
