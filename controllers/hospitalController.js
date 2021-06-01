const firebase = require('../db');
const Hospital = require('../models/hospital');
const firestore = firebase.firestore();

const getAllHospital = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection('hospitals').get();
    const hospitals = [];
    if (snapshot.empty) {
      res.status(404).send('No hospitals found');
    }

    snapshot.forEach((doc) => {
      const hospital = new Hospital(
          doc.id,
          doc.data().address,
          doc.data().email,
          doc.data().photo1,
          doc.data().photo2,
          doc.data().photo3,
          doc.data().latitude,
          doc.data().longitude,
          doc.data().name,
          doc.data().phoneNum,
          doc.data().telephoneNum,
      );
      hospitals.push(hospital);
    });
    res.send({hospitals});
    console.log(hospitals);
  } catch (error) {
    console.log(error);
  }
};

const getHospitalById = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection('hospitals').doc(req.params.id);
    const doc = await snapshot.get();
    if (!doc.exists) {
      res.status(404).send('No hospital found');
    } else {
      const hospital = new Hospital(
          parseInt(doc.id),
          doc.data().address,
          doc.data().email,
          doc.data().photo1,
          doc.data().photo2,
          doc.data().photo3,
          doc.data().latitude,
          doc.data().longitude,
          doc.data().name,
          doc.data().phoneNum,
          doc.data().telephoneNum,
      );
      res.send({hospital});
    }
  } catch (error) {
    console.log(error);
  }
};
// Polyclinics are obtained using Hospital's ID
const getAllPolyclinic = async (req, res, next) => {
  try {
    const snapshot = await firestore
        .collection('hospitals')
        .doc(req.params.id)
        .collection('polyclinics')
        .get();
    const polyclinics = [];
    if (snapshot.empty) {
      res.status(404).send('No polyclinics found');
    } else {
      snapshot.forEach((doc) => {
        polyclinics.push({
          'id': parseInt(doc.id),
          'polyName': doc.data().polyName,
        });
      });
      res.send({polyclinics});
    }
  } catch (error) {
    console.log(error);
  }
};

const getPolyclinicById = async (req, res, next) => {
  try {
    const snapshot = await firestore
        .collection('hospitals')
        .doc(req.params.id)
        .collection('polyclinics')
        .doc(req.params.polyId);
    const doc = await snapshot.get();
    if (!doc.exists) {
      res.status(404).send('No polyclinic found');
    } else {
      res.json({
        'id': parseInt(doc.id),
        'polyName': doc.data().polyName,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllSchedule = async (req, res, next) => {
  try {
    const snapshot = await firestore
        .collection('hospitals')
        .doc(req.params.id)
        .collection('schedules')
        .get();
    const doctors = [];
    if (snapshot.empty) {
      res.status(404).send('No schedules found');
    } else {
      snapshot.forEach((doc) => {
        doctors.push({
          'doctorId': parseInt(doc.id),
          'doctorName': doc.data().doctorName,
          'polyId': doc.data().polyId,
          'schedule': doc.data().schedule,
        });
      });
      res.send(doctors);
      console.log(doctors);
    }
  } catch (error) {
    console.log(error);
  }
};

const getScheduleById = async (req, res, next) => {
  try {
    const snapshot = await firestore
        .collection('hospitals')
        .doc(req.params.id)
        .collection('schedules')
        .doc(req.params.scheduleId);
    const doc = await snapshot.get();
    if (!doc.exists) {
      res.status(404).send('No schedule found by Id');
    } else {
      res.json({
        'doctorId': parseInt(doc.id),
        'doctorName': doc.data().doctorName,
        'polyId': doc.data().polyId,
        'schedule': doc.data().schedule,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllHospital,
  getHospitalById,
  getAllPolyclinic,
  getPolyclinicById,
  getAllSchedule,
  getScheduleById,
};
