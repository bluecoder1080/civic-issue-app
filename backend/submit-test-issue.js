import fetch from 'node-fetch';
import FormData from 'form-data';

async function submitTestIssue() {
  try {
    console.log('🔄 Submitting test civic issue...');
    
    const formData = new FormData();
    formData.append('title', 'Broken streetlight causing safety hazard');
    formData.append('description', 'The streetlight on Main Road near City Center has been non-functional for over a week. This is creating serious safety concerns for pedestrians, especially during evening hours. Immediate repair is needed to ensure public safety.');
    formData.append('location', 'Ranchi, Jharkhand');
    
    const response = await fetch('http://localhost:5000/api/issues', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Test issue submitted successfully!');
      console.log('📝 Response:', result.message);
      console.log('🐦 Check your Twitter account for the automated post!');
      console.log('🔗 Expected tweet should include:');
      console.log('   - Issue title and description');
      console.log('   - Location: Ranchi, Jharkhand');
      console.log('   - Tags: @JharkhandGovt @CMOfficeJharkhand @JharkhandUrban');
      console.log('   - Hashtags: #JharkhandIssues #CivicIssue #Ranchi #Infrastructure #PowerIssue');
    } else {
      console.error('❌ Failed to submit issue:', result.message);
    }
    
  } catch (error) {
    console.error('❌ Error submitting test issue:', error.message);
    console.log('💡 Make sure your backend server is running on http://localhost:5000');
  }
}

submitTestIssue();
