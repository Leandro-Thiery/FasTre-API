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
          doc.data().location,
          doc.data().name,
          doc.data().phoneNum,
          doc.data().telephoneNum,
      );
      hospitals.push(hospital);
    });
    res.send(hospitals);
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
          doc.id,
          doc.data().address,
          doc.data().email,
          doc.data().location,
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
          'id': doc.id,
          'doctorName': doc.data().doctorName,
          'polyType': doc.data().polyType,
          'schedule': doc.data().schedule,
        });
      });
      res.send(polyclinics);
    }
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getAllHospital,
  getHospitalById,
  getAllPolyclinic,
};
