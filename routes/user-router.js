const express = require('express');
const userDb = require('../data/helpers/userDb');

const router = express.Router();
//custom middleware
// const caps = require('../data/middleware/allCaps');

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

//GET BY ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log('request userId is working')

    if (id === 0) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    userDb 
    .getById(id)
    .then(user => {
        if(id === 0) {}
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'The users information could not be retrieved.'})
    })
})

//POST
router.post('/', (req, res) => {
    const userInfo = req.body;
    console.log('userInfo');

    userDb
    .insert(userInfo)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error while saving the user to the database'})
    })
})


//GET USER POSTS
//NEED TO GET THIS WORKING
router.get('/posts/:id', (req, res) => {
    const userId = req.params;
    console.log('Get user posts is working')

    userDb
    .getUserPosts(userId)
    .then(userPosts => {
        res.status(201).json(userPosts);
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'Could not find post associated with this user.'})
    })
})

//UPDATE
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;
    console.log('request body:', userInfo);

    if (!id) {
        res.status(404).json({ message: "The user with the specified ID does not exist."  })
    } 

    userDb
    .update(id, userInfo)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json({ error: err, message: "The user information could not be modified."})
    })
})

//DELETE
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

    userDb
    .remove(id)
    .then(deleted => {
        res.status(201).end();
    })
    .catch(error => {
        res.status(500).json({ error: err, message: "The user could not be removed." })
    })

})



module.exports = router;