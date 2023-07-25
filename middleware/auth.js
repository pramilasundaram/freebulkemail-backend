const jwt = require("jsonwebtoken");
const User=require("../models/usermodel")

const auth =async (req, res, next)=> {
  let token;
    try{
      token=req.query.auth||req.headers.Authorization.split(' ')[1];
       console.log(token)
      const decode=jwt.verify(token,process.env.JWT_SECRET);
      console.log(decode)
      req.user=await User.findById(decode.user_id).select('-password');
    console.log(req.user)
    next();
    
  } catch(error) {
    return res.status(401).json({ error: "wrong Token Provided." })
  }
  if(!token){
    return res.status(401).json({ error: "Not authorized,no token." })
  }

}

module.exports = {auth};