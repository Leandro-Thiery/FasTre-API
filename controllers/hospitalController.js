const db = require('../db');
const Hospital = require('../models/hospital');
const firestore = db.firestore();

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
    const polyclinics = [];
    const date = new Date();
    const snapshot = await firestore
        .collection('hospitals')
        .doc(req.params.id)
        .collection('polyclinics')
        .get();

    if (snapshot.empty) {
      return res.status(401).send('No Polyclinics Found');
    }

    await Promise.all(snapshot.docs.map(async (polyclinic) => {
      const polyclinicSnapshot = await firestore.collection('hospitals')
          .doc(req.params.id).collection('polyclinics')
          .doc(polyclinic.id).collection('summary')
          .doc(date.toDateString()).get();
      if (!polyclinicSnapshot.exists) {
        polyclinics.push({
          'id': parseInt(polyclinic.id),
          'polyName': polyclinic.data().polyName,
          'currentNumber': 0,
        });
      } else {
        polyclinics.push({
          'id': parseInt(polyclinic.id),
          'polyName': polyclinic.data().polyName,
          'currentNumber': polyclinicSnapshot.data().number,
        });
      }
    }));

    res.send({polyclinics});
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
    const schedules = [];
    if (snapshot.empty) {
      res.status(404).send('No schedules found');
    } else {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const doctor = {
          'doctorId': doc.id,
          ...data,
        };
        schedules.push(doctor);
      });
      res.send({schedules});
      console.log(schedules);
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
        ...doc.data(),
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
