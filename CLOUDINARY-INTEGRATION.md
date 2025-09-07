# Cloudinary Integration Guide

## Overview
The Civic Issue App now uses Cloudinary for cloud-based image storage instead of local file storage. This provides better scalability, reliability, and performance for image handling.

## Features Added
- ✅ Automatic image upload to Cloudinary when users submit issues
- ✅ Image optimization (auto quality, format conversion, size limits)
- ✅ Secure URL generation for stored images
- ✅ Automatic cleanup of temporary local files
- ✅ Twitter integration updated to work with Cloudinary URLs
- ✅ Connection testing endpoint for Cloudinary

## Configuration
The following environment variables are configured:

```env
CLOUDINARY_CLOUD_NAME=djo6vebtk
CLOUDINARY_API_KEY=464615365172213
CLOUDINARY_API_SECRET=-wDeofUeTpxqpRn7J6tfuFP1YIw
```

## API Changes

### Image Upload Flow
1. User submits form with image
2. Image temporarily saved locally via multer
3. Image uploaded to Cloudinary with optimizations:
   - Max size: 1200x800px
   - Auto quality optimization
   - Auto format conversion (WebP when supported)
4. Cloudinary URL stored in database
5. Temporary local file deleted
6. Issue posted to Twitter with Cloudinary image

### New Endpoints
- `GET /api/cloudinary/test` - Test Cloudinary connection

### Database Schema
The `image` field in the Issue model now stores Cloudinary URLs instead of local file paths:
```javascript
image: "https://res.cloudinary.com/djo6vebtk/image/upload/v1234567890/civic-issues/abc123.jpg"
```

## File Structure
```
backend/
├── config/
│   └── cloudinary.js          # Cloudinary configuration
├── services/
│   ├── cloudinaryService.js   # Cloudinary upload/delete functions
│   └── twitterService.js      # Updated to handle Cloudinary URLs
└── server.js                  # Updated image upload endpoint
```

## Benefits
- **Scalability**: No local storage limitations
- **Performance**: CDN delivery for fast image loading
- **Optimization**: Automatic image compression and format conversion
- **Reliability**: Cloud-based storage with high availability
- **Security**: Secure URLs with access controls

## Testing
To test the integration:
1. Start the backend server
2. Visit `http://localhost:5000/api/cloudinary/test` to verify connection
3. Submit an issue with an image through the frontend
4. Check the database - image field should contain Cloudinary URL
5. Verify image displays correctly in the frontend

## Error Handling
- If Cloudinary upload fails, the issue is still saved without an image
- Temporary files are always cleaned up, even on upload failure
- Twitter posting continues to work with fallback to text-only if image fails

## Security Notes
- API credentials are stored in environment variables
- Images are uploaded to a dedicated folder: `civic-issues/`
- Automatic image optimization prevents oversized uploads
- Secure HTTPS URLs are generated for all images
