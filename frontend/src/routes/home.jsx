import React from 'react';
import { Zap, Brain, Palette, Download, ArrowRight, Play, Sparkles, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  const features = [
    {
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      title: "AI-Powered Content",
      description: "Advanced AI generates structured, relevant content for your presentations automatically"
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      title: "One-Click Creation",
      description: "Transform your ideas into professional presentations in seconds"
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-600" />,
      title: "Smart Design",
      description: "Automatically generated layouts and visual elements that look stunning"
    },
    {
      icon: <Download className="w-6 h-6 text-purple-600" />,
      title: "Export Ready",
      description: "Download in multiple formats or present directly from our platform"
    }
  ];

  const stats = [
    { number: "10K+", label: "Presentations Created" },
    { number: "95%", label: "Time Saved" },
    { number: "150+", label: "Countries" },
    { number: "4.9/5", label: "User Rating" }
  ];

  const steps = [
    {
      title: "Enter Your Topic",
      description: "Simply provide your presentation topic and desired number of slides"
    },
    {
      title: "AI Magic Happens",
      description: "Our AI generates content, images, and layouts automatically"
    },
    {
      title: "Customize & Export",
      description: "Fine-tune and download or present directly"
    }
  ];

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 w-full">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-8">
            <Sparkles size={14} />
            Trusted by 10,000+ professionals
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Create stunning presentations
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              in one click
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            AI-powered presentation creator that transforms your ideas into professional slides with images, animations, and smart layouts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => handleNavigation('/build')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Play size={18} />
              Start Creating
            </button>
            
            <button 
              onClick={() => handleNavigation('/custom-ppt')}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
            >
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-gray-50 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why choose PPT.fy?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of presentation creation with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-16 w-full">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              How it works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to create your perfect presentation
            </p>
          </div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-6 py-16 bg-gray-50 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Trusted by professionals worldwide
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands who've transformed their presentation workflow
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Director",
                testimonial: "PPT.fy saved me hours of work. The AI-generated content is surprisingly accurate and professional.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Business Consultant",
                testimonial: "The automated design makes my presentations stand out. Clients are always impressed with the quality.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "University Professor",
                testimonial: "Creating lecture slides has never been easier. Perfect for academic presentations with complex content.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm italic">"{testimonial.testimonial}"</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 py-16 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left side - Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6 w-fit">
                  <Sparkles size={16} />
                  Newsletter
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 leading-tight">
                  Stay ahead with 
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                    PPT.fy insights
                  </span>
                </h3>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Get exclusive tips, AI presentation trends, and feature updates delivered to your inbox every week.
                </p>
                
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Weekly insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>No spam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Unsubscribe anytime</span>
                  </div>
                </div>
              </div>
              
              {/* Right side - Form */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 lg:p-12 flex flex-col justify-center border-l border-gray-100">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-900 placeholder-gray-500 outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                    />
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center gap-2 justify-center text-base group">
                    Subscribe to Newsletter
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    By subscribing, you agree to receive marketing emails from PPT.fy. You can unsubscribe at any time.
                  </p>
                </div>
                
                {/* Social proof */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="font-medium">Join 2,500+ subscribers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;