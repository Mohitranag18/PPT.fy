import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Zap, 
  Palette, 
  Download, 
  Globe, 
  ChevronDown,
  ChevronUp,
  Bot,
  Edit,
  Play,
  Clock,
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import AiPPT from './aiPPT';
import CustomPPT from './customPPT';


function BuildPage() {
  const [mode, setMode] = useState('ai'); // 'custom' or 'ai'
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [typingText, setTypingText] = useState('');

  // Typing animation effect
  useEffect(() => {
    const fullText = 'Create Presentations Your Way';
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypingText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);


  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      title: "Save Hours with AI",
      description: "Generate professional presentations in seconds with AI-powered design"
    },
    {
      icon: <Palette className="w-6 h-6 text-pink-600" />,
      title: "Custom Themes",
      description: "Match your brand with beautiful, customizable themes and layouts"
    },
    {
      icon: <Download className="w-6 h-6 text-blue-600" />,
      title: "Instant Download",
      description: "Download your presentations in PPTX format instantly"
    },
    {
      icon: <Globe className="w-6 h-6 text-green-600" />,
      title: "Global Trust",
      description: "Used by professionals across 25+ countries worldwide"
    }
  ];

  const faqs = [
    {
      question: "Can I edit AI-generated slides?",
      answer: "Yes! All AI-generated slides are fully editable. You can modify text, images, layouts, and styling after generation."
    },
    {
      question: "How many slides can I generate?",
      answer: "You can generate up to 20 slides per presentation with AI, and there's no limit for custom presentations."
    },
    {
      question: "Can I use this for commercial projects?",
      answer: "Absolutely! All presentations created with PPT.fy can be used for commercial purposes without any restrictions."
    },
    {
      question: "What formats can I export to?",
      answer: "Currently, we support PPTX format, which is compatible with PowerPoint, Google Slides, and other presentation software."
    },
    {
      question: "How long does AI generation take?",
      answer: "AI generation typically takes 30-60 seconds depending on the complexity and number of slides requested."
    }
  ];

  const tips = [
    "Keep your topic short and focused for better AI results",
    "Pick a use case that matches your presentation goal",
    "Choose a theme that fits your audience and content tone",
    "Be specific in your prompt for more accurate content generation"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 w-full">
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 pb-0 md:pb-0 w-full">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-8">
            <Sparkles size={14} />
            Choose Your Creation Style
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Create stunning presentations
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              your way
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose between building your slides manually or using AI to auto-generate polished, engaging presentations in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => setMode('ai')}
              className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 ${mode === 'ai' ? '' : 'opacity-80'}`}
            >
              <Bot size={18} />
              Build with AI
            </button>
            <button 
              onClick={() => setMode('custom')}
              className={`border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 ${mode === 'custom' ? 'border-purple-600 text-purple-600' : ''}`}
            >
              <Edit size={18} />
              Custom PPT
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Forms */}
      <section className="px-6 py-8 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-xl">
            {mode === 'ai' ? (
              <AiPPT />
            ) : (
              <CustomPPT />
            )}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="px-6 py-16 bg-white/30 backdrop-blur-sm w-full">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              ✨ Tips for Better Results
            </h2>
            <p className="text-lg text-gray-600">
              Follow these best practices to create amazing presentations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about PPT.fy
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/40 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BuildPage;