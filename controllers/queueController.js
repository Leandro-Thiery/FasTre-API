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
          'userId': doc.data().userId,
          'number': doc.data().number,
          'estimatedMin': doc.data().estimatedMin,
          'date': doc.data().date,
          'status': doc.data().status,
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
        ...doc.data(),
      });
    }
  } catch (error) {
    console.log(error);
    res.send('Error getting queue');
  }
};

const addQueue = async (req, res, next) => {
  try {
    const data = req.body;
    const date = new Date(req.body.date);
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    const startDate = Timestamp.fromDate(start);
    const endDate = Timestamp.fromDate(end);
    let number = 1;
    let time = 0;

    const ref = await firestore.collection('hospitals')
        .doc(req.params.id).collection('polyclinics')
        .doc(req.params.polyId);
    const snapshot = await ref.collection('queues')
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .orderBy('date', 'desc')
        .orderBy('number', 'desc')
        .get();
    if (snapshot.empty) {
      const queue = {
        ...data,
        'number': number,
        'status': 'OnGoing',
        'date': Timestamp.fromDate(date),
        'estimatedTime': time,
      };

      const add = await ref.collection('queues').add(queue);
      res.send({
        'queueId': add.id,
      });
    } else {
      snapshot.forEach((doc) => {
        if (doc.data().number > number) {
          number = doc.data().number;
          time += doc.data().estimatedTime;
        };
      });

      input = await setInput(req.params.id, req.params.polyId, number,
          date, startDate, endDate,
          req.body.scheduledHour,
          req.body.scheduledMinute);

      console.log(input);

      await axios.post(URL, {
        data: input,
      }).then((response) => {
        time += response.data.result[0];
      });

      const queue = {
        ...data,
        'number': number + 1,
        'status': 'OnGoing',
        'date': Timestamp.fromDate(date),
        'estimatedTime': time,
      };

      const add = await ref.collection('queues').add(queue);
      res.status(201).send({
        'queueId': add.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getCurrentNumber = async (req, res, next) => {
  try {
    const date = new Date(req.body.date);
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    const startDate = Timestamp.fromDate(start);
    const endDate = Timestamp.fromDate(end);

    const ref = await firestore.collection('hospitals')
        .doc(req.params.id).collection('polyclinics')
        .doc(req.params.polyId);

    const current = await ref.collection('queues')
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .where('status', '==', 'OnGoing')
        .orderBy('date', 'desc')
        .orderBy('number', 'asc')
        .get();
    let currentNumber = 1;
    current.forEach((doc) => {
      if (doc.data().number > currentNumber) {
        currentNumber = doc.data().number;
      };
    });
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
  getCurrentNumber,
};
