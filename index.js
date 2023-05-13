const express = require("express");

require("dotenv").config()
const cors = require("cors");
const {userRouter}= require("./Routes/User.routes")
const {connection} = require("./Configs/db");

const app= express();
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

app.use("/user",userRouter);

app.get("/",(req,res)=>{
    res.send("data....")
});

// app.get("/loginwelcome", async (req,res)=>{
//     // const token = await jwt.sign({email,userID:isUser._id},process.env.token_key,{expiresIn:"1d"});
//     // client.SET(`${token}`,token);
//     // client.EXPIRE(`${token}`, 86400);
//     // res.sendFile(path.join(__dirname,"./Frontend/Html/Landingpage.html"));
//     res.redirect('../Frontend/Html/Landingpage.html');
// })





app.listen(process.env.PORT,async ()=>{
    try{
        await connection;
        // await client.connect();
        console.log("Connected to DB")
    }catch(error){
        console.log(error.message)
    }
    console.log("running on PORT "+process.env.PORT)
})