const db = require("../database/models");

const headerMiddleware = async(req,res,next)=>{
    try {
        res.locals.categories = await db.ProductCategory.findAll();
        return next();
    } catch (error) {
        console.log("falle en headerMiddleware: " + error);
        return res.json(error)
    }
    

}

module.exports = headerMiddleware