import { v2 as cloudinary } from 'cloudinary'
import { Constants } from './contants'

cloudinary.config({
  cloud_name: Constants.CLOUDINARY_CLOUD_NAME,
  api_key: Constants.CLOUDINARY_API_KEY,
  api_secret: Constants.CLOUDINARY_API_SECRET,
  secure: true
})

export { cloudinary }