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

      {/* CTA Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-purple-600 to-pink-600 w-full">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to create amazing presentations?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've already discovered the power of AI-driven presentation creation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleNavigation('/build')}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 justify-center"
            >
              Get Started Free
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => handleNavigation('/pricing')}
              className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-200"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between mx-12 gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2 text-white">
                Stay Updated with PPT.fy
              </h3>
              <p className="text-purple-100 text-sm">
                Get the latest updates and presentation tips delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-[300px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-white outline-none ring-1 ring-white text-sm"
              />
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center text-sm">
                Subscribe
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;