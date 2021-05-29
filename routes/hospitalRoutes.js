const express = require('express');
const {
  getAllHospital,
  getHospitalById,
} = require('../controllers/hospitalController');

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/').get(getAllHospital);

router.route('/:id').get(getHospitalById);

module.exports = router;
