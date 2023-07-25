
const asynchandler=require('express-async-handler');
const Contact=require('../models/contactmodel');
const User=require('../models/usermodel')
/**
 * method:GET
 * path:/contact
 * access:public
 */
const getcontacts=asynchandler(async(req,res)=>{
   
    const contacts=await Contact.find({user:req.query.user});
    
   return res.status(200).json(contacts)
})
/**
 * method:POST
 * path:/contact
 * 
 */
const createcontact=asynchandler(async(req,res)=>{
    // console.log(req.body)
    const {user, email, phonenumber, name, gender, location }=req.body;
    if(!name||!email||!phonenumber||!gender||!location){
        res.status(400);
        throw new Error("all fields are required")
    }
    const contact= await Contact.create({
        name,email,phonenumber,gender, location,user
      
    })
    
    return res.status(201).json({message:"contact created",data:contact})
})
/**
 * method:PUT
 * path:/contact/:id
 * 
 */


const updatecontact=async(req,res)=>{    
    try {
      const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    const updatedcontact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({message:"updated successfully",data:updatedcontact})
    } catch (error) {
      res.status(400).json(error)
    }
  }
/**
 * method:GET
 * path:/contact/:id
 *
 */
const getcontact=asynchandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }    
    return res.status(200).json(contact)
})
/**
 * method:DELETE
 * path:/contact/:id
 * 
 */
const deletecontact=asynchandler(async(req,res)=>{
    const { id } = req.params;
    const contact=await Contact.findByIdAndRemove({ _id: id });
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }   
    return res.status(200).json(contact)
})



module.exports={getcontacts,createcontact,updatecontact,getcontact,deletecontact};