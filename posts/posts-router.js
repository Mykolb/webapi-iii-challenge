const express = require('express');

const postDb = require('../data/helpers/postDb');
const userDb = require('../data/helpers/userDb');

const router = express.Router();


//REQUESTS FOR USERS /api/posts
//GET 
router.get('/', (req, res) => {
    userDb
    .get()
    .then(users => {
        res.status(201).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: err, message: "You messed up! I don't see any users."})
    })
})











//REQUESTS FOR POSTS
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











module.exports = router;