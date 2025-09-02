import { useEffect, useState } from "react";
import { MapPin, Calendar, Image, RefreshCw, AlertTriangle, Eye, Bug, TestTube } from "lucide-react";
import api from "../api";
import config from "../config";

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDebug, setShowDebug] = useState(false);
  const [testImageStatus, setTestImageStatus] = useState('idle');
  const [imageLoadStates, setImageLoadStates] = useState({});

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/issues");
      console.log("Fetched issues:", res.data); // Debug log
      setIssues(res.data);
      
      // Initialize image load states
      const initialStates = {};
      res.data.forEach(issue => {
        if (issue.image) {
          initialStates[issue._id] = 'loading';
        }
      });
      setImageLoadStates(initialStates);
    } catch (err) {
      console.error("Error fetching issues:", err);
      setError("Failed to load issues. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // Test backend connectivity
  const testBackendImage = async () => {
    setTestImageStatus('testing');
    try {
      // Try to access a test image or the uploads directory
      const response = await fetch(`${config.BACKEND_URL}/uploads/`);
      if (response.ok) {
        setTestImageStatus('success');
        console.log('Backend uploads directory accessible');
      } else {
        setTestImageStatus('failed');
        console.log('Backend uploads directory not accessible');
      }
    } catch (err) {
      setTestImageStatus('error');
      console.error('Error testing backend:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getStatusColor = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 1) return 'bg-green-100 text-green-800 border-green-200';
    if (diffInDays < 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getStatusText = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 1) return 'New';
    if (diffInDays < 3) return 'In Progress';
    return 'Pending';
  };

  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // The backend stores images as /uploads/filename.jpg
    // and serves them from /uploads route
    if (imagePath.startsWith('/uploads/')) {
      return `${config.BACKEND_URL}${imagePath}`;
    }
    
    // Fallback: if it's just a filename, add the uploads path
    if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
      return `${config.BACKEND_URL}/uploads/${imagePath}`;
    }
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Default: assume it's a relative path from backend
    return `${config.BACKEND_URL}${imagePath}`;
  };

  const handleImageLoad = (issueId) => {
    console.log(`Image loaded successfully for issue ${issueId}`);
    setImageLoadStates(prev => ({
      ...prev,
      [issueId]: 'loaded'
    }));
  };

  const handleImageError = (issueId, imageUrl) => {
    console.log(`Image failed to load for issue ${issueId}:`, imageUrl);
    setImageLoadStates(prev => ({
      ...prev,
      [issueId]: 'error'
    }));
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-primary-600 animate-spin" />
            <span className="text-gray-600 text-lg">Loading issues...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-6 text-lg">{error}</p>
            <button
              onClick={fetchIssues}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No issues reported yet</h3>
          <p className="text-gray-600">Be the first to report a civic issue in your community!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Debug Section - Temporary */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-yellow-800">Debug Info</h3>
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="flex items-center gap-2 text-xs text-yellow-600 hover:text-yellow-800"
          >
            <Bug className="w-4 h-4" />
            {showDebug ? 'Hide' : 'Show'} Debug
          </button>
        </div>
        {showDebug && (
          <div className="text-xs text-yellow-700 space-y-1">
            <p><strong>Backend URL:</strong> {config.BACKEND_URL}</p>
            <p><strong>API Base:</strong> {config.API_BASE_URL}</p>
            <p><strong>Total Issues:</strong> {issues.length}</p>
            <p><strong>Issues with Images:</strong> {issues.filter(i => i.image).length}</p>
            {issues.filter(i => i.image).map((issue, idx) => (
              <p key={idx}>
                <strong>{issue.title}:</strong> {issue.image} → {getImageUrl(issue.image)}
                <br />
                <span className="text-blue-600">Status: {imageLoadStates[issue._id] || 'unknown'}</span>
              </p>
            ))}
            
            {/* Backend Test Section */}
            <div className="mt-3 pt-3 border-t border-yellow-300">
              <div className="flex items-center gap-2 mb-2">
                <TestTube className="w-4 h-4" />
                <strong>Backend Test:</strong>
              </div>
              <button
                onClick={testBackendImage}
                disabled={testImageStatus === 'testing'}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
              >
                {testImageStatus === 'testing' ? 'Testing...' : 'Test Backend'}
              </button>
              <span className="ml-2 text-xs">
                Status: 
                {testImageStatus === 'idle' && ' Not tested'}
                {testImageStatus === 'testing' && ' Testing...'}
                {testImageStatus === 'success' && ' ✅ Accessible'}
                {testImageStatus === 'failed' && ' ❌ Not accessible'}
                {testImageStatus === 'error' && ' ❌ Error'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {issues.map((issue) => {
          const imageUrl = getImageUrl(issue.image);
          const imageState = imageLoadStates[issue._id];
          
          return (
            <div
              key={issue._id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary-200"
            >
              {/* Image Section */}
              {issue.image && (
                <div className="relative w-full h-48 bg-gray-100">
                  {/* Actual Image */}
                  <img
                    src={imageUrl}
                    alt={`Issue: ${issue.title}`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(issue._id)}
                    onError={() => handleImageError(issue._id, imageUrl)}
                  />
                  
                  {/* Loading State */}
                  {imageState === 'loading' && (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        <RefreshCw className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-spin" />
                        <p className="text-gray-500 text-sm">Loading image...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Error State */}
                  {imageState === 'error' && (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Image not available</p>
                        <p className="text-xs text-gray-400 mt-1">Path: {issue.image}</p>
                        <p className="text-xs text-gray-400">URL: {imageUrl}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Photo Badge - Only show when image is loaded */}
                  {imageState === 'loaded' && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Image className="w-3 h-3" />
                        Photo
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {issue.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {issue.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(issue.createdAt)}`}>
                    {getStatusText(issue.createdAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate max-w-32">{issue.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(issue.createdAt)}</span>
                    </div>
                  </div>
                  
                  {issue.image && (
                    <div className="flex items-center gap-2 text-primary-600">
                      <Image className="w-4 h-4" />
                      <span className="font-medium">Photo attached</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Refresh Button */}
      <div className="mt-8 text-center">
        <button
          onClick={fetchIssues}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh List
        </button>
      </div>
    </div>
  );
};

export default IssueList;
