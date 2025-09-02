import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Users, 
  TrendingUp,
  Home,
  Plus,
  List
} from "lucide-react";
import { IssueForm, IssueList } from "../Components";

export default function MainApp() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const handleBackToLanding = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern-hex"></div>
      </div>
      
      {/* Additional Background Layer */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0 bg-pattern-dots"></div>
      </div>

      {/* Floating Elements with Enhanced Animation */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-10 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full opacity-8 animate-pulse-slow"></div>

      {/* Header with Glassmorphism */}
      <header className="glass shadow-lg border-b border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div 
                className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl cursor-pointer hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={handleBackToLanding}
              >
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Civic Issue Reporter</h1>
                <p className="text-sm md:text-base text-gray-600">Community-driven problem solving</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToLanding}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/50 hover:shadow-md transform hover:scale-105"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </button>
              
              <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Community</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Better Organization */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Report & Track Civic Issues
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Help improve your community by reporting local issues and tracking their progress
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-12">
          {/* Form Section */}
          <div className="xl:col-span-1">
            <div className="glass rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Plus className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Report an Issue</h3>
              </div>
              <IssueForm onIssueSubmitted={() => setRefresh(!refresh)} />
            </div>
          </div>

          {/* Issues List Section */}
          <div className="xl:col-span-2">
            <div className="glass rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <List className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Recent Issues</h3>
              </div>
              <IssueList key={refresh} />
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-12 md:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">Fast</div>
              <div className="text-gray-600">Response Time</div>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">Secure</div>
              <div className="text-gray-600">Data Protection</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with Glassmorphism */}
      <footer className="glass border-t border-white/20 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center">
            <p className="text-gray-600 text-base md:text-lg mb-2">
              © 2024 Civic Issue Reporter. Empowering communities through technology.
            </p>
            <p className="text-sm md:text-base text-gray-500">
              Built with ❤️ for better communities
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
