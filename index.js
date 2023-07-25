const express=require("express")
// const {sendemail} =require('./controller/sendEmail');
const dotenv=require('dotenv').config();
const cors=require('cors')
const bodyParser=require('body-parser');
const main = require("./dbConnection/dbConnection");
const {bulkmail} = require("./controller/bulkemailsender");


const app=express();
main();
const PORT=process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
res.json({message:"capstone server"})
})

app.post("/bulkemail",bulkmail)

//router
app.use("/auth",require("./routes/Authroute"));
app.use("/contact",require("./routes/contactroute"))
app.use("/review",require("./routes/Reviewroute"))


app.listen(PORT,()=>{
    console.log(`server started ${PORT}`)
    })


