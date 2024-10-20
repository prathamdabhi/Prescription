import validator from "validator"
import bcrypt from 'bcrypt'
import User from "../model/user.model.js"
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
//API TO REGISTER USER
const registerUser = async (req,res) => {
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:'please fill all fields'})
        }
        //verify email
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:'please enter a valid email'})
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        //validate password
        if(password.length < 8){
            return res.status(400).json({success:false,message:'password must be at least 8 characters'})
        }
        //create User
        const createUseer= {
            name,
            email,
            password:hashPassword
        }

        const newUser = await User(createUseer)
        const user = await newUser.save()
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res
        .status(200)
        .json({success:true,user,token})
    } catch (error) {
        console.log(error.message)
        res
        .status(400)
        .json({success:false,message:error.message})
    }
}

//API FOR USER LOGIN
const userLogin = async (req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({success:false,message:'please fill all fields'})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:'user not found'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res
            .status(200)
            .json({success:true,token})
        }else{
            return res.status(400).json({success:false,message:'invalid credentials'})
        }

        

    } catch (error) {
        console.log(error.message)
        res
        .status(400)
        .json({success:false,message:error.message})
    }
}

//API USER DATA FOR PROFILE
const getProfileData = async (req,res) =>{
    try {
        const {userId} = req.body;
        const userData = await User.findById(userId).select('-password')
        res
        .status(200)
        .json({success:true,userData})
    } catch (error) {
        console.log(error.message)
        res
        .status(400)
        .json({success:false,message:error.message})
    }
}

//API FOR UPDATE USER DATA
const updateUserProfile = async (req,res) => {
    try {
        const {userId,name,phone,address,gender,dob} = req.body
        const imageFile = req.file
        if(!name || !phone || !gender || !dob){
            return res.status(400).json({success:false, message:'please fill all fields'})
        }

        const userdata = await User.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),gender,dob})
        if(imageFile){
            const upoadImage = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = upoadImage.secure_url
            await User.findByIdAndUpdate(userId,{image:imageUrl})
        }
        res.status(200).json({success:true, message:'user data updated successfully'})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}

export {registerUser,userLogin,getProfileData,updateUserProfile}