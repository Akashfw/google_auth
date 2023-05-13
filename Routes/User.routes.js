const express = require("express");
require("dotenv").config();
const {client}= require("../redis/redis");
const jwt = require("jsonwebtoken")
const userRouter = express.Router();
const cors= require("cors");
const {usermodel} = require("../Models/User.model");
const {passport} = require("../Configs/google.Oauth")

userRouter.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
   // callback url after login with google
userRouter.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),
     async function  (req, res) {
      console.log(req.user);
      let user=req.user;
      const token =  jwt.sign({email:user.email,userID:user._id},process.env.token_key,{expiresIn:"1d"});
             client.SET(`${token}`,token);
             client.EXPIRE(`${token}`, 86400);
      // token bhejna hai and then redirect karn hai
      res.redirect(`http://127.0.0.1:5501/Frontend/Html/Landingpage.html?&email=${user.email}&id=${token}&first_name=${user.fname}&last_name=${user.lname}`);
      
    }
  );






module.exports={
    userRouter
}



// file:///C:/Users/aamma/Desktop/akash%20important/Budget%20management/Frontend/Html/Login.html