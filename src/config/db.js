const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // no options needed
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    throw error;
  }
};

module.exports = { connectToDB };



// Rohit@1234
// mongodb+srv://rohit:Rohit@1234@devlink.ijf5ebz.mongodb.net/