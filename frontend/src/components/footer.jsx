import React from 'react';
import { Users, Star, Mail, Twitter, Linkedin, Github, Instagram, ArrowRight } from 'lucide-react';

const Footer = () => {
  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    // In your actual app, replace with: nav(path)
  };

  const handleSocialClick = (platform) => {
    console.log(`Opening ${platform}`);
    // In your actual app, replace with actual social links
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white w-full">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              />
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center text-sm">
                Subscribe
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              PPT.fy
            </h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed max-w-md">
              AI-powered presentations that transform your ideas into stunning designs in just one click.
            </p>
            
            {/* Stats */}
            <div className="flex gap-6 mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Users size={14} />
                <span className="text-xs">10K+ Users</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Star size={14} />
                <span className="text-xs">4.9/5 Rating</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <button
                onClick={() => handleSocialClick('Twitter')}
                className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Twitter size={16} />
              </button>
              <button
                onClick={() => handleSocialClick('LinkedIn')}
                className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Linkedin size={16} />
              </button>
              <button
                onClick={() => handleSocialClick('Github')}
                className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Github size={16} />
              </button>
              <button
                onClick={() => handleSocialClick('Instagram')}
                className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Instagram size={16} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation('/ai-ppt')}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  AI PPT Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/templates')}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Templates
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/pricing')}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation('/help')}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/contact')}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail size={14} className="text-purple-400" />
                  <span className="text-sm">hello@pptfy.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} PPT.fy. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <button
                onClick={() => handleNavigation('/privacy')}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => handleNavigation('/terms')}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Terms
              </button>
              <button
                onClick={() => handleNavigation('/security')}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Security
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;