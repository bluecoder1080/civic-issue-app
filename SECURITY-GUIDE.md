# Security Guide for CivicEye App

## 🔐 Protecting Your API Keys

### Environment Variables Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your actual API keys in `.env`:**
   ```bash
   # MongoDB Connection
   MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/civic-issues

   # Cloudinary (for image storage)
   CLOUDINARY_CLOUD_NAME=your_actual_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_actual_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_actual_cloudinary_api_secret

   # Optional: Enhanced Geocoding Services
   OPENCAGE_API_KEY=your_opencage_api_key
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

### 🚨 Important Security Rules

1. **NEVER commit `.env` files to GitHub**
   - The `.gitignore` file already excludes `.env`
   - Always use `.env.example` for templates

2. **Use different keys for development and production**
   - Development: Use test/sandbox API keys when available
   - Production: Use production API keys with proper restrictions

3. **Rotate API keys regularly**
   - Change keys every 3-6 months
   - Immediately rotate if compromised

### 🌍 Geocoding Services (Free Alternatives)

The app now uses **Nominatim (OpenStreetMap)** for reverse geocoding, which is:
- ✅ **Completely FREE**
- ✅ **No API key required**
- ✅ **No rate limits for reasonable use**
- ✅ **Privacy-friendly**

**Optional paid services for enhanced accuracy:**
- **OpenCage Geocoding**: 2,500 free requests/day
- **Google Maps Geocoding**: $5 per 1,000 requests

### 🔧 Deployment Security

#### Vercel Environment Variables:
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable from your `.env` file
4. Set appropriate environment (Development/Preview/Production)

#### Netlify Environment Variables:
1. Go to Site Settings → Environment Variables
2. Add each variable individually
3. Deploy your site

### 📱 Frontend Security

The app uses **client-side geocoding** with Nominatim, so no API keys are exposed in the frontend bundle.

### 🛡️ Best Practices

1. **Principle of Least Privilege**
   - Only grant necessary permissions to API keys
   - Restrict API keys to specific domains in production

2. **Monitor API Usage**
   - Set up usage alerts for paid services
   - Monitor for unusual activity

3. **Backup Strategy**
   - Keep secure backups of your environment configurations
   - Document your API key sources and renewal dates

### 🚀 Production Checklist

- [ ] All API keys are in environment variables
- [ ] `.env` file is in `.gitignore`
- [ ] Production API keys are different from development
- [ ] API keys have proper domain restrictions
- [ ] Usage monitoring is set up
- [ ] Backup of configuration is secure

### 📞 Emergency Procedures

If API keys are compromised:
1. **Immediately revoke** the compromised keys
2. **Generate new keys** from the respective services
3. **Update environment variables** in all deployments
4. **Monitor usage** for any unauthorized activity
5. **Review access logs** if available

---

## 🌍 Location Services

### Current Implementation
- **Primary**: Nominatim (OpenStreetMap) - Free, no API key needed
- **Fallback**: Coordinate display if geocoding fails
- **Format**: "Greater Noida, Uttar Pradesh" instead of "28.474735, 77.504936"

### Supported Location Formats
- City names: "Greater Noida", "Delhi", "Mumbai"
- Areas: "Sector 1, Greater Noida"
- Full addresses: "Sector 1, Greater Noida, Uttar Pradesh"
- Coordinates: Automatically converted to readable names

This ensures your location data is always user-friendly while maintaining privacy and security.
