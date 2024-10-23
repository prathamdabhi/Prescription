import jwt from 'jsonwebtoken';

const authDoctor = async (req,res,next)=>{
    try {
        const {dtoken} = req.headers
        if(!dtoken){
            return res.status(400).json({success:false, message:'Not Authorized please login again'})
        }
        const decodeToken = jwt.verify(dtoken,process.env.JWT_SECRET)

        req.body.docId = decodeToken.id

        next()
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}

export default authDoctor