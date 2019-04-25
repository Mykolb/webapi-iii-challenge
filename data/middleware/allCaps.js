//middleware function
function allCaps(req, res, next) {
    const name = req.body.name;
    const allCaps = name.toUpperCase;


    if (name === name.toUpperCase) {
        next();
    } else {
        res.status(400).send('Names need to be uppercase!')
    }

};


module.exports = allCaps;