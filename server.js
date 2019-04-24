const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

//router
const postsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json()); //for posts 
server.use(helmet()); //a little bit of protection
server.use(morgan('dev'));

server.use('/api/posts',  postsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>We have data showing!</h2>
    <p>I hope...</p>
    `)
});


module.exports = server;