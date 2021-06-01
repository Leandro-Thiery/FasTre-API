const express = require('express');
const {
  getAllPost,
  getPostById,
  addPost,
  updatePost,
} = require('../controllers/postController');

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/')
    .get(getAllPost)
    .post(addPost);

router.route('/:id')
    .get(getPostById)
    .put(updatePost);

module.exports = router;
