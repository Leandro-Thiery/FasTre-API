const express = require('express');
const {
  getAllHospital,
  getHospitalById,
  getAllPolyclinic,
  getAllSchedule,
  getScheduleById,
  getPolyclinicById,
} = require('../controllers/hospitalController');

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/').get(getAllHospital);

router.route('/:id').get(getHospitalById);

router.route('/:id/polyclinics').get(getAllPolyclinic);

router.route('/:id/polyclinics/:polyId').get(getPolyclinicById);

router.route('/:id/schedules').get(getAllSchedule);

router.route('/:id/schedules/:scheduleId').get(getScheduleById);

module.exports = router;
