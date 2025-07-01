const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 50,
        trim : true,
    },
   lastName : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 50,
        trim : true,
    },
    emailId : {
        type : String,
        unique : true,
        required : true,
        minlength : 2,
        maxlength : 100,
        trim : true,
        lowercase : true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Enter a valid email");
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 200,
        validate(val){
            if(!validator.isStrongPassword(val)){
                throw new Error("Enter a strong password");
            }
        }
    },
    gender : {
        type : String,
        enum : {
            values : ["male", "female", "others"],
            message : "Enter a valid gender",
        }
    },
    age : {
        type : Number,
        min : 18,
        required : true
    },
    bio : {
        type : String,
        maxlength : 200,
        default : "hii I am using devlink for connecting to other devlopers"
    },
    imageUrl : {
        type : String,
        maxlength : 200,
        validate(val){
            if(!validator.isURL(val)){
                throw new Error("Enter a valid image url");
            }
        }
    },
    blockedUsers :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }]
}, {timestamps : true})

const UserModel = mongoose.model("user", userSchema);

module.exports = {UserModel};