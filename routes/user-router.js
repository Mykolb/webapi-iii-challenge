const express = require('express');
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

//GET BY ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    console.log('request userId is working')

    if (!userId) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    userDb 
    .getById(userId)
    .then(user => {
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

    if (!req.body.name) {
        res.status(400).json({ errorMessage: "Please provide id and name for the user." })
    }

    userDb
    .insert(userInfo)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error while saving the user to the database'})
    })
})

//UPDATE
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const userInfo = req.body;
    console.log('request body:', userInfo);

    if (!userId) {
        res.status(404).json({ message: "The user with the specified ID does not exist."  })
    } 

    userDb
    .update(userId, userInfo)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json({ error: err, message: "The user information could not be modified."})
    })
})

//DELETE
router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

    userDb
    .remove(userId)
    .then(deleted => {
        res.status(201).end();
    })
    .catch(error => {
        res.status(500).json({ error: err, message: "The user could not be removed." })
    })

})



module.exports = router;