const db = require('../db');
const Post = require('../models/post');
const firestore = db.firestore();

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
      res.send({posts});
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
      res.send({post});
    }
  } catch (error) {
    console.log(error);
  }
};

const addPost = async (req, res, next) => {
  try {
    const data = req.body;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dateString = `${day}/${month}/${year}, ${hours}:${minutes}`;
    const newPost = {
      ...data,
      'date': dateString,
    };
    await firestore.collection('posts').add(newPost);
    res.status(201).send('Succesfully added');
  } catch (error) {
    res.status(400).send('Error adding post');
    console.log(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dateString = `${day}/${month}/${year}, ${hours}:${minutes}`;
    const newPost = {
      ...data,
      'date': dateString,
    };
    await firestore.collection('posts').doc(id).update(newPost);
    res.send('Succesfully updated');
  } catch (error) {
    res.status(400).send('Error updating post');
  }
};

module.exports = {
  getAllPost,
  getPostById,
  addPost,
  updatePost,
};
