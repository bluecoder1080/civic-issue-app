import http from 'http';
import querystring from 'querystring';

async function submitTestIssue() {
  console.log('🔄 Submitting test civic issue to verify Twitter automation...');
  
  const postData = querystring.stringify({
    'title': 'Broken streetlight causing safety hazard',
    'description': 'The streetlight on Main Road near City Center has been non-functional for over a week. This is creating serious safety concerns for pedestrians, especially during evening hours. Immediate repair is needed to ensure public safety.',
    'location': 'Ranchi, Jharkhand'
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/issues',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.success) {
            console.log('✅ Test issue submitted successfully!');
            console.log('📝 Response:', result.message);
            console.log('\n🐦 CHECK YOUR TWITTER ACCOUNT NOW!');
            console.log('Expected tweet should include:');
            console.log('   📍 Location: Ranchi, Jharkhand');
            console.log('   🔸 Issue: Broken streetlight causing safety hazard');
            console.log('   👥 Tags: @JharkhandGovt @CMOfficeJharkhand @JharkhandUrban');
            console.log('   🏷️ Hashtags: #JharkhandIssues #CivicIssue #Ranchi #Infrastructure #PowerIssue');
            console.log('\n🔗 The tweet should appear on your Twitter timeline immediately!');
          } else {
            console.error('❌ Failed to submit issue:', result.message);
          }
          resolve(result);
        } catch (error) {
          console.error('❌ Error parsing response:', error.message);
          console.log('Raw response:', data);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message);
      console.log('💡 Make sure your backend server is running on http://localhost:5000');
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

submitTestIssue().catch(console.error);
