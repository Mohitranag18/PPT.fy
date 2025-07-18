import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create_presentation_with_AI } from '../api/endpoints'; // Adjust the path if needed
// Add Lucide icons for help and check/cross
import { Info, CheckCircle, XCircle } from 'lucide-react';

function AiPPT() {
  const nav = useNavigate();
  const [pname, setPname] = useState('');
  const [number_of_slides, setNumber_of_slides] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [useCase, setUseCase] = useState('Education');
  const [theme, setTheme] = useState('Minimal');
  const [showTip, setShowTip] = useState(null);

  // Estimate time: 5s + 1s per 5 slides (example logic)
  const slideCount = Number(number_of_slides) || 1;
  const estimatedTime = Math.max(5, 5 + Math.floor((slideCount - 1) / 2));

  const handleCreatePresentation  = async () => {
    const response = await create_presentation_with_AI(pname, number_of_slides, prompt, useCase, theme);
    console.log(response);
    const pid = response.pid
    nav(`/presentation/${pid}`)
  };

  // Steps tracker
  const steps = [
    { label: 'Details' },
    { label: 'Options' },
    { label: 'Generate' }
  ];
  const currentStep = prompt ? 2 : (pname ? 1 : 0);

  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center bg-transparent">
      <div className="w-full bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/20">
        {/* Steps Tracker */}
        <div className="flex items-center justify-between mb-6 px-2">
          {steps.map((step, idx) => (
            <div key={step.label} className="flex-1 flex flex-col items-center relative">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm z-10 ${idx <= currentStep ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}>{idx + 1}</div>
              <span className={`mt-2 text-xs font-medium ${idx <= currentStep ? 'text-pink-600' : 'text-gray-400'}`}>{step.label}</span>
              {idx < steps.length - 1 && (
                <div className={`absolute top-4 right-0 w-full h-1 ${idx < currentStep ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* First Row: Presentation Name & Number of Slides */}
          <div className="flex gap-4">
            {/* Presentation Name */}
            <div className="flex-1 relative">
              <label htmlFor="pptName" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <span role="img" aria-label="document">📄</span> Presentation Name
                <button type="button" onClick={() => setShowTip(showTip === 'pname' ? null : 'pname')} className="ml-1 text-gray-400 hover:text-pink-500">
                  <Info size={16} />
                </button>
              </label>
              {showTip === 'pname' && (
                <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-xs text-gray-600 z-20 w-64">
                  This will be the title of your presentation. Example: "The Future of AI"
                </div>
              )}
              <input
                onChange={(e) => setPname(e.target.value)}
                value={pname}
                type="text"
                id="pptName"
                placeholder="e.g., The Future of AI"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            {/* Number of Slides */}
            <div className="flex-1 relative">
              <label htmlFor="numSlides" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <span role="img" aria-label="slides">📄</span> Slides
                <button type="button" onClick={() => setShowTip(showTip === 'slides' ? null : 'slides')} className="ml-1 text-gray-400 hover:text-pink-500">
                  <Info size={16} />
                </button>
              </label>
              {showTip === 'slides' && (
                <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-xs text-gray-600 z-20 w-56">
                  Choose how many slides you want (1-20 recommended for best results).
                </div>
              )}
              <input
                onChange={(e) => setNumber_of_slides(e.target.value)}
                value={number_of_slides}
                type="number"
                id="numSlides"
                placeholder="e.g., 7"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                min={1}
                max={20}
              />
              {/* Estimated Time & Slide Count */}
              <div className="text-xs text-gray-500 mt-1">
                Estimated: <span className="font-semibold text-pink-600">{slideCount} Slides</span> in ~<span className="font-semibold text-purple-600">{estimatedTime} seconds</span>
              </div>
            </div>
          </div>

          {/* Second Row: Use Case & Theme */}
          <div className="flex gap-4">
            {/* Use Case */}
            <div className="flex-1 relative">
              <label htmlFor="useCase" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <span role="img" aria-label="use-case">🧩</span> Use Case
                <button type="button" onClick={() => setShowTip(showTip === 'useCase' ? null : 'useCase')} className="ml-1 text-gray-400 hover:text-pink-500">
                  <Info size={16} />
                </button>
              </label>
              {showTip === 'useCase' && (
                <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-xs text-gray-600 z-20 w-56">
                  Select the context for your presentation (e.g., Education, Business, Workshop, etc.).
                </div>
              )}
              <select
                id="useCase"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="Education">Education</option>
                <option value="Pitch Deck">Pitch Deck</option>
                <option value="Workshop">Workshop</option>
                <option value="Report">Report</option>
                <option value="Business">Business</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Theme */}
            <div className="flex-1 relative">
              <label htmlFor="theme" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <span role="img" aria-label="theme">🎨</span> Theme
                <button type="button" onClick={() => setShowTip(showTip === 'theme' ? null : 'theme')} className="ml-1 text-gray-400 hover:text-pink-500">
                  <Info size={16} />
                </button>
              </label>
              {showTip === 'theme' && (
                <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-xs text-gray-600 z-20 w-56">
                  Choose a visual style for your slides. Themes affect colors, fonts, and layout.
                </div>
              )}
              <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="Minimal">Minimal</option>
                <option value="Modern">Modern</option>
                <option value="Corporate">Corporate</option>
                <option value="Playful">Playful</option>
                <option value="Classic">Classic</option>
                <option value="Elegant">Elegant</option>
                <option value="Bold">Bold</option>
              </select>
            </div>
          </div>

          {/* Prompt/Topic */}
          <div className="relative">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <span role="img" aria-label="prompt">💡</span> Prompt/Topic
              <button type="button" onClick={() => setShowTip(showTip === 'prompt' ? null : 'prompt')} className="ml-1 text-gray-400 hover:text-pink-500">
                <Info size={16} />
              </button>
            </label>
            {showTip === 'prompt' && (
              <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-xs text-gray-600 z-20 w-72">
                Describe your topic or what you want the slides to cover. Be specific for best results!
              </div>
            )}
            <textarea
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              id="description"
              rows="4"
              placeholder="Write a brief about your topic..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
          </div>

          {/* Tips/Prompts Section */}
          <div className="bg-white/60 border border-white/20 rounded-xl p-4 mt-2 mb-2 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-700 text-base">Tips for Better Prompts:</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Good: <span className="font-medium">"Create a 10-slide business pitch for a fintech startup called Finwise, covering market analysis, product features, and team."</span></span>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Bad: <span className="font-medium">"Make something about finance"</span></span>
            </div>
          </div>

          {/* Generate Button */}
          <button onClick={handleCreatePresentation} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition duration-200 shadow-lg mt-2">
            Generate with AI
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiPPT;
