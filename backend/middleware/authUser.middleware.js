import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'


const authUser = async (req,res,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            return res.status(400).json({success:false, message:'Not Authorized please login again'})
        }
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET)

        req.body.userId = decodeToken.id

        next()
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}



export default authUser