import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

/**
 * Upload image to Cloudinary
 * @param {string} filePath - Path to the local file
 * @param {string} folder - Cloudinary folder to upload to (optional)
 * @returns {Promise<Object>} - Upload result with secure_url
 */
export const uploadImageToCloudinary = async (filePath, folder = 'civic-issues') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' }, // Limit max size
        { quality: 'auto' }, // Auto optimize quality
        { fetch_format: 'auto' } // Auto format (webp, etc.)
      ]
    });

    // Delete the local file after successful upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      message: 'Image uploaded successfully to Cloudinary'
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    
    // Clean up local file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return {
      success: false,
      error: error.message,
      message: 'Failed to upload image to Cloudinary'
    };
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public ID of the image
 * @returns {Promise<Object>} - Deletion result
 */
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: true,
      result: result,
      message: 'Image deleted successfully from Cloudinary'
    };
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to delete image from Cloudinary'
    };
  }
};

/**
 * Test Cloudinary connection
 * @returns {Promise<Object>} - Connection test result
 */
export const testCloudinaryConnection = async () => {
  try {
    const result = await cloudinary.api.ping();
    return {
      success: true,
      result: result,
      message: 'Cloudinary connection successful'
    };
  } catch (error) {
    console.error('Cloudinary connection test error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Cloudinary connection failed'
    };
  }
};
