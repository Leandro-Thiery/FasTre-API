const db = require('../db');
const firestore = db.firestore();

const getAllQueueByUserId = async (req, res, next) => {
  try {
    const queues = [];
    const userId = req.params.userId;
    const hospitals = await firestore.collection('hospitals')
        .get();

    await Promise.all(hospitals.docs.map(async (hospital) => {
      const polyclinics = await firestore.collection('hospitals')
          .doc(hospital.id).collection('polyclinics').get();
      await Promise.all(polyclinics.docs.map(async (polyclinic) => {
        const snapshot = await firestore.collection('hospitals')
            .doc(hospital.id).collection('polyclinics').doc(polyclinic.id)
            .collection('queues').where('userId', '==', userId).get();

        snapshot.forEach((queue) => {
          const data = queue.data();
          const newQueue = {
            'queueId': queue.id,
            'polyId': parseInt(polyclinic.id),
            'hospitalId': parseInt(hospital.id),
            ...data,
          };
          queues.push(newQueue);
        });
      }));
    }));
    res.send({queues});
  } catch (error) {
    res.status(404).send('Queues Not Found');
  }
};

module.exports = {getAllQueueByUserId};
