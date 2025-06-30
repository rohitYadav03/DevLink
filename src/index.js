const express = require("express");
const {connectToDB} = require("./config/db.js");
require("dotenv").config();
const {authRouter} = require("./routes/auth.js")


const app = express();
app.use(express.json());

app.use("/auth", authRouter);

connectToDB().then(() => {
    console.log("connected to DB");
app.listen(process.env.PORT, () => {
    console.log("running in ",process.env.PORT); 
})
})