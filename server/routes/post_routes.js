const express = require('express');
const router = express.Router();
const { getPosts, getPost, makePost, changePost } = require('../controllers/post_controller')

// Get all posts
router.get('/', getPosts) 

// Get a particular post
router.get('/:id', getPost)

// Add a post
router.post('/', makePost)

// Update a post
router.put("/:id", changePost)

module.exports = router