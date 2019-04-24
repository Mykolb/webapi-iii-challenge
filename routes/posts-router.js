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

//POST
router.post('/', (req, res) => {
    const postInfo = req.body;
    console.log('postInfo');

    if (!req.body.text || !req.body.user_id) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }

    postDb
    .insert(postInfo)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error while saving the post to the database'})
    })
})


//UPDATE
router.put('/:id', (req, res) => {
    const postId = req.params.id;
    const postInfo = req.body;
    console.log('request body:', postInfo);

    if (!postId) {
        res.status(404).json({ message: "The post with the specified ID does not exist."  })
    } 

    postDb
    .update(postId, postInfo)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(error => {
        res.status(500).json({ error: err, message: "The post information could not be modified."})
    })
})

router.delete('/:id', (req, res) => {
    const postId = req.params.id;

    if (!postId) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }

    postDb
    .remove(postId)
    .then(deleted => {
        res.status(201).end();
    })
    .catch(error => {
        res.status(500).json({ error: err, message: "The post could not be removed." })
    })

})


module.exports = router;