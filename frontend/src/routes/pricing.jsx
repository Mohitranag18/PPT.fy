import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  X, 
  Zap, 
  Palette, 
  Users, 
  Brain, 
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Clock,
  Shield,
  MessageSquare,
  GitBranch,
  Layers
} from 'lucide-react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleGetStarted = (plan) => {
    console.log(`Getting started with ${plan} plan`);
    // In your actual app, replace with navigation or API call
  };

  const pricingPlans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started with AI presentations",
      features: [
        { name: "AI Engine", value: "Google Gemini", included: true },
        { name: "Slide Templates", value: "10 templates", included: true },
        { name: "Max Slides per PPT", value: "8 slides", included: true },
        { name: "PPTs per Month", value: "5 presentations", included: true },
        { name: "Collaboration", value: "Solo workspace", included: false },
        { name: "Priority Support", value: "Community forum", included: false },
        { name: "Custom Branding", value: "PPT.fy watermark", included: false },
        { name: "Export Formats", value: "PDF only", included: true }
      ],
      cta: "Start for Free",
      popular: false
    },
    {
      name: "Premium",
      price: billingCycle === 'monthly' ? "₹299" : "₹2,499",
      period: billingCycle === 'monthly' ? "month" : "year",
      originalPrice: billingCycle === 'yearly' ? "₹3,588" : null,
      description: "For professionals and teams who need advanced features",
      features: [
        { name: "AI Engine", value: "OpenAI (ChatGPT)", included: true },
        { name: "Slide Templates", value: "20+ premium templates", included: true },
        { name: "Max Slides per PPT", value: "24 slides", included: true },
        { name: "PPTs per Month", value: "25 presentations", included: true },
        { name: "Collaboration", value: "Real-time team collaboration", included: true },
        { name: "Priority Support", value: "Email & chat support", included: true },
        { name: "Custom Branding", value: "Remove watermark", included: true },
        { name: "Export Formats", value: "PPTX, PDF, Images", included: true }
      ],
      cta: "Upgrade to Premium",
      popular: true
    }
  ];

  const premiumBenefits = [
    {
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      title: "Faster, Smarter Generation",
      description: "OpenAI's advanced models create more accurate, contextual content with better understanding of your requirements"
    },
    {
      icon: <Palette className="w-6 h-6 text-pink-600" />,
      title: "Premium Templates & Themes",
      description: "Access 20+ hand-crafted, modern templates designed by professionals for maximum visual impact"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Real-Time Collaboration",
      description: "Invite teammates to co-create, comment, and edit presentations together in real-time"
    },
    {
      icon: <Brain className="w-6 h-6 text-green-600" />,
      title: "AI-Powered Customization",
      description: "Advanced branding tools and theme customization powered by AI to match your brand perfectly"
    }
  ];

  const collaborationFeatures = [
    {
      icon: <Layers className="w-5 h-5 text-purple-600" />,
      title: "Shared Workspace",
      description: "Create team workspaces for organized collaboration"
    },
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      title: "Edit Together",
      description: "Multiple users can edit slides simultaneously"
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-green-600" />,
      title: "Comment System",
      description: "Leave feedback and suggestions on specific slides"
    },
    {
      icon: <GitBranch className="w-5 h-5 text-orange-600" />,
      title: "Version History",
      description: "Track changes and revert to previous versions"
    }
  ];

  const faqs = [
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your Premium subscription at any time. There are no cancellation fees, and you'll continue to have access to Premium features until the end of your billing period."
    },
    {
      question: "Do I lose my presentations if I downgrade?",
      answer: "No, you'll never lose your presentations. If you downgrade to Free, you'll keep all your existing presentations but will be limited to Free plan features for new creations."
    },
    {
      question: "How is OpenAI better than Gemini for slide generation?",
      answer: "OpenAI (ChatGPT) generally provides more contextual understanding, better content structure, and more natural language generation. It excels at creating cohesive narratives and maintains consistency across multiple slides."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption for all data transmission and storage. Your presentations are private and secure, and we never share your content with third parties."
    },
    {
      question: "Can I collaborate with more than one teammate?",
      answer: "Yes! Premium plans support unlimited team members. You can invite as many collaborators as needed to work on your presentations together."
    },
    {
      question: "What happens if I exceed my monthly limits?",
      answer: "If you reach your monthly presentation limit, you can either wait until the next billing cycle or upgrade to Premium for higher limits. We'll notify you before you hit your limits."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 w-full">
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 w-full">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-8">
            <Sparkles size={14} />
            Simple, transparent pricing
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Choose the plan that
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              works for you
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Whether you're creating solo or with a team, we've got a plan for every kind of presenter.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                Save 30%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="px-6 py-16 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white/60 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 relative ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                    {plan.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">{plan.originalPrice}/year</div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900">{feature.name}</span>
                        <div className="text-xs text-gray-600">{feature.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleGetStarted(plan.name)}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Go Premium Section */}
      <section className="px-6 py-16 bg-white/30 backdrop-blur-sm w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Go Premium?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unlock the full potential of AI-powered presentation creation with advanced features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {premiumBenefits.map((benefit, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Features */}
      <section className="px-6 py-16 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Create Together, In Real-Time
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Premium users can invite teammates to co-create slides, comment, and edit just like Google Slides – but powered by AI.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collaborationFeatures.map((feature, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:shadow-md transition-all duration-200">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-sm font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16 bg-white/30 backdrop-blur-sm w-full">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Got questions? We've got answers about our pricing and features
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
};

export default PricingPage;