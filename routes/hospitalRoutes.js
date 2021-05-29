const express = require('express');
const {
  getAllHospital,
  getHospitalById,
  getAllPolyclinic,
} = require('../controllers/hospitalController');

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/').get(getAllHospital);

router.route('/:id').get(getHospitalById);

router.route('/:id/polyclinic').get(getAllPolyclinic);

module.exports = router;
