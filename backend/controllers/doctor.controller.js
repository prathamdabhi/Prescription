import Doctor from "../model/doctor.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import Appointment from "../model/appointment.model.js";

//CHANGE DOCTOR AVAILABILITY
const changeDoctorAvailability = async (req,res)=>{
    try {
        const { docId } = req.body;

        const docData = await Doctor.findById(docId);
        await Doctor.findByIdAndUpdate(docId, { available: !docData.available })
        res.status(200).json({success:true, message:'Doctor availability changed successfully'})
        
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}

// API TO CHANGE DOCTOR-LIST
const doctorList = async (req,res) => {
    try {
        const doctors = await Doctor.find({}).select(['-password','-email']);
        res
        .status(200)
        .json({success:true, doctors})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({success:false, message:error.message})
    }
}

//API FOR DOCTOR LOGIN
const doctorLogin = async (req,res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({success:false, message:'please fill all fields'})
        }
        const doctor = await Doctor.findOne({email});

        if(!doctor){
            return res.status(400).json({success:false, message:'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password,doctor.password);
        if(isMatch){
           const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET);
           return res.status(200).json({success:true, token})
        }else{
            return res.status(400).json({success:false, message:'Invalid credentials'})
        }
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}

// API TO GET DOCTOR APPOINTMENT IN FOR DOCTOR PANNEL
const appointmentsDoctor = async (req,res) => {
    try {
        const { docId } = req.body;
        const appointments = await Appointment.find({docId});
        res.status(200).json({success:true, appointments})
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}
export {changeDoctorAvailability,doctorList,doctorLogin,appointmentsDoctor}