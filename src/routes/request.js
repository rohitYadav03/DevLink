const express = require("express");
const { auth } = require("../middleware/auth");
const requestRouter = express.Router();
const {UserModel} = require("../models/userSchema.js");
const {ConnectionModel} = require("../models/connectionSchema.js")
const mongoose = require("mongoose")

requestRouter.post("/send/:status/:userId",auth,async(req,res) => {
   try {
     const status = req.params.status;
    const userId = req.params.userId;

    if(!status || !userId){
        return res.json({message : "enter a details first"})
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
  return res.status(400).json({ message: "Invalid user ID" });
}

    const allowedStatus = ["pass", "like"];
    if(!allowedStatus.includes(status)){
        return res.json({message : "enter a vlaid staus"});
    }

    const user = await UserModel.findById(userId);
if(!user){
    return res.json({message : "enter a vlaid userId to send the request"})
};

if(user._id.toString() === req.user._id.toString()){
    return res.json({message : "you cannot send request to your self"})
};

// dublicate check 
const dublicate = await ConnectionModel.findOne({
    $or : [
        { sender : req.user._id,receiver : userId,},
        {sender : userId, receiver : req.user._id }
    ]
});

if(dublicate){
if(dublicate.sender.toString() == userId.toString() &&  dublicate.receiver.toString() == req.user._id.toString() && dublicate.status === "like" && status === "like")
    {
  dublicate.status = "accepted";
  await dublicate.save();
    return res.status(200).json({ message: "its a match" });
  }
  return res.status(400).json({ message: "Connection already exists." });
}

const connectionDetails = new ConnectionModel({
    sender : req.user._id,
    receiver : userId,
    status
});

await connectionDetails.save()

res.send("request send")

   } catch (error) {
    if(error.code === 11000){
        return res.status(400).json({message : "conenction already exist"})
    }
 res.status(400).json({message : error.message})   
   }
});

requestRouter.get("/received", auth,async(req,res) => {
    const loggedInUser = req.user;    
const userList = await ConnectionModel.find( {receiver: loggedInUser._id, status: "like"}).populate("sender", "-password -emailId -__v -createdAt -updatedAt").select({receiver : 0, createdAt: 0,updatedAt : 0,__v:0 })

res.send(userList)
})

requestRouter.patch("/review/:status/:requestId", auth, async(req,res) => {
try {
        const status = req.params.status;
    const requestId = req.params.requestId;
    if(!status || !requestId){
        return res.json({message : "enter all the feild"})
    }
    const allowedStatus = ["accepted", "rejected"];
    if(!allowedStatus.includes(status)){
        return res.json({message :  "enter a valid status"})
    }
    const request = await ConnectionModel.findOne({_id : requestId, receiver : req.user._id, status : "like"}).select("-__v -createdAt -updatedAt")
  if(!request){
    return res.json({message : "No connection found"})
  }
  request.status = status;
  await request.save();
res.json({ message: "Request updated", updatedRequest: request });
} catch (error) {
    res.status(400).json({message : error.message})
}
})

module.exports = {requestRouter};