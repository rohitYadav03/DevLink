const express = require("express");
const {UserModel} = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRouter = express.Router();

authRouter.post("/signup", async(req,res) => {
    // signup user 
    const {firstName,lastName,emailId,password,gender,age,bio,imageUrl} = req.body;
    try {        
if(!firstName ||!lastName || !emailId ||!password || !age   ){
    return res.json({message : "Enter all the required field"})
}  

const hashPassword = await bcrypt.hash(password, 10)

const userDetails = new UserModel({
    firstName,
    lastName,
    emailId,
    password : hashPassword,
    gender,
    age,
    bio,
    imageUrl
})
await userDetails.save();

res.send("signup successfully")
    }   
    catch (error) {
        if(error.code === 11000){
            return res.status(400).json({message : "Email already register"})
        }
        
    res.status(400).json({message : error.message})    
    }

})

authRouter.post("/login", async(req,res) => {
  try {
    const {emailId , password} = req.body;

    if(!emailId || !password){
        return res.json({message : "Enter the details"})
    };

const user = await UserModel.findOne({emailId : emailId.toLowerCase()});
if(!user){
    return res.json({message : "Email id is not register"})
}

const passwordCheck = await bcrypt.compare(password,user.password);

if(!passwordCheck){
    return res.json({message : "invalid creadintail"})
}

const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

const loginToken = jwt.sign({id : user._id},process.env.JWT_SCWERT, {expiresIn : "7d"});


res.cookie("loginToken", loginToken, {
  httpOnly : true,
  secure : false , // true in production -> it means HTTPS
  sameSite: "strict",
  expires :  expiryDate
})

res.json({message : "login successfully"})


  } catch (error) {
    res.json({message : error.message})
  }
})


module.exports = {authRouter}