import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

async function directTwitterTest() {
  try {
    console.log('🔄 Testing Twitter API connection...');
    
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    // Test connection
    console.log('📡 Testing connection...');
    const user = await client.v2.me();
    console.log('✅ Connected as:', user.data.username);

    // Post a test tweet
    console.log('🐦 Posting test civic issue tweet...');
    const testTweet = `🚨 CIVIC ISSUE ALERT 🚨

📍 Location: Ranchi, Jharkhand
🔸 Issue: Broken streetlight causing safety hazard

The streetlight on Main Road near City Center has been non-functional for over a week. This is creating serious safety concerns for pedestrians.

@JharkhandGovt @CMOfficeJharkhand @JharkhandUrban Please take immediate action!

#JharkhandIssues #CivicIssue #PublicService #Ranchi #Infrastructure #PowerIssue #DigitalIndia #GoodGovernance

#TestPost #CivicApp`;

    const tweet = await client.v2.tweet(testTweet);
    
    console.log('✅ Tweet posted successfully!');
    console.log('🆔 Tweet ID:', tweet.data.id);
    console.log('🔗 Tweet URL:', `https://twitter.com/user/status/${tweet.data.id}`);
    console.log('📱 Check your Twitter account now!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.data) {
      console.error('📄 Error details:', JSON.stringify(error.data, null, 2));
    }
    if (error.code) {
      console.error('🔍 Error code:', error.code);
    }
  }
}

directTwitterTest();
