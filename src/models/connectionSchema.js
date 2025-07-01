const mongoose = require("mongoose");

const connectionSchema  = new mongoose.Schema({
    sender : {
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : true
    },
    receiver : {
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : true,
         
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : ["pass", "like", "rejected", "accepted"],
            message : "Enter a valid status"
        }
    }
},{timestamps : true});

connectionSchema.index({sender : 1, receiver : 1}, {unique : true});

const ConnectionModel = new mongoose.model("connection", connectionSchema);

module.exports = {ConnectionModel};