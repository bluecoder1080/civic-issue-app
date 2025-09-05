import dotenv from 'dotenv';
dotenv.config();

console.log('=== Twitter Debug Test ===');
console.log('Environment variables loaded:');
console.log('TWITTER_API_KEY:', process.env.TWITTER_API_KEY ? 'EXISTS' : 'MISSING');
console.log('TWITTER_API_SECRET:', process.env.TWITTER_API_SECRET ? 'EXISTS' : 'MISSING');
console.log('TWITTER_ACCESS_TOKEN:', process.env.TWITTER_ACCESS_TOKEN ? 'EXISTS' : 'MISSING');
console.log('TWITTER_ACCESS_TOKEN_SECRET:', process.env.TWITTER_ACCESS_TOKEN_SECRET ? 'EXISTS' : 'MISSING');

// Test basic Twitter API import
try {
  const { TwitterApi } = await import('twitter-api-v2');
  console.log('✅ Twitter API module imported successfully');
  
  // Test client creation
  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });
  
  console.log('✅ Twitter client created successfully');
  
  // Test connection
  const user = await client.v2.me();
  console.log('✅ Twitter connection successful!');
  console.log('Username:', user.data.username);
  console.log('User ID:', user.data.id);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  if (error.data) {
    console.error('Error data:', JSON.stringify(error.data, null, 2));
  }
}
