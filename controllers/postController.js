const firebase = require('firebase-admin');
const db = require('../db');
const Post = require('../models/post');
const firestore = db.firestore();
const Timestamp = firebase.firestore.Timestamp;

const getAllPost = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection('posts').get();
    if (snapshot.empty) {
      res.status(404).send('No posts found');
    } else {
      const posts = [];

      snapshot.forEach((doc) => {
        const post = new Post(
            doc.id,
            doc.data().date,
            doc.data().postTitle,
            doc.data().postContent,
            doc.data().imgURL,
        );
        posts.push(post);
      });
      res.send(posts);
      console.log(posts);
    }
  } catch (error) {
    console.log(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection('posts').doc(req.params.id);
    const doc = await snapshot.get();
    if (!doc.exists) {
      res.status(404).send('No post found');
    } else {
      const post = new Post(
          doc.id,
          doc.data().date,
          doc.data().postTitle,
          doc.data().postContent,
          doc.data().imgURL,
      );
      res.send(post);
    }
  } catch (error) {
    console.log(error);
  }
};

const addPost = async (req, res, next) => {
  try {
    const data = req.body;
    const newPost = {
      ...data,
      'date': Timestamp.fromDate(new Date()),
    };
    const post = await firestore.collection('posts').add(newPost);
    res.send({
      'id': post.id,
      ...newPost,
    });
  } catch (error) {
    res.status(400).send('Error adding post');
    console.log(error);
  }
};

module.exports = {
  getAllPost,
  getPostById,
  addPost,
};
