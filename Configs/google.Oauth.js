var passport = require("passport");
const { usermodel } = require("../Models/User.model");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const uuid = require("uuid").v4;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://nice-tan-train.cyclic.app/user/auth/google/callback",
      
    },
    
    async function (accessToken, refreshToken, profile, cb) {
      if(profile._json.email_verified){
        const user = await usermodel.findOne({email:profile.emails[0].value})
        if(user) {
          return cb(null, user); 
        }
        let name=profile._json.name;
        let Fname= name.split(" ")[0];
        let Lname= name.split(" ")[1];
        const newuser = new usermodel({
          fname: Fname,
          lname:Lname,
          email: profile._json.email,
          password: uuid(),
          avatar: profile.photos[0].value,
        });
        await user.save();
        // console.log(profile)
        return cb(null, newuser);  
      }
      
    }
  )
);

module.exports = {passport};