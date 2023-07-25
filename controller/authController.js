          const JWT = require("jsonwebtoken");
          const User = require("../models/usermodel");
          const bcrypt = require("bcrypt");
          const Token = require("../models/tokenmodel");
          const crypto=require("crypto")
          const sendEmail = require("./sendEmail");

          //register
          const register= async (req, res) => {

          
            try {
            
              const { name, email, password } = req.body;             
              const oldUser = await User.findOne({ email });
              if (oldUser) {
                return res.status(409).json({error:"User Already Exist. Please Login"});
              }

            
              const hashPassword = await bcrypt.hash(password,10);             
              const user = await User.create({   
                name,       
                email ,
                password: hashPassword,
              });  
              // Create token
              const token = JWT.sign({ user_id: user._id, email },process.env.JWT_SECRET,{expiresIn: "20d"});      
              user.token = token;   
               
              return res.status(200).json({id:user._id,name:user.name,email:user.email,
                message:"registered successfully"});
            } catch (error) {
              console.log(error)
            }
            
          }


          //login
          const login=async (req, res) => { 
              try {    
                const { email, password } = req.body; 
                // Validate if user exist in our database
                const user = await User.findOne({ email:email });
              if(!user){
                return res.status(400).json({error:"New User ? please Register!!"});
              }
                const match = await bcrypt.compare(password, user.password);

              if(match) {                  
                  const token = JWT.sign(
                    { user_id: user._id, email },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "2h",
                    }
                  );
                  user.token = token;        
                  return res.status(200).json(user);
                
              }  
              else{
                return res.status(404).json({error:"password incorrect!!"});
              }    
            }         
            
              catch (error) {
                return res.status(400).json(error);
              }
              // Our register logic ends here
            }

            const getme=async (req, res) => {
            
              // console.log(req.user.id)
              try {
                  const {_id,email,name} = await User.findById(req.user.id);
                return res.status(200).json({_id,email,name});
              } catch (error) {
                  console.log(error);
                return res.status(400).json({error:"An error occured"});
              }
          }

 const getallusers=async (req, res)=>{
try {
  const user = await User.find({});
  return res.status(201).json({data:user});
} catch (error) {
  console.log(error)
 }}
          //forgotpassword
          const forgotPassword=async (req, res) => {
            try {      
                const user = await User.findOne({ email: req.body.email });
                if (!user){
                  return res.status(201).json({error:"user with given email doesn't exist"});
                }         

                let token = await Token.findOne({ userId: user._id });
                if (!token) {
                    token = await new Token({
                        userId: user._id,
                        token: crypto.randomBytes(32).toString("hex"),
                    }).save();
                }
          //link to email with user,token
                const link = `${process.env.CLIENT_URL}/resetpassword/${user._id}/${token.token}`;
                await sendEmail(user.email, "Password reset", link);
                return res.status(200).json({message:"Please check your email inbox for a link to complete the reset"});
            }
            catch (error) {      
              return res.status(400).json(error);
            }
          }


          //Resetpassword
          const resetPassword= async (req, res) => {
            try {     
                const user = await User.findById(req.params.userId);

                if (!user) 
                return res.status(201).json({error:"invalid link or expired"});

                const token = await Token.findOne({
                    userId: user._id,
                    token: req.params.token,
                });

                if (!token)
                return res.status(201).json({error:"invalid link or expired"});

                const hashPassword = await bcrypt.hash(req.body.confirmpassword, 10);
                user.password = hashPassword;
                await user.save();   

                return res.status(200).json({message:"password reset sucessfully"});

            } catch (error) {   
                console.log(error);
            }
          }

          module.exports = {login,register,resetPassword,forgotPassword,getme,getallusers};