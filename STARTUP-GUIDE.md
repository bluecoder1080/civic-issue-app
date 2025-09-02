# 🚀 Quick Startup Guide

## Method 1: Automatic (Recommended)
Double-click `run-app.bat` in the project folder.

## Method 2: Manual Steps

### Step 1: Start Backend
1. Open Command Prompt or PowerShell
2. Navigate to the project folder: `cd E:\civic-issue-app`
3. Run: `cd backend`
4. Run: `npm start`
5. Keep this terminal open

### Step 2: Start Frontend (New Terminal)
1. Open a NEW Command Prompt or PowerShell
2. Navigate to the project folder: `cd E:\civic-issue-app`
3. Run: `cd civic-issue-frontend`
4. Run: `npm run dev`
5. Keep this terminal open

### Step 3: Access the App
Open your browser and go to: **http://localhost:5173**

## Troubleshooting

### If you see "page cannot connect":
1. Make sure both servers are running
2. Check that you see these messages:
   - Backend: "🚀 Server running on http://localhost:5000"
   - Frontend: "Local: http://localhost:5173/"

### If you see CSS errors:
The CSS issue has been fixed. Try refreshing the page.

### If MongoDB connection fails:
The app will still work with a local MongoDB or you can use MongoDB Atlas.

## Quick Test
1. Open http://localhost:5173
2. You should see a beautiful form with "Report a Civic Issue"
3. Try the "Take Photo" button to test camera
4. Fill out the form and submit

## Support
If you still have issues, try:
1. Restart both terminals
2. Clear browser cache
3. Make sure no other apps are using ports 5000 or 5173
