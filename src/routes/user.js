const express = require("express");
const userRouter = express.Router();
const {auth} = require("../middleware/auth.js");
const {ConnectionModel} = require("../models/connectionSchema.js");
const {UserModel} = require("../models/userSchema.js");

userRouter.get("/connections",auth, async(req,res) => {
try {
     const loggedInUser = req.user;
   const allConnections = await ConnectionModel.find({
    $or : [
        {sender : loggedInUser._id , status : "accepted"},
        {receiver : loggedInUser._id, status : "accepted"}
    ]
   });
   const validUser = allConnections.map((doc) => {
    if(doc.sender.toString() == loggedInUser._id){
  return doc.receiver
    }else{
        return doc.sender;
    }
   })
   

const userDetails = await Promise.all(
   validUser.map(async(userId) => {
    const userInfo = await UserModel.findById(userId).select("-__v -createdAt -updatedAt -blockedUsers");
    return userInfo
   })
);

   res.send(userDetails);
} catch (error) {
  res.status(400).json({message : error.message})
}
});

userRouter.patch("/block/:userId",auth,async(req,res) => {
  const blockUserId = req.params.userId;
  const loggedInUser = req.user;
  try {
    const validUser = await UserModel.findById(blockUserId);
    if(!validUser){
      return res.json({message : "enter a valid user details"})
    }
 if (loggedInUser.blockedUsers.includes(blockUserId)) {
  return res.status(400).json({ message: "User already blocked" });
}
if (loggedInUser._id.toString() === blockUserId) {
  return res.status(400).json({ message: "You cannot block yourself" });
}

loggedInUser.blockedUsers.push(blockUserId);
await loggedInUser.save();
res.json({message : "user blocked"});

  } catch (error) {
    res.status(400).json({message : error.message})
  }
})

userRouter.get("/blocked",auth,async(req,res) =>{
  // get all the blocked user 
  try {
    const loggedInUser = req.user;
    const allBlockedUsers = loggedInUser.blockedUsers;

    const userDetails = await Promise.all(
   allBlockedUsers.map(async(userId) => {
        const userInfo = await UserModel.findById(userId).select("-__v -createdAt -updatedAt -password");
        return userInfo;
      })
    )
    if(!userDetails){
      return res.json({message : "You haven't blocked anyone yet"});
    }
res.send(userDetails);
  } catch (error) {
    res.status(400).json({message : error.message})
   }
});


userRouter.get("/feed", auth,async(req,res) => {
  try {
    // first lets get all the users;
const loggedInUser = req.user;
console.log("Logged in user ID:", req.user._id);

const connectionsRequest = await ConnectionModel.find({
  $or : [
    {sender : loggedInUser._id},
    {receiver : loggedInUser._id}
  ]
});
const hideUser = new Set();
   connectionsRequest.forEach((conn) => {
  hideUser.add(conn.sender.toString());
  hideUser.add(conn.receiver.toString());
});

const freshUsers = await UserModel.find({
  _id: { $nin: Array.from(hideUser) }
}).select("-password -__v -createdAt -updatedAt");

res.send(freshUsers);

} catch (error) {
    res.status(400).json({message : error.message})
  }
})


module.exports  = {userRouter}