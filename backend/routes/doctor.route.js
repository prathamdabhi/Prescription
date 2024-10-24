import express from 'express'
import { doctorList,doctorLogin,appointmentsDoctor, appointmentCompleted, appointmentCancel,
    doctorDashboard, getDoctorProfile, updateDoctorProfile } from '../controllers/doctor.controller.js'
import authDoctor from '../middleware/authDoctor.middleware.js';

const doctorRouter = express.Router()
doctorRouter.get('/list',doctorList);
doctorRouter.post('/login',doctorLogin);
doctorRouter.get('/doctor-appointments',authDoctor,appointmentsDoctor);
doctorRouter.post('/appointment-complet',authDoctor,appointmentCompleted);
doctorRouter.post('/appointment-cancel',authDoctor,appointmentCancel);
doctorRouter.get('/dashboard',authDoctor,doctorDashboard);
doctorRouter.get('/doctor-profile',authDoctor,getDoctorProfile);
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile);

export default doctorRouter