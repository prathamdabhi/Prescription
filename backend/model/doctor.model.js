import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        default:true
    },
    fees:{
        type:Number,
        required:true
    },
    address: {
        line1: {
          type: String,
          required: true
        },
        line2: {
          type: String,
          required: true
        }
      },
    date:{
        type:Number,
        default:Date.now()
    },
    slots_book:{
        type:Object,
        default:{}
    }
},{timestamps:true, minimize: false})

const Doctor = mongoose.model("Doctor",doctorSchema)

export default Doctor