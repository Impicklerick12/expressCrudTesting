const express = require('express');
const router = express.Router();
const { getPosts, getPost, makePost } = require('../controllers/post_controller')

// Get all posts
router.get('/', getPosts) 

// Get a particular post
router.get('/:id', getPost)

// Add a post
router.post('/', makePost)

module.exports = router