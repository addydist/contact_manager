const asyncHandler=require('express-async-handler');
const User=require('../models/usermodel')
const brcypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const registerUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All the field are mandatory")
    }
    const userAvailable=await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("Email exist ") 
    }
    const hashedPassword= await brcypt.hash(password,10);
    console.log("The hased password is :",hashedPassword)
    const user=await  User.create({
        username, email,password:hashedPassword
    })
    console.log(`user created ${user}`)
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400)
        throw new Error("the user details are not valid")
    }
    res.json({ message: "User Registered" });
})
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All thge fields are mandatory!!") 
    }
    const user=await User.findOne({email});
    if(user && (await brcypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },process.env.ACCESS_TOKEN_SECERT,{expiresIn:"15m"})

        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error('Invalid Email or password')
    }
    res.json({ message: "User loged in" });
})
const currentUser=asyncHandler(async(req, res) => {
    res.json(req.user);
  });
module.exports={
    registerUser,
    loginUser,
    currentUser
} 