const mongoose = require("mongoose");

const connectToDB = async(req,res) => {
    await mongoose.connect("mongodb+srv://rohityadav85801:ApkSBvXBgdOlE5JW@originaltinder.xae1zzc.mongodb.net/DevLink")
};


module.exports = { connectToDB };
