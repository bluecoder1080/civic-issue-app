# Production Deployment Instructions for Render.com

## Prerequisites
- GitHub repository with your code
- Render.com account
- Environment variables ready (MongoDB, Cloudinary, etc.)

## Option 1: Deploy Using render.yaml (Recommended)

### Step 1: Commit and Push Changes
```bash
git add .
git commit -m "Add Render.com deployment configuration"
git push origin main
```

### Step 2: Deploy via Render Blueprint
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and create both services:
   - `civic-issue-frontend` (Static Site)
   - `civic-eye-backend` (Web Service)

### Step 3: Configure Environment Variables
In the Render dashboard, for the **backend service**, add these environment variables:
- `MONGO_URI`: Your MongoDB connection string
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
- `NODE_ENV`: production
- `PORT`: (auto-assigned by Render)

## Option 2: Manual Deployment

### Frontend (Static Site)
1. Create new "Static Site" on Render
2. Connect your GitHub repo
3. Set build settings:
   - **Build Command**: `cd civic-issue-frontend && npm install && npm run build`
   - **Publish Directory**: `civic-issue-frontend/dist`
4. Add environment variables:
   - `VITE_BACKEND_URL`: https://civic-eye-backend-296m.onrender.com
   - `VITE_API_BASE_URL`: /api
   - `NODE_ENV`: production
5. Add redirect rule:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: Rewrite

### Backend (Web Service)
1. Create new "Web Service" on Render
2. Connect your GitHub repo
3. Set build settings:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
4. Add all environment variables listed above

## Important Notes

### SPA Routing Fix
- The `_redirects` file and render.yaml routes configuration will fix the page refresh issue
- All routes (/, /app, /report) will work correctly after deployment

### Backend URL
- Your backend is already deployed at: `https://civic-eye-backend-296m.onrender.com`
- Frontend is configured to use this URL in production

### Environment Variables
- Frontend uses `VITE_` prefixed variables
- Backend uses standard environment variables
- Make sure all sensitive data (API keys, database URLs) are set in Render dashboard

## Testing After Deployment
1. Visit your frontend URL
2. Test all routes: /, /app, /report
3. Try refreshing pages to ensure SPA routing works
4. Test image upload functionality
5. Verify backend API endpoints are working

## Troubleshooting
- Check Render logs if deployment fails
- Ensure all environment variables are set correctly
- Verify build commands and paths are correct
- Check that both frontend and backend services are running
