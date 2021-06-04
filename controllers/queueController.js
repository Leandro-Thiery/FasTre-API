const firebase = require('firebase-admin');
const db = require('../db');
const firestore = db.firestore();
const Timestamp = firebase.firestore.Timestamp;
const axios = require('axios');
const URL = 'https://waitestimatorapp-r6te2wbmrq-et.a.run.app/predict';


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

const setInput = async (id, polyId, number,
    date, startDate, endDate, scheduledHour, scheduledMinute) => {
  const input = [[
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0]];

  const timeStampDate = Timestamp.fromDate(date);

  const ref = await firestore.collection('hospitals')
      .doc(id).collection('polyclinics')
      .doc(polyId);

  const finished = await ref.collection('queues')
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)
      .where('status', '==', 'Finished')
      .orderBy('date', 'desc')
      .orderBy('number', 'asc')
      .get();
  let numOfFinished = 0;
  finished.forEach((doc) => {
    numOfFinished += 1;
  });

  const datew1 = Timestamp
      .fromDate(new Date(date.getTime() - (1000 * 60 * 30)));
  const date1 = await ref.collection('queues')
      .where('date', '>=', datew1)
      .where('date', '<=', timeStampDate)
      .where('status', '==', 'Finished')
      .orderBy('date', 'desc')
      .orderBy('number', 'asc')
      .get();
  let numCompletedW1 = 0;
  date1.forEach((doc) => {
    numCompletedW1 += 1;
  });

  const datew2 = Timestamp
      .fromDate(new Date(date.getTime() - (1000 * 60 * 60)));
  const date2 = await ref.collection('queues')
      .where('date', '>=', datew2)
      .where('date', '<=', timeStampDate)
      .where('status', '==', 'Finished')
      .orderBy('date', 'desc')
      .orderBy('number', 'asc')
      .get();
  let numCompletedW2 = 0;
  date2.forEach((doc) => {
    numCompletedW2 += 1;
  });

  const datew3 = Timestamp
      .fromDate(new Date(date.getTime() - (1000 * 60 * 60)));
  const date3 = await ref.collection('queues')
      .where('date', '>=', datew3)
      .where('date', '<=', timeStampDate)
      .where('status', '==', 'Finished')
      .orderBy('date', 'desc')
      .orderBy('number', 'asc')
      .get();
  let numCompletedW3 = 0;
  date3.forEach((doc) => {
    numCompletedW3 += 1;
  });

  const numAddOnsToday = await ref.collection('queues')
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)
      .where('status', '==', 'OnGoing')
      .orderBy('date', 'desc')
      .orderBy('number', 'asc')
      .get();
  let numAddOns = 0;
  numAddOnsToday.forEach((doc) => {
    numAddOns += 1;
  });

  const numAddOnsLastW2 = await ref.collection('queues')
      .where('date', '>=', startDate)
      .where('date', '<=', datew2)
      .where('status', '==', 'OnGoing')
      .orderBy('date', 'desc')
      .orderBy('number', 'asc')
      .get();
  let numAddOnsW2 = 0;
  numAddOnsLastW2.forEach((doc) => {
    numAddOnsW2 += 1;
  });

  if (number == 1) {
    input[0][9] = 0;
  } else {
    input[0][9] = 1;
  }
  if (polyId == 1) {
    input[0][4] = 1;
  }
  if (polyId == 2) {
    input[0][3] = 1;
  }
  if (polyId == 3) {
    input[0][5] = 1;
  }
  input[0][10] = date.getDay();
  input[0][11] = date.getMonth() + 1;
  input[0][12] = getDateofYear(date);
  input[0][14] = numOfFinished;
  input[0][15] = numCompletedW1;
  input[0][16] = numCompletedW2;
  input[0][17] = numCompletedW3;
  input[0][23] = numAddOns;
  input[0][24] = numAddOnsW2;
  input[0][26] = scheduledHour;
  input[0][27] = scheduledMinute;

  return input;
};

const getDateofYear = (date) => {
  const today = date;
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today - startOfYear;
  // Milliseconds in a day;
  const day = 86400000;
  const dayOfYear = Math.floor(diff / day);
  return dayOfYear;
};


module.exports = {
  getAllQueue,
  addQueue,
  getQueueById,
  getCurrentNumber,
};
