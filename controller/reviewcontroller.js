
const asynchandler=require('express-async-handler');
const Review=require('../models/reviewmodel');

/**
 * method:GET
 * path:/review
 */
const getreviews=asynchandler(async(req,res)=>{   
    const reviews=await Review.find({user:req.query.user});   
   return res.status(200).json(reviews)
})


/**
 * method:POST
 * path:/review
 * 
 */
const createreview=asynchandler(async(req,res)=>{
    // console.log(req.body)
    const {name,email,user,review }=req.body;
    if(!review){
        res.status(400);
        throw new Error("all fields are required")
    }
    const reviewdata= await Review.create({
        name,email,user,review
    })
    
    return res.status(200).json(reviewdata)
})


/**
 * method:GET
 * path:/review/allreviews
 * 
 */
const  getallreviews=asynchandler(async(req,res)=>{
    const reviews=await Review.find().sort({_id: -1}).limit(3)   
    return res.status(200).json(reviews)
})


/**
 * method:DELETE
 * path:/review/:id
 * access:public
 */
const deletereview=asynchandler(async(req,res)=>{
    const review=await Review.findByIdAndRemove(req.params.id);
    if(!review){
        res.status(404)
        throw new Error("review not found")
    }   
    return res.status(200).json({message:`review at ${req.params.id}`,data:review})
})


module.exports={getreviews,getallreviews,deletereview,createreview};