import express from 'express'
import { doctorList,doctorLogin,appointmentsDoctor, appointmentCompleted, appointmentCancel,doctorDashboard } from '../controllers/doctor.controller.js'
import authDoctor from '../middleware/authDoctor.middleware.js';

const doctorRouter = express.Router()
doctorRouter.get('/list',doctorList);
doctorRouter.post('/login',doctorLogin);
doctorRouter.get('/doctor-appointments',authDoctor,appointmentsDoctor);
doctorRouter.post('/appointment-complet',authDoctor,appointmentCompleted);
doctorRouter.post('/appointment-cancel',authDoctor,appointmentCancel);
doctorRouter.get('/dashboard',authDoctor,doctorDashboard);

export default doctorRouter