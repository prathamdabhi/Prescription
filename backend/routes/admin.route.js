import express from 'express'
import { addDoctor,loginAdmin,getDoctorList } from '../controllers/admin.controller.js'
import { changeDoctorAvailability } from '../controllers/doctor.controller.js'
import upload from '../middleware/multer.middleware.js'
import authAdmin from '../middleware/authAdmin.middleware.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,getDoctorList)
adminRouter.post('/change-availability',authAdmin,changeDoctorAvailability)


export default adminRouter