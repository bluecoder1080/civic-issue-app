// Configuration file for environment variables
const config = {
  // Backend URL for API calls and image display
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? "https://civic-eye-backend-296m.onrender.com" : "http://localhost:5000"),
  
  // API base URL
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "/api",
  
  // App configuration
  APP_NAME: "Civic Issue Reporter",
  APP_VERSION: "1.0.0",
  
  // Feature flags
  FEATURES: {
    IMAGE_UPLOAD: true,
    CAMERA_CAPTURE: true,
    LOCATION_DETECTION: true,
  }
};

export default config;
