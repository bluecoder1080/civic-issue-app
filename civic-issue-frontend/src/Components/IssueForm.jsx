import { useState, useRef, useEffect } from "react";
import { Camera, Upload, X, MapPin, FileText, AlertCircle, CheckCircle, Sparkles, Zap, Mic, MicOff } from "lucide-react";
import api from "../api";
import { getPreciseLocation } from "../utils/geocoding";

const IssueForm = ({ onIssueSubmitted }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setDescription(prev => prev + ' ' + finalTranscript);
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      setSpeechRecognition(recognition);
    }
  }, []);

  // Get user location with reverse geocoding

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Try precise location detection first
          const readableLocation = await getPreciseLocation(latitude, longitude);
          
          if (readableLocation) {
            setLocation(readableLocation);
          } else {
            // Fallback to coordinates only if geocoding completely fails
            setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          }
        },
        (error) => {
          console.log("Location access denied:", error);
          setLocation("Location not available");
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000 // Cache for 1 minute for more frequent updates
        }
      );
    }
  }, []);

  // Camera functionality
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  };

  // Speech-to-text functionality
  const toggleSpeechRecognition = () => {
    if (!speechRecognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }
    
    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
    } else {
      speechRecognition.start();
      setIsListening(true);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
        setImage(file);
        setCapturedImage(URL.createObjectURL(blob));
      }, 'image/jpeg');
      
      stopCamera();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setCapturedImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setCapturedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      if (image) {
        formData.append("image", image);
      }

      const res = await api.post("/issues", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      setTitle("");
      setDescription("");
      setLocation("");
      setImage(null);
      setCapturedImage(null);
      onIssueSubmitted();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit issue");
    }

    setLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Field */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-500" />
            Issue Title *
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            <input
              type="text"
              placeholder="e.g., Broken street light, Pothole, Garbage not collected"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 bg-white hover:border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* Description Field */}
        <div className="group">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <FileText className="w-4 h-4 text-primary-500" />
              Issue Description *
            </label>
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                  : 'bg-civic-blue hover:bg-blue-700 text-white'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span className="text-sm">Stop</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span className="text-sm">Speak</span>
                </>
              )}
            </button>
          </div>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail... (or click 'Speak' to use voice input)"
              required
              rows={4}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-civic-blue/20 transition-all duration-300 resize-none hover:border-gray-300 ${
                isListening 
                  ? 'border-red-400 bg-red-50 focus:border-red-500' 
                  : 'border-gray-200 focus:border-civic-blue'
              }`}
            />
            {isListening && (
              <div className="absolute top-2 right-2 flex items-center gap-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Listening...
              </div>
            )}
          </div>
        </div>

        {/* Location Field */}
        <div className="group">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <MapPin className="w-4 h-4 text-primary-500" />
              Location *
            </label>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Auto-detected</span>
          </div>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Building Name, Street Address, Area, City (GPS will auto-detect precise location)"
              className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 bg-white hover:border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Camera className="w-4 h-4 text-primary-500" />
            Photo Evidence
            <span className="text-xs font-normal text-gray-500">(Optional but recommended)</span>
          </label>
          
          {!capturedImage ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={startCamera}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 text-primary-700 font-semibold rounded-xl transition-all duration-300 border-2 border-primary-200 hover:border-primary-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                >
                  <Camera className="w-5 h-5" />
                  Take Photo
                </button>
                <label className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 cursor-pointer transform hover:scale-105 shadow-sm hover:shadow-md">
                  <Upload className="w-5 h-5" />
                  Upload Photo
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Photos help authorities understand and prioritize issues faster</p>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-56 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl"></div>
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg transform hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Photo attached
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            {loading ? (
              <div className="flex items-center justify-center gap-3 relative z-10">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg">Submitting Issue...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3 relative z-10">
                <Zap className="w-5 h-5" />
                <span className="text-lg">Submit Issue Report</span>
              </div>
            )}
          </button>
        </div>
      </form>

      {/* Success/Error Message */}
      {message && (
        <div className={`mt-8 p-6 rounded-xl border-2 animate-slide-up ${
          message.includes('✅') 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-200 shadow-green-100' 
            : 'bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-red-200 shadow-red-100'
        } shadow-lg`}>
          <div className="flex items-center gap-3">
            {message.includes('✅') ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600" />
            )}
            <span className="font-semibold text-lg">{message}</span>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-bounce-in">
            <div className="relative w-full h-72 bg-black rounded-xl overflow-hidden shadow-inner">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute inset-0 border-2 border-white/30 rounded-xl pointer-events-none"></div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={capturePhoto}
                className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Capture Photo
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueForm;
