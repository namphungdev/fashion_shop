const express = require('express');
const router = express.Router();

const Post = require('../model/post.js'); 
//get all the  posts
router.get('/', async (req, res) => {
    const allPosts = await Post.find();
    res.json(allPosts);
});

router.get('/:id', async (req, res) => {
    const idpost = await Post.find(req.params.id);
    res.json(idpost);
});

router.post('/', async (req, res) => {
    const newPost = await Post.create(req.body);
    res.json(newPost);
});

router.delete('/', async (req, res) => {
    const newPost = await Post.delete(req.body);
    res.json(newPost);
});

module.exports = router;