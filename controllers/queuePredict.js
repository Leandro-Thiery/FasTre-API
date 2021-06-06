const firebase = require('firebase-admin');
const db = require('../db');
const firestore = db.firestore();
const Timestamp = firebase.firestore.Timestamp;

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

  // const numAddOnsLastW2 = await ref.collection('queues')
  //     .where('date', '>=', startDate)
  //     .where('date', '<=', datew2)
  //     .where('status', '==', 'OnGoing')
  //     .orderBy('date', 'desc')
  //     .orderBy('number', 'asc')
  //     .get();
  // let numAddOnsW2 = 0;
  // numAddOnsLastW2.forEach((doc) => {
  //   numAddOnsW2 += 1;
  // });

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
  // input[0][24] = numAddOnsW2;
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
  setInput,
  getDateofYear,
};
