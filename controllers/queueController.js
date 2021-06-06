const firebase = require('firebase-admin');
const db = require('../db');
const firestore = db.firestore();
const Timestamp = firebase.firestore.Timestamp;
const axios = require('axios');
const URL = 'https://waitestimatorapp-r6te2wbmrq-et.a.run.app/predict';
const {setInput} = require('./queuePredict');


const getAllQueue = async (req, res, next) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const startDate = Timestamp.fromDate(start);
    const endDate = Timestamp.fromDate(end);
    const snapshot = await firestore.collection('hospitals')
        .doc(req.params.id).collection('polyclinics')
        .doc(req.params.polyId).collection('queues')
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .get();
    if (snapshot.empty) {
      res.status(404).send('No Queue Found');
    } else {
      const queues = [];
      snapshot.forEach((doc) => {
        const queue = {
          'id': doc.id,
          ...doc.data(),
        };
        queues.push(queue);
      });
      res.send({queues});
    }
  } catch (error) {
    console.log(error);
  }
};

const getQueueById = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection('hospitals')
        .doc(req.params.id).collection('polyclinics')
        .doc(req.params.polyId).collection('queues')
        .doc(req.params.queueId);
    const doc = await snapshot.get();
    if (!doc.exists) {
      res.status(404).send('No queue found');
    } else {
      res.send({
        'polyId': parseInt(req.params.polyId),
        ...doc.data(),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send('Error getting queue');
  }
};

const getQueueByUserId = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection('hospitals')
        .doc(req.params.id).collection('polyclinics')
        .doc(req.params.polyId).collection('queues')
        .where('userId', '==', req.params.userId)
        .get();
    if (snapshot.empty) {
      res.status(404).send('No queue found');
    } else {
      const queues = [];
      snapshot.forEach((doc) => {
        const queue = {
          'queueId': doc.id,
          ...doc.data(),
        };
        queues.push(queue);
      });
      res.send({queues});
    }
  } catch (error) {
    console.log(error);
    res.status(404).send('Error getting queue');
  }
};

const addQueue = async (req, res, next) => {
  try {
    const data = req.body;
    let date = new Date();
    let day = req.body.scheduledDay;

    const ref = await firestore.collection('hospitals')
        .doc(req.params.id).collection('polyclinics')
        .doc(req.params.polyId);

    const days = await ref.get();
    schedule = days.data().schedule;

    if (!schedule.includes(day)) {
      return res.status(401).send('Invalid scheduled day');
    };


    // For days on the next week
    if (day < date.getDay()) {
      day += 7;
    }
    // Update by time difference
    if (date.getDay()!=day) {
      const newDate = date.getTime() + (86400000 * (day - date.getDay()));
      date = new Date(newDate);
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    const startDate = Timestamp.fromDate(start);
    const endDate = Timestamp.fromDate(end);
    let number = 0;
    let time = 0;

    const snapshot = await ref.collection('summary')
        .doc(date.toDateString()).get();

    if (!snapshot.exists) {
      const queue = {
        ...data,
        'number': number + 1,
        'status': 'OnGoing',
        'date': Timestamp.fromDate(date),
        'estimatedTime': time,
      };

      await ref.collection('summary')
          .doc(date.toDateString())
          .set({
            'number': number + 1,
            'estimatedTime': time,
          });

      const add = await ref.collection('queues').add(queue);
      res.send({
        'queueId': add.id,
        'polyId': parseInt(req.params.polyId),
        ...queue,
      });
    } else {
      time = snapshot.data().estimatedTime;
      number = snapshot.data().number;

      input = await setInput(req.params.id, req.params.polyId, number,
          date, startDate, endDate,
          req.body.scheduledHour,
          req.body.scheduledMinute);

      await axios.post(URL, {
        data: input,
      }).then((response) => {
        time += response.data.result[0];
        console.log(response.data.result[0]);
      });

      const queue = {
        ...data,
        'number': number + 1,
        'status': 'OnGoing',
        'date': Timestamp.fromDate(date),
        'estimatedTime': time,
      };

      await ref.collection('summary')
          .doc(date.toDateString())
          .set({
            'number': number + 1,
            'estimatedTime': time,
          });

      const add = await ref.collection('queues').add(queue);

      res.status(201).send({
        'queueId': add.id,
        'polyId': parseInt(req.params.polyId),
        ...queue,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getCurrentNumber = async (req, res, next) => {
  try {
    const date = new Date(req.body.date);
    const ref = await firestore.collection('hospitals')
        .doc(req.params.id).collection('polyclinics')
        .doc(req.params.polyId);

    const test = await ref.collection('summary').doc(date.toDateString()).get();

    if (!test.exists) {
      return res.status(401).send('No number found');
    }

    const currentNumber = test.data().number;

    res.json({
      'polyId': req.params.polyId,
      'currentNumber': currentNumber,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send('Error processing request');
  }
};

module.exports = {
  getAllQueue,
  addQueue,
  getQueueById,
  getQueueByUserId,
  getCurrentNumber,
};
