const express = require('express');
const { auth } = require("../middleware/auth.js");
const { UserModel } = require('../models/userSchema.js');
const profileRouter = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt")

profileRouter.get("/view", auth, (req,res) => {
   
  const { firstName, lastName, emailId, gender, age, bio, imageUrl } = req.user;
res.json({ firstName, lastName, emailId, gender, age, bio, imageUrl });
});

profileRouter.patch("/edit",auth,async(req,res) => {
      try {
        const { firstName, lastName, age, bio, imageUrl } = req.body;
const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, {
    firstName, lastName, age, bio, imageUrl
},{runValidators : true, new : true})
res.json(updatedUser);
      } catch (error) {
        res.status(400).json({message : `ERROR : ${error.message}`})
      }
    })

profileRouter.patch("/password", auth, async(req,res) => {
    const {currentPassword, newPassword} = req.body;
   try {
    if(currentPassword === newPassword){
        return res.json({message : "You cannot enter current Password and new Password as same"})
    }
const correctCurrentPassword = await bcrypt.compare(currentPassword,req.user.password)
if(!correctCurrentPassword){
    return res.status(400).json({message : "Current password is not correct"});
}
if(!validator.isStrongPassword(newPassword)){
    return res.json({message : "enter a strong new password"})
};

const newHashPassword = await bcrypt.hash(newPassword,10)

const updatePassword = await UserModel.findByIdAndUpdate(req.user._id, {password : newHashPassword}, {runValidators : true, new : true})

res.json({message : "password updated successfully"});

} catch (error) {
            res.status(400).json({message : `ERROR : ${error.message}`})
   }
})


module.exports = {profileRouter};