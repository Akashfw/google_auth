const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String,require:true,unique:true},
    password:{type:String,required:true},
    mobile:{type:Number},
    avatar:{type:String},
    address:{type:String},
    dob:{type:Date},
    createdAt:{type: Date,default: Date.now}
},{
    versionKey:false
})

const usermodel = mongoose.model("user",userSchema);

module.exports = {usermodel}