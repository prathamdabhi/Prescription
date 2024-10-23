import Doctor from "../model/doctor.model.js";

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

//API FOR DORTOR LOGIN
export {changeDoctorAvailability,doctorList}