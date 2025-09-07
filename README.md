# 🏙️ CivicEye - Civic Issue Reporter

<div align="center">

![CivicEye Logo](https://img.shields.io/badge/CivicEye-Community%20First-blue?style=for-the-badge&logo=eye)

**A modern, mobile-first web application for reporting and tracking civic issues in your community**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Storage-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[🚀 Live Demo](https://civic-eye-frontend.onrender.com)• [🐛 Report Bug](https://github.com/bluecoder1080/civic-issue-app/issues) • [✨ Request Feature](https://github.com/bluecoder1080/civic-issue-app/issues)

</div>

---

## ✨ Key Features

### 📱 **Mobile-First Experience**
- **Responsive Design**: Seamlessly adapts to all screen sizes
- **Touch-Optimized**: Large, accessible touch targets
- **PWA Ready**: Progressive Web App capabilities

### 📸 **Smart Image Handling**
- **Live Camera Integration**: Take photos directly from device camera
- **Cloud Storage**: Images stored securely on Cloudinary with auto-optimization
- **Multiple Upload Options**: Camera capture or file upload
- **Auto-Compression**: Automatic image optimization and format conversion

### 📍 **Intelligent Location Services**
- **GPS Auto-Detection**: Automatic location detection with high accuracy
- **Address Suggestions**: Smart location autocomplete with OpenStreetMap
- **Manual Override**: Option to manually enter or correct location

### 🎨 **Modern User Interface**
- **Beautiful Design**: Clean, intuitive interface with smooth animations
- **Voice Input**: Speech-to-text for issue descriptions
- **Real-time Feedback**: Live status updates and progress indicators
- **Accessibility**: WCAG compliant design

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bluecoder1080/civic-issue-app.git
   cd civic-issue-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../civic-issue-frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGO_URI=mongodb://localhost:27017/civic-issues
   PORT=5000
   
   # Cloudinary (Image Storage)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Start the application (Choose one method)**

   **Method 1: Single Command (Recommended)**
   ```bash
   # Windows (PowerShell)
   .\start-app.ps1
   
   # Windows (Command Prompt)
   start-app.bat
   ```

   **Method 2: Manual Start**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Frontend
   cd civic-issue-frontend
   npm run dev
   ```

6. **Access the application**
   - **Main App**: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Mobile Features

### Camera Integration
- **Take Photos**: Use your device's camera to capture issue photos
- **Upload Photos**: Select existing photos from your gallery
- **Real-time Preview**: See captured photos before submission

### Location Services
- **GPS Detection**: Automatically detect your current location
- **Manual Input**: Option to manually enter location details
- **Coordinate Display**: Shows precise GPS coordinates

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client for API calls
- **Vite**: Fast build tool and dev server

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **Cloudinary**: Cloud-based image storage and optimization
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing

## 📁 Project Structure

```
civic-issue-app/
├── backend/
│   ├── config/
│   │   └── cloudinary.js        # Cloudinary configuration
│   ├── models/
│   │   └── Issue.js             # MongoDB Issue schema
│   ├── services/
│   │   └── cloudinaryService.js # Image upload service
│   ├── server.js                # Express server
│   └── package.json
├── civic-issue-frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── IssueForm.jsx    # Issue submission form
│   │   │   └── IssueList.jsx    # Issues display
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx  # Landing page
│   │   │   └── ReportForm.jsx   # Report form page
│   │   ├── utils/
│   │   │   └── geocoding.js     # Location utilities
│   │   ├── App.jsx              # Main app component
│   │   ├── api.js               # API configuration
│   │   └── index.css            # Global styles
│   ├── tailwind.config.js       # Tailwind configuration
│   └── package.json
├── .env.example                 # Environment variables template
├── CLOUDINARY-INTEGRATION.md    # Cloudinary setup guide
└── README.md
```

## 🔧 API Endpoints

### 📝 **Issue Management**

**POST** `/api/issues`
- Submit a new civic issue
- **Body**: FormData with title, description, location, and optional image
- **Response**: Success message with Cloudinary URL

**GET** `/api/issues`
- Fetch all reported issues
- **Response**: Array of issue objects with Cloudinary image URLs

**GET** `/api/issues/resolved`
- Fetch only resolved issues
- **Response**: Array of resolved issue objects

**GET** `/api/issues/unresolved`
- Fetch only unresolved issues
- **Response**: Array of unresolved issue objects

**PATCH** `/api/issues/:id/resolve`
- Mark an issue as resolved
- **Response**: Updated issue object

### 🔧 **System Health**

**GET** `/api/cloudinary/test`
- Test Cloudinary connection
- **Response**: Connection status and configuration

## 🎨 UI Components

### IssueForm
- **Modern Design**: Clean, card-based layout
- **Form Validation**: Required field validation
- **Camera Integration**: Live camera with capture functionality
- **Location Services**: GPS integration
- **Loading States**: Smooth loading animations

### IssueList
- **Grid Layout**: Responsive card grid
- **Status Indicators**: Visual status badges
- **Image Display**: Optimized image rendering
- **Time Formatting**: Human-readable timestamps
- **Empty States**: Helpful empty state messages

## 📱 Mobile Optimization

- **Touch-Friendly**: Large touch targets
- **Responsive Design**: Adapts to all screen sizes
- **Camera Access**: Native camera integration
- **GPS Integration**: Location services
- **Offline Support**: Graceful error handling

## 🔒 Security Features

- **CORS Configuration**: Secure cross-origin requests
- **File Validation**: Image type and size validation
- **Input Sanitization**: XSS protection
- **Error Handling**: Graceful error responses

## 🚀 Deployment

### Vercel Deployment (Recommended)

This app is configured for easy deployment on Vercel with both frontend and backend.

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the configuration from `vercel.json`
   - Set up environment variables in Vercel dashboard

3. **Environment Variables (Required)**
   Set these in your Vercel dashboard:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/civic-issues
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **MongoDB Setup**
   - Use MongoDB Atlas (cloud) for production
   - Create a database named `civic-issues`
   - Whitelist Vercel's IP addresses or use 0.0.0.0/0 for all IPs

### Alternative Deployment Options
- **Netlify**: Frontend only (requires separate backend hosting)
- **Railway**: Full-stack deployment
- **Render**: Full-stack deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with ❤️ for better communities
- Icons by [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Image storage by [Cloudinary](https://cloudinary.com/)
- Location services by [OpenStreetMap](https://www.openstreetmap.org/)

---

<div align="center">

**Made with ❤️ by [bluecoder1080](https://github.com/bluecoder1080)**

⭐ **Star this repo if you find it helpful!** ⭐

</div>