import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with provided credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'djo6vebtk',
  api_key: process.env.CLOUDINARY_API_KEY || '464615365172213',
  api_secret: process.env.CLOUDINARY_API_SECRET || '-wDeofUeTpxqpRn7J6tfuFP1YIw',
});

export default cloudinary;
