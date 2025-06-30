const express = require("express");
const {connectToDB} = require("./config/db.js");
require("dotenv").config();
const {authRouter} = require("./routes/auth.js")
const cookieParser  = require("cookie-parser");
const {profileRouter} = require("./routes/profile.js")

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/profile",profileRouter);


connectToDB().then(() => {
    console.log("connected to DB");
app.listen(process.env.PORT, () => {
    console.log("running in ",process.env.PORT); 
})
}).catch((err) => console.log(`ERROR CONNECTION TO DB ${err}`))