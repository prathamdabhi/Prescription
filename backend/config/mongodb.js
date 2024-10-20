import mongoose from "mongoose";
import { DBNAME } from "../constant/dbname.js";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected',()=>{
            console.log('MongoDB connected')
        })
       const connectionString =  await mongoose.connect(`${process.env.MONGODB_URL}/${DBNAME}`)
       console.log(`MongoDB DataBase Name : ${connectionString.connection.name}`)
       console.log(`MongoDB connected: ${connectionString.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB