import express from 'express'
import { doctorList,doctorLogin,appointmentsDoctor } from '../controllers/doctor.controller.js'
import authDoctor from '../middleware/authDoctor.middleware.js';

const doctorRouter = express.Router()
doctorRouter.get('/list',doctorList);
doctorRouter.post('/login',doctorLogin);
doctorRouter.get('/doctor-appointments',authDoctor,appointmentsDoctor);

export default doctorRouter