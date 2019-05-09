const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

//router
const postsRouter = require('./routes/posts-router');
const userRouter = require('./routes/user-router');
const server = express();

server.use(express.json()); //for posts 
server.use(helmet()); //a little bit of protection
server.use(morgan('dev'));

server.use('/api/users',  userRouter); 
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>We have data showing!</h2>
    <p>I hope...</p>
    `)
});





module.exports = server;