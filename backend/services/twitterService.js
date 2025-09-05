import { TwitterApi } from 'twitter-api-v2';
import fs from 'fs';
import path from 'path';

class TwitterService {
  constructor() {
    this.client = null;
    this.initializeClient();
  }

  initializeClient() {
    try {
      console.log('🔄 Initializing Twitter client...');
      
      if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET || 
          !process.env.TWITTER_ACCESS_TOKEN || !process.env.TWITTER_ACCESS_TOKEN_SECRET) {
        console.error('❌ Missing Twitter API credentials');
        return;
      }
      
      // Initialize Twitter client with API credentials
      this.client = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY,
        appSecret: process.env.TWITTER_API_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      });
      
      // Get read-write client
      this.rwClient = this.client.readWrite;
      console.log('✅ Twitter client initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Twitter client:', error);
    }
  }

  // Jharkhand government and authority handles
  getJharkhandAuthorities() {
    return [
      '@JharkhandGovt',
      '@CMOfficeJharkhand',
      '@JharkhandPolice',
      '@JharkhandUrban',
      '@JharkhandRural',
      '@JharkhandHealth',
      '@JharkhandPWD',
      '@JharkhandEducation'
    ];
  }

  // Generate hashtags based on issue type and location
  generateHashtags(title, location) {
    const baseHashtags = ['#JharkhandIssues', '#CivicIssue', '#PublicService'];
    
    // Add location-based hashtags
    const locationTag = `#${location.replace(/\s+/g, '')}`;
    baseHashtags.push(locationTag);

    // Add issue-type hashtags based on title keywords
    const titleLower = title.toLowerCase();
    if (titleLower.includes('road') || titleLower.includes('pothole')) {
      baseHashtags.push('#RoadIssue', '#Infrastructure');
    }
    if (titleLower.includes('water') || titleLower.includes('drainage')) {
      baseHashtags.push('#WaterIssue', '#Sanitation');
    }
    if (titleLower.includes('electricity') || titleLower.includes('power')) {
      baseHashtags.push('#PowerIssue', '#Electricity');
    }
    if (titleLower.includes('garbage') || titleLower.includes('waste')) {
      baseHashtags.push('#WasteManagement', '#Cleanliness');
    }
    if (titleLower.includes('health') || titleLower.includes('hospital')) {
      baseHashtags.push('#HealthIssue', '#PublicHealth');
    }

    return baseHashtags.slice(0, 8); // Limit to 8 hashtags
  }

  // Create tweet content
  createTweetContent(issue) {
    const authorities = this.getJharkhandAuthorities().slice(0, 3); // Tag first 3 authorities
    const hashtags = this.generateHashtags(issue.title, issue.location);
    
    const tweetText = `🚨 CIVIC ISSUE ALERT 🚨

📍 Location: ${issue.location}
🔸 Issue: ${issue.title}

${issue.description.length > 100 ? issue.description.substring(0, 100) + '...' : issue.description}

${authorities.join(' ')} Please take immediate action!

${hashtags.join(' ')}

#DigitalIndia #GoodGovernance`;

    return tweetText;
  }

  // Upload image to Twitter
  async uploadImage(imagePath) {
    try {
      if (!fs.existsSync(imagePath)) {
        console.log('⚠️ Image file not found:', imagePath);
        return null;
      }

      const mediaId = await this.client.v1.uploadMedia(imagePath);
      return mediaId;
    } catch (error) {
      console.error('❌ Failed to upload image to Twitter:', error);
      return null;
    }
  }

  // Post tweet with issue details and image
  async postIssueToTwitter(issue, imagePath = null) {
    try {
      console.log('🐦 Starting Twitter post process...');
      console.log('📋 Issue data:', JSON.stringify(issue, null, 2));
      console.log('🖼️ Image path:', imagePath);
      
      if (!this.client) {
        console.error('❌ Twitter client not initialized');
        throw new Error('Twitter client not initialized');
      }

      const tweetContent = this.createTweetContent(issue);
      console.log('📝 Tweet content length:', tweetContent.length);
      console.log('📝 Tweet content:', tweetContent);

      let tweetOptions = {
        text: tweetContent
      };

      // Upload and attach image if available
      if (imagePath) {
        console.log('🔄 Processing image upload...');
        const fullImagePath = path.resolve(imagePath);
        console.log('📁 Full image path:', fullImagePath);
        
        const mediaId = await this.uploadImage(fullImagePath);
        
        if (mediaId) {
          tweetOptions.media = { media_ids: [mediaId] };
          console.log('📸 Image uploaded successfully with ID:', mediaId);
        } else {
          console.log('⚠️ Image upload failed, posting without image');
        }
      }

      console.log('🚀 Posting tweet with options:', JSON.stringify(tweetOptions, null, 2));

      // Post the tweet using read-write client
      const tweet = await this.rwClient.v2.tweet(tweetOptions);
      
      console.log('✅ Tweet posted successfully!');
      console.log('🆔 Tweet ID:', tweet.data.id);
      console.log('🔗 Tweet URL:', `https://twitter.com/user/status/${tweet.data.id}`);
      
      return {
        success: true,
        tweetId: tweet.data.id,
        tweetUrl: `https://twitter.com/user/status/${tweet.data.id}`,
        message: 'Issue posted to Twitter successfully'
      };

    } catch (error) {
      console.error('❌ Failed to post to Twitter:', error);
      console.error('❌ Error details:', error.data || error);
      console.error('❌ Error stack:', error.stack);
      return {
        success: false,
        error: error.message,
        errorDetails: error.data || error,
        message: 'Failed to post issue to Twitter'
      };
    }
  }

  // Test Twitter connection
  async testConnection() {
    try {
      if (!this.client) {
        throw new Error('Twitter client not initialized');
      }

      const user = await this.rwClient.v2.me();
      console.log('✅ Twitter connection successful!');
      console.log('👤 Connected as:', user.data.username);
      return { success: true, username: user.data.username };
    } catch (error) {
      console.error('❌ Twitter connection failed:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new TwitterService();
