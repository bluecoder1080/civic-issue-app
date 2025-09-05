# Twitter Automation Setup Guide

## Overview
This guide will help you set up Twitter automation for your Civic Issue App. When users submit issues, the system will automatically post to Twitter and tag relevant Jharkhand government authorities.

## Features
- ✅ Automatic Twitter posting when issues are submitted
- ✅ Tags Jharkhand government authorities (@JharkhandGovt, @CMOfficeJharkhand, etc.)
- ✅ Includes issue photos in tweets
- ✅ Smart hashtag generation based on issue type and location
- ✅ Comprehensive error handling

## Step 1: Get Twitter API Credentials

### 1.1 Create Twitter Developer Account
1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Sign in with your Twitter account
3. Apply for a developer account (if you don't have one)
4. Create a new project/app

### 1.2 Generate API Keys
1. In your Twitter Developer Dashboard, go to your app
2. Navigate to "Keys and Tokens" tab
3. Generate the following credentials:
   - **API Key** (Consumer Key)
   - **API Secret** (Consumer Secret)
   - **Access Token**
   - **Access Token Secret**

### 1.3 Set Permissions
- Ensure your app has **Read and Write** permissions
- This is required to post tweets

## Step 2: Configure Environment Variables

Open your `backend/.env` file and replace the placeholder values:

```env
# Twitter API Credentials
TWITTER_API_KEY=your_actual_api_key_here
TWITTER_API_SECRET=your_actual_api_secret_here
TWITTER_ACCESS_TOKEN=your_actual_access_token_here
TWITTER_ACCESS_TOKEN_SECRET=your_actual_access_token_secret_here
```

## Step 3: Test the Integration

### 3.1 Test Twitter Connection
Start your backend server and visit:
```
GET http://localhost:5000/api/twitter/test
```

This endpoint will verify if your Twitter credentials are working correctly.

### 3.2 Test Issue Submission
Submit a test issue through your frontend. The system will:
1. Save the issue to the database
2. Automatically post to Twitter
3. Tag Jharkhand authorities
4. Include the issue photo (if provided)

## How It Works

### Automatic Posting
When a user submits an issue via `POST /api/issues`, the system:

1. **Saves the issue** to MongoDB
2. **Creates a tweet** with:
   - Issue title and description
   - Location information
   - Relevant hashtags
   - Government authority tags
   - Uploaded photo (if available)
3. **Posts to Twitter** automatically

### Tweet Format Example
```
🚨 CIVIC ISSUE ALERT 🚨

📍 Location: Ranchi, Jharkhand
🔸 Issue: Broken streetlight causing safety concerns

The streetlight on Main Road has been non-functional for weeks, creating safety hazards for pedestrians...

@JharkhandGovt @CMOfficeJharkhand @JharkhandUrban Please take immediate action!

#JharkhandIssues #CivicIssue #PublicService #Ranchi #Infrastructure #PowerIssue #DigitalIndia #GoodGovernance
```

### Tagged Authorities
The system automatically tags these Jharkhand government handles:
- `@JharkhandGovt` - Main government account
- `@CMOfficeJharkhand` - Chief Minister's Office
- `@JharkhandPolice` - State Police
- `@JharkhandUrban` - Urban Development
- `@JharkhandRural` - Rural Development
- `@JharkhandHealth` - Health Department
- `@JharkhandPWD` - Public Works Department
- `@JharkhandEducation` - Education Department

### Smart Hashtags
The system generates relevant hashtags based on:
- **Issue type**: #RoadIssue, #WaterIssue, #PowerIssue, #HealthIssue
- **Location**: #[LocationName]
- **Category**: #Infrastructure, #Sanitation, #PublicHealth
- **General**: #JharkhandIssues, #CivicIssue, #DigitalIndia

## Troubleshooting

### Common Issues

1. **Twitter API Rate Limits**
   - Twitter has rate limits for posting
   - The system handles this gracefully
   - Issues will still be saved even if Twitter posting fails

2. **Invalid Credentials**
   - Check your `.env` file
   - Verify credentials in Twitter Developer Portal
   - Test connection using `/api/twitter/test` endpoint

3. **Image Upload Issues**
   - Ensure image files exist in the uploads directory
   - Check file permissions
   - Supported formats: JPG, PNG, GIF

### Error Handling
- Twitter posting failures won't prevent issue submission
- All errors are logged in the server console
- Users still receive success confirmation for issue submission

## Security Best Practices

1. **Never commit `.env` file** to version control
2. **Use environment variables** for all sensitive data
3. **Regularly rotate** your Twitter API credentials
4. **Monitor usage** in Twitter Developer Dashboard

## API Endpoints

### Test Twitter Connection
```
GET /api/twitter/test
```
Response:
```json
{
  "success": true,
  "message": "✅ Twitter connection successful!",
  "username": "your_twitter_username"
}
```

### Submit Issue (with Twitter automation)
```
POST /api/issues
```
Body: FormData with title, description, location, and image
Response:
```json
{
  "success": true,
  "message": "✅ Issue submitted successfully and posted to Twitter!"
}
```

## Customization

### Modify Authority Handles
Edit `backend/services/twitterService.js` in the `getJharkhandAuthorities()` method to add/remove government handles.

### Customize Tweet Format
Modify the `createTweetContent()` method in `twitterService.js` to change the tweet structure.

### Add More Hashtags
Update the `generateHashtags()` method to include additional relevant hashtags.

## Support
If you encounter any issues:
1. Check the server console for error messages
2. Verify your Twitter API credentials
3. Test the connection endpoint
4. Ensure your Twitter app has proper permissions

---

**Note**: This automation helps bring civic issues to the attention of relevant authorities through social media, potentially leading to faster resolution of public problems.
