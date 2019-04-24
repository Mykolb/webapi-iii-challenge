const express = require('express');

const postDb = ('./posts/postDb.js');

const router = express.Router();


//REQUESTS FOR POSTS /api/posts
//GET 
router.get('/', (req, res) => {
    postDb
    .find()
    .then(posts => {
        res.status.apply(201).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'The posts information could not be retrieved.'})
    })
})





module.exports = router;