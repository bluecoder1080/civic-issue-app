# 🚀 Deployment Guide for Civic Issue App

## Overview
This guide will help you deploy your Civic Issue App to Vercel, which supports both frontend and backend hosting.

## Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas account (free tier available)

## Step 1: Prepare Your Code

### 1.1 Environment Variables
Copy `.env.example` to `.env` in your root directory and fill in your values:
```bash
cp .env.example .env
```

### 1.2 MongoDB Setup
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster (free tier is sufficient)
3. Create a database user with read/write permissions
4. Get your connection string (replace `<password>` with your actual password)
5. Whitelist all IP addresses (0.0.0.0/0) for Vercel deployment

## Step 2: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial deployment setup"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy on Vercel

### 3.1 Connect Repository
1. Go to https://vercel.com
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the `vercel.json` configuration

### 3.2 Configure Environment Variables
In your Vercel project dashboard, go to Settings > Environment Variables and add:

**Required Variables:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/civic-issues
NODE_ENV=production
```

**Cloudinary Configuration (for image storage):**
```
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3.3 Deploy
1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be available at `https://your-app-name.vercel.app`

## Step 4: Test Your Deployment

1. Visit your Vercel URL
2. Test issue submission
3. Check if images upload correctly
4. Verify Cloudinary integration

## Troubleshooting

### Common Issues:

**Build Fails:**
- Check that all dependencies are in `package.json`
- Ensure environment variables are set correctly
- Check Vercel build logs for specific errors

**Database Connection Issues:**
- Verify MongoDB connection string
- Ensure IP whitelist includes 0.0.0.0/0
- Check database user permissions

**Image Upload Issues:**
- Vercel has file system limitations
- Consider using cloud storage (AWS S3, Cloudinary) for production

**Cloudinary Integration Issues:**
- Ensure all Cloudinary credentials are set correctly
- Verify image upload functionality
- Check Cloudinary dashboard for uploaded images

## Production Considerations

### File Storage
For production, consider migrating from local file storage to cloud storage:
- **AWS S3**: Scalable object storage
- **Cloudinary**: Image optimization and CDN
- **Vercel Blob**: Vercel's own file storage solution

### Database Scaling
- Monitor MongoDB Atlas usage
- Consider upgrading to a paid tier for production traffic
- Set up database backups

### Security
- Use environment variables for all sensitive data
- Implement rate limiting for API endpoints
- Add input validation and sanitization
- Consider implementing user authentication

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review MongoDB Atlas logs
3. Test API endpoints individually
4. Check browser console for frontend errors

Your app should now be successfully deployed and accessible worldwide! 🎉
