// this is the auth middleware for the protected routes
const jwt = require("jsonwebtoken");
const {UserModel} = require("../models/userSchema.js")
require("dotenv").config()

const auth = async(req,res,next) => {
   try {
           const token = req.cookies.loginToken;
           if(!token){
               return res.status(400).json({message : "no token found"})
           }
           const decode = jwt.verify(token,process.env.JWT_SCWERT);
           const user = await UserModel.findById(decode._id);
           if(!user){
               return res.json({message : 'login again'})
           };
           req.user = user;
           next()
       } catch (error) {
          res.status(400).json({message : `ERROR : ${error.message}`}) 
       }
}
 module.exports = {auth};