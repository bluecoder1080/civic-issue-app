import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Camera, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Building2,
  Shield,
  FileText,
  Menu,
  X
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    reported: 0,
    resolved: 0,
    pending: 0
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulate live stats animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        reported: prev.reported + Math.floor(Math.random() * 3),
        resolved: prev.resolved + Math.floor(Math.random() * 2),
        pending: prev.pending + Math.floor(Math.random() * 2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate('/app');
  };

  const features = [
    {
      icon: <Camera className="w-6 h-6 md:w-8 md:h-8 text-civic-blue" />,
      title: "Easy Photo Upload",
      description: "Take photos of issues directly from your phone or upload existing images"
    },
    {
      icon: <MapPin className="w-6 h-6 md:w-8 md:h-8 text-civic-blue" />,
      title: "Precise Location",
      description: "Pin exact locations using GPS or drag and drop on the map"
    },
    {
      icon: <Clock className="w-6 h-6 md:w-8 md:h-8 text-civic-blue" />,
      title: "Real-time Tracking",
      description: "Monitor the status of your reported issues in real-time"
    },
    {
      icon: <Shield className="w-6 h-6 md:w-8 md:h-8 text-civic-blue" />,
      title: "Secure & Private",
      description: "Your personal information is protected and secure"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Report",
      description: "Take a photo, describe the issue, and pinpoint the location",
      icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />
    },
    {
      number: "02",
      title: "Track",
      description: "Monitor progress and receive updates on your reported issues",
      icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />
    },
    {
      number: "03",
      title: "Resolve",
      description: "Get notified when issues are resolved and see the results",
      icon: <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-civic-white font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div 
                className="p-2 bg-civic-blue rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={() => navigate('/')}
              >
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900">Civic Issue Reporter</h1>
                <p className="text-xs md:text-sm text-gray-600">Government Services</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <a href="#features" className="hover:text-civic-blue transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-civic-blue transition-colors">How It Works</a>
              <a href="#stats" className="hover:text-civic-blue transition-colors">Stats</a>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleGetStarted}
                className="bg-civic-blue text-white px-4 md:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
              >
                Get Started
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col gap-4 text-sm text-gray-600">
                <a href="#features" className="hover:text-civic-blue transition-colors">Features</a>
                <a href="#how-it-works" className="hover:text-civic-blue transition-colors">How It Works</a>
                <a href="#stats" className="hover:text-civic-blue transition-colors">Stats</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-civic-blue to-blue-700 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-bounce-in">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Report Civic Issues
              <br />
              <span className="text-blue-200">Build Better Communities</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              Help improve your neighborhood by reporting local issues like potholes, 
              streetlight failures, and water leaks. Your voice matters.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-white text-civic-blue px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Report an Issue
              <ArrowRight className="inline-block ml-2 w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              We've designed the most user-friendly way for citizens to report and track civic issues
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-4 md:p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-sm mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section id="stats" className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Live Community Impact
            </h2>
            <p className="text-lg md:text-xl text-gray-600 px-4">
              See how citizens are making a difference in real-time
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 md:p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-civic-blue rounded-full mb-4">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-civic-blue mb-2">
                {stats.reported.toLocaleString()}
              </div>
              <p className="text-sm md:text-base text-gray-600">Issues Reported</p>
            </div>
            
            <div className="text-center p-6 md:p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-civic-green rounded-full mb-4">
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-civic-green mb-2">
                {stats.resolved.toLocaleString()}
              </div>
              <p className="text-sm md:text-base text-gray-600">Issues Resolved</p>
            </div>
            
            <div className="text-center p-6 md:p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-civic-orange rounded-full mb-4">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-civic-orange mb-2">
                {stats.pending.toLocaleString()}
              </div>
              <p className="text-sm md:text-base text-gray-600">In Progress</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Three simple steps to make your community better
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-civic-blue transform -translate-y-1/2 z-0"></div>
                )}
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-civic-blue rounded-full mb-4 md:mb-6 text-white font-bold text-lg md:text-xl">
                    {step.number}
                  </div>
                  <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full mb-3 md:mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 md:py-20 bg-civic-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 px-4">
            Join thousands of citizens who are already improving their communities. 
            Start reporting issues today and see the impact.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-civic-blue px-8 md:px-10 py-3 md:py-4 rounded-lg text-lg md:text-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Reporting Now
            <ArrowRight className="inline-block ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-civic-blue rounded-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold">Civic Issue Reporter</h3>
                  <p className="text-gray-400 text-sm">Government Services</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md text-sm md:text-base">
                Empowering citizens to report and track local issues for better communities. 
                Built with modern technology for government efficiency.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm md:text-base">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#stats" className="hover:text-white transition-colors">Statistics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm md:text-base">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li>Government Services</li>
                <li>24/7 Support</li>
                <li>Emergency: 911</li>
                <li>info@civicissues.gov</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm md:text-base">
              © 2024 Civic Issue Reporter. All rights reserved. 
              A government service designed for community improvement.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
