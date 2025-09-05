import { useEffect, useState } from "react";
import { MapPin, Calendar, Image, RefreshCw, AlertTriangle, Eye, Bug, TestTube, Clock, CheckCircle2, AlertCircle, Sparkles, TrendingUp } from "lucide-react";
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

  const getResolutionBadge = (isResolved) => {
    return {
      text: isResolved ? 'Resolved' : 'Pending',
      classes: isResolved
        ? 'bg-green-100 text-green-800 border-green-200'
        : 'bg-red-100 text-red-800 border-red-200'
    };
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
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-primary-600 animate-spin" />
              </div>
              <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full mx-auto animate-ping opacity-20"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Issues</h3>
            <p className="text-gray-600">Fetching the latest community reports...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-rose-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Unable to Load Issues</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
            <button
              onClick={fetchIssues}
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
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
        <div className="text-center py-20">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-12 h-12 text-gray-400" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full mx-auto animate-pulse opacity-30"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Issues Yet</h3>
          <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto leading-relaxed">
            Your community is looking great! Be the first to report an issue and help make it even better.
          </p>
          <div className="flex items-center justify-center gap-2 text-primary-600">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Ready to make a difference?</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Stats Overview */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Total Issues</p>
              <p className="text-2xl font-bold text-blue-900">{issues.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Resolved</p>
              <p className="text-2xl font-bold text-green-900">{issues.filter(i => i.issue_resolved).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-800">Pending</p>
              <p className="text-2xl font-bold text-orange-900">{issues.filter(i => !i.issue_resolved).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Section - Collapsible */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl overflow-hidden">
          <div className="p-4">
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="flex items-center gap-3 text-yellow-800 hover:text-yellow-900 transition-colors w-full"
            >
              <Bug className="w-5 h-5" />
              <span className="font-semibold">Debug Information</span>
              <div className={`ml-auto transform transition-transform ${showDebug ? 'rotate-180' : ''}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {showDebug && (
              <div className="mt-4 pt-4 border-t border-yellow-300 text-sm text-yellow-800 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Backend URL:</strong> {config.BACKEND_URL}</p>
                    <p><strong>API Base:</strong> {config.API_BASE_URL}</p>
                    <p><strong>Total Issues:</strong> {issues.length}</p>
                    <p><strong>Issues with Images:</strong> {issues.filter(i => i.image).length}</p>
                  </div>
                  <div>
                    <button
                      onClick={testBackendImage}
                      disabled={testImageStatus === 'testing'}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                    >
                      {testImageStatus === 'testing' ? 'Testing...' : 'Test Backend'}
                    </button>
                    <p className="mt-2">
                      <strong>Status:</strong>
                      {testImageStatus === 'idle' && ' Not tested'}
                      {testImageStatus === 'testing' && ' Testing...'}
                      {testImageStatus === 'success' && ' ✅ Accessible'}
                      {testImageStatus === 'failed' && ' ❌ Not accessible'}
                      {testImageStatus === 'error' && ' ❌ Error'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-8">
        {issues.map((issue, index) => {
          const imageUrl = getImageUrl(issue.image);
          const imageState = imageLoadStates[issue._id];
          
          return (
            <div
              key={issue._id}
              className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-primary-200 transform hover:scale-[1.02] animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Section */}
              {issue.image && (
                <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {/* Actual Image */}
                  <img
                    src={imageUrl}
                    alt={`Issue: ${issue.title}`}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                      imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(issue._id)}
                    onError={() => handleImageError(issue._id, imageUrl)}
                  />
                  
                  {/* Loading State */}
                  {imageState === 'loading' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                          <RefreshCw className="w-6 h-6 text-primary-500 animate-spin" />
                        </div>
                        <p className="text-gray-600 font-medium">Loading image...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Error State */}
                  {imageState === 'error' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                          <Image className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium mb-1">Image not available</p>
                        <p className="text-xs text-gray-500">Failed to load: {issue.image}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Photo Badge - Only show when image is loaded */}
                  {imageState === 'loaded' && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-black bg-opacity-70 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm flex items-center gap-2 shadow-lg">
                        <Image className="w-4 h-4" />
                        Photo Evidence
                      </div>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}

              {/* Content Section */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1 pr-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary-700 transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4 text-base">
                      {issue.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {/* Time-based badge */}
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 shadow-sm ${getStatusColor(issue.createdAt)}`}>
                      {getStatusText(issue.createdAt)}
                    </span>
                    {/* Resolution badge */}
                    {(() => {
                      const resolvedCoalesced = Boolean(
                        (issue.issue_resolved !== undefined ? issue.issue_resolved : undefined) ??
                        (issue.issue_resolve !== undefined ? issue.issue_resolve : undefined) ??
                        false
                      );
                      const { text, classes } = getResolutionBadge(resolvedCoalesced);
                      return (
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 shadow-sm ${classes} flex items-center gap-2`}>
                          {resolvedCoalesced ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <AlertCircle className="w-4 h-4" />
                          )}
                          {text}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Location</p>
                          <p className="text-gray-600 truncate max-w-48">{issue.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Reported</p>
                          <p className="text-gray-600">{formatDate(issue.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                    
                    {issue.image && (
                      <div className="flex items-center gap-2 text-primary-600 bg-primary-50 px-3 py-2 rounded-lg border border-primary-200">
                        <Image className="w-4 h-4" />
                        <span className="font-semibold text-sm">Photo Evidence</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Refresh Button */}
      <div className="mt-12 text-center">
        <button
          onClick={fetchIssues}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 transform hover:scale-105 shadow-sm hover:shadow-md"
        >
          <RefreshCw className="w-5 h-5" />
          Refresh Issues
        </button>
      </div>
    </div>
  );
};

export default IssueList;
