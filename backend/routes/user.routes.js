import express from 'express'
import { registerUser,userLogin,getProfileData,updateUserProfile,bookAppointment,
    getAppointmentData,cancellAppointment,createPayment,getAmount,changepaymentStatus,deleteAppointment } from '../controllers/user.controller.js'
import authUser from '../middleware/authUser.middleware.js'
import upload from '../middleware/multer.middleware.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.get('/profile',authUser ,getProfileData)
userRouter.put('/update-profile',upload.single('image'),authUser,updateUserProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/my-appointments',authUser,getAppointmentData)
userRouter.post('/cancel-appointment',authUser,cancellAppointment)
userRouter.post('/create-payment',authUser,createPayment)
userRouter.post('/get-amount',getAmount)
userRouter.post('/change-payment-status',changepaymentStatus)
userRouter.post('/delete-appointment',deleteAppointment)


export default userRouter