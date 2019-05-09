//middleware function
function allCaps(req, res, next) {
    const name = req.body.name;
   
    if (!name) {
         res.status(400).json({error: 'Names need to be uppercase!'})
    }
    
       const allCaps = name.toUpperCase(); 
    
    req.body.name = allCaps;
    next();
};


module.exports = allCaps;