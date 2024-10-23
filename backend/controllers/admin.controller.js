import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import { json } from "express"
import Doctor from "../model/doctor.model.js"
import jwt from 'jsonwebtoken'
import Appointment from "../model/appointment.model.js"
//add doctor
const addDoctor = async (req,res)=>{
   try {
     const {name,email,password,speciality,experience,degree,about,fees,address} = req.body
     const imageFile = req.file
    //check all filds are filled
     if(!name || !email || !password || !speciality || !experience || !degree){
        return res.status(400).json({success:false, message:'please fill all fields'})
     }
     //validating email
     if (!validator.isEmail(email)) {
        return res.status(400).json({success:false, message:'please enter a valid email'})
     }
    //validating password
    if (password.length < 8) {
        return res.status(400).json({success:false, message:'password must be at least 8 characters'})
    }
    //hasing password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    //uplload image to cloudinary
    const uploadImage = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
    const imageUrl = uploadImage.secure_url

    //create doctor
    const doctorData = {
        name,
        email,
        password:hashPassword,
        image:imageUrl,
        speciality,
        experience,
        degree,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now()
    }

    const doctor = await Doctor(doctorData)
    await doctor.save()

    res
    .status(201)
    .json({success:true, doctor})
     }catch (error) {
    console.log(error.message)
    res
    .status(400)
    .json({success:false, message:error.message})
   }
}
//ADMIN LOGIN
const loginAdmin = async (req,res) => {
   try {
      const {email,password} = req.body
      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
         const token = jwt.sign(email+password,process.env.JWT_SECRET)
         res.status(200).json({success:true, token})
      }else{
         return res.status(400).json({success:false, message:'Invalid credentials'})
      }

   } catch (error) {
      console.log(error.message)
      res.status(400).json({success:false, message:error.message})
   }
}
// API to get all doctors list for admin pannel
const getDoctorList = async (req,res) => {
   try {
      const doctors = await Doctor.find({}).select('-password') 
      res.status(200).json({success:true, doctors})
   } catch (error) {
      console.log(error.message)
      res.status(400).json({success:false, message:error.message})
   }
}

//API TO GET ALL APPOINTMENTS LIST
const appointmentAdmin = async (req,res) => {
   try {
      const appointments = await Appointment.find({})
      res.status(200).json({success:true, appointments})
   } catch (error) {
      res.status(400).json({success:false, message:error.message})
   }
}

export {addDoctor,loginAdmin,getDoctorList,appointmentAdmin}