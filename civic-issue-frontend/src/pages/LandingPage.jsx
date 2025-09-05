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
  X,
  Sparkles,
  Zap,
  Users,
  TrendingUp,
  Star,
  Globe,
  Heart,
  Award
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
      {/* Enhanced Navigation */}
      <nav className="bg-white/95 backdrop-blur-xl shadow-2xl border-b-2 border-civic-blue/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div 
                className="p-3 bg-gradient-to-br from-civic-blue to-blue-700 rounded-xl cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl"
                onClick={() => navigate('/')}
              >
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-gray-900 text-shadow-lg">CivicEye</h1>
                <p className="text-sm md:text-base text-gray-700 font-bold">Smart Community Solutions</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-base font-bold">
              <a href="#features" className="text-gray-800 hover:text-civic-blue transition-all duration-300 hover:scale-105 relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-civic-blue to-blue-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
              <a href="#how-it-works" className="text-gray-800 hover:text-civic-blue transition-all duration-300 hover:scale-105 relative group">
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-civic-blue to-blue-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
              <a href="#stats" className="text-gray-800 hover:text-civic-blue transition-all duration-300 hover:scale-105 relative group">
                Impact
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-civic-blue to-blue-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
              <a href="#testimonials" className="text-gray-800 hover:text-civic-blue transition-all duration-300 hover:scale-105 relative group">
                Community
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-civic-blue to-blue-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-civic-blue to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 md:px-8 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </span>
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
          
          {/* Enhanced Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t-2 border-civic-blue/20 py-6 animate-slide-up-fade bg-white/95 backdrop-blur-sm">
              <div className="flex flex-col gap-6">
                <a href="#features" className="text-gray-800 hover:text-civic-blue transition-colors font-bold py-2 px-4 rounded-lg hover:bg-civic-blue/10">Features</a>
                <a href="#how-it-works" className="text-gray-800 hover:text-civic-blue transition-colors font-bold py-2 px-4 rounded-lg hover:bg-civic-blue/10">How It Works</a>
                <a href="#stats" className="text-gray-800 hover:text-civic-blue transition-colors font-bold py-2 px-4 rounded-lg hover:bg-civic-blue/10">Impact</a>
                <a href="#testimonials" className="text-gray-800 hover:text-civic-blue transition-colors font-bold py-2 px-4 rounded-lg hover:bg-civic-blue/10">Community</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-civic-blue via-blue-600 to-blue-800">
          <div className="absolute inset-0 bg-mesh animate-pulse-slow"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-300/15 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up-fade">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/30">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 10,000+ Citizens</span>
              <Star className="w-4 h-4 text-yellow-300" />
            </div>
            
            <h1 className="heading-responsive font-black mb-6 leading-tight text-white text-shadow-lg">
              Transform Your Community
              <br />
              <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent font-black text-shadow-glow animate-text-glow" style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)'}}>
                One Report at a Time
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
              Join thousands of citizens making their neighborhoods better. Report issues instantly, 
              track progress in real-time, and see the impact of your voice.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={handleGetStarted}
                className="group bg-white text-civic-blue px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-civic-blue/0 via-civic-blue/10 to-civic-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  Start Reporting Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="group text-white px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-white/30 hover:border-white/60 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center gap-3">
                  <Globe className="w-5 h-5" />
                  View Community Impact
                </span>
              </button>
            </div>
            
            {/* Stats Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-civic-blue mb-2">{stats.reported.toLocaleString()}+</div>
                <div className="text-gray-700 font-medium">Issues Reported</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.resolved.toLocaleString()}+</div>
                <div className="text-gray-700 font-medium">Problems Solved</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-700 font-medium">Active Monitoring</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-civic-blue/10 text-civic-blue px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              <span>Award-Winning Platform</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 text-shadow">
              Why Citizens Choose
              <span className="block bg-gradient-to-r from-civic-blue to-blue-600 bg-clip-text text-transparent">
                CivicEye
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The most advanced, user-friendly platform for community engagement and civic improvement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group text-center p-8 rounded-3xl bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 border-2 border-gray-100 hover:border-civic-blue/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-slide-up-fade card-hover"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-civic-blue/10 to-blue-100 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <div className="text-civic-blue group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">
                    <Sparkles className="w-4 h-4 text-white m-1" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-civic-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
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

      {/* Community Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-br from-civic-blue to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-grid opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
              <span>Loved by Communities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Real Stories, Real Impact
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how CivicEye is transforming communities across the region
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Priya Sharma",
                role: "Community Leader",
                text: "CivicEye helped us get 15 streetlights fixed in our area within just 2 weeks. The transparency is amazing!",
                avatar: "👩‍💼"
              },
              {
                name: "Rajesh Kumar",
                role: "Local Resident",
                text: "I reported a pothole that was causing accidents. It was fixed in 3 days! This platform really works.",
                avatar: "👨‍🔧"
              },
              {
                name: "Anita Verma",
                role: "School Teacher",
                text: "Our school playground drainage issue was resolved quickly. My students can play safely again!",
                avatar: "👩‍🏫"
              }
            ].map((testimonial, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl animate-slide-up-fade" style={{animationDelay: `${index * 200}ms`}}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Call to Action Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-civic-blue via-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh animate-pulse-slow"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up-fade">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 text-shadow">
              Ready to Transform
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Your Community?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join over 10,000 active citizens making their neighborhoods better. 
              Your voice matters, your reports create change.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="group bg-white text-civic-blue px-10 py-5 rounded-2xl text-xl font-black hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-civic-blue/0 via-civic-blue/10 to-civic-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  Start Making Impact
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
              
              <div className="flex items-center gap-4 text-white">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold">👤</div>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold">👤</div>
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold">👤</div>
                  <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-yellow-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">+1K</div>
                </div>
                <div className="text-left">
                  <p className="font-semibold">Join 1000+ active users</p>
                  <p className="text-blue-200 text-sm">Making change happen daily</p>
                </div>
              </div>
            </div>
          </div>
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
