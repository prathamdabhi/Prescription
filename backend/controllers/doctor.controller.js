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

//API TO MARK APPOINTMENT COMPLETED FOR DOCTOR PANNEL
const appointmentCompleted = async (req,res) => {
    try {
        const { docId , appointmentId } = req.body;
        const appointmentData = await Appointment.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId){
            await Appointment.findByIdAndUpdate(appointmentId,{isCompleted:true});
            res.status(200).json({success:true, message:'appointment Completed'})
        }else{
            res.status(400).json({success:false, message:'something went wrong'})
        }
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}

//API TO CANCEL APPOINTMENT  FOR DOCTOR PANNEL
const appointmentCancel = async (req,res) => {
    try {
        const { docId , appointmentId } = req.body;
        const appointmentData = await Appointment.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId){
            await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true});
            res.status(200).json({success:true, message:'Appointment cancelled'})
        }else{
            res.status(400).json({success:false, message:'something went wrong'})
        }
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}

//API TO GET DASHBOARD DATA FOR DOCTOR PANNEL
const doctorDashboard = async(req,res) => {
    try {
        const {docId} = req.body;
        const   appointments = await Appointment.find({docId});

        let earning = 0;
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earning += item.amount
            }
        })

        let patients = [];

        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earning,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.status(200).json({success:true, dashData})
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}
export {changeDoctorAvailability,doctorList,doctorLogin,appointmentsDoctor, appointmentCompleted, appointmentCancel, doctorDashboard}