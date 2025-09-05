import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

async function testTwitterConnection() {
  try {
    console.log('🔄 Testing Twitter API connection...');
    
    // Initialize Twitter client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    // Test connection by getting user info
    const user = await client.v2.me();
    
    console.log('✅ Twitter connection successful!');
    console.log('👤 Connected as:', user.data.username);
    console.log('📝 User ID:', user.data.id);
    console.log('🔗 Profile:', `https://twitter.com/${user.data.username}`);
    
    return { success: true, user: user.data };
    
  } catch (error) {
    console.error('❌ Twitter connection failed:', error.message);
    if (error.code) {
      console.error('🔍 Error code:', error.code);
    }
    if (error.data) {
      console.error('📄 Error details:', error.data);
    }
    return { success: false, error: error.message };
  }
}

// Run the test
testTwitterConnection().then(result => {
  console.log('Final result:', result);
  process.exit(result.success ? 0 : 1);
}).catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
