import express from 'express'
import { registerUser,userLogin,getProfileData,updateUserProfile } from '../controllers/user.controller.js'
import authUser from '../middleware/authUser.middleware.js'
import upload from '../middleware/multer.middleware.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.get('/profile',authUser ,getProfileData)
userRouter.put('/update-profile',upload.single('image'),authUser,updateUserProfile)



export default userRouter