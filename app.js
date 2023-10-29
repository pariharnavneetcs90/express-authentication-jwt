//.env import kana pade ga
require("dotenv").config();
const express = require("express");
const app = express();
//this below is router hum log alag se de ga router
const userRouter =require("./api/users/user.router");

app.use(express.json());//this is done because user is giving data in json this code convert that into js

app.use("/api/users",userRouter);
//upar wala bhi router hai niche wala code bhi router hai
// app.get("/",(req,res)=>{
//     res.json({
//         success :1,
//         message: "nana"
//     });
// });


// (niche process.env.APP_PORT) is liye likha direct 3000 port nahi diya kyo ki security ke liye to .env file me likh ke import kiya
app.listen(process.env.APP_PORT,()=>{
    console.log("sever is running in 3000")
});