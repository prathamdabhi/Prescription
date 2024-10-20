import {v2 as cloudinary} from 'cloudinary'

const connectToCloudinary = async () => {

    cloudinary.config({
        cloud_name:process.env.CLOUDINERY_NAME,
        api_key:process.env.CLOUDINERY_API_KEY,
        api_secret:process.env.CLOUDINERY_SECRET_KEY
    })
}   

export default connectToCloudinary