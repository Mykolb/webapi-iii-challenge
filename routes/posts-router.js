const express = require('express');
const postDb = require('../data/helpers/postDb');

const router = express.Router();



//REQUESTS FOR POSTS
//GET
router.get('/posts', (req, res) => {
    postDb
    .get()
    .then(posts => {
        res.status(201).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'The posts information could not be retrieved.'})
    })
})

// GET BY ID
router.get('/posts/:id', (req, res) => {
    const postId = req.params.id;
    console.log('request postId is working')

    if (!postId) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    postDb 
    .getById(postId)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'The posts information could not be retrieved.'})
    })
})


module.exports = router;