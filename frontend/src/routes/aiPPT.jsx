import React from 'react';
import { useNavigate } from 'react-router-dom';

function AiPPT() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 flex flex-col items-center">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-pink-600">Generate PPT with AI</h1>
        <p className="text-gray-600 mt-2">Just describe your topic, and we'll handle the slides!</p>
      </div>

      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
        <div className="mb-4">
          <label htmlFor="pptName" className="block text-sm font-medium text-gray-700 mb-1">
            Presentation Name
          </label>
          <input
            type="text"
            id="pptName"
            placeholder="e.g., The Future of AI"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="numSlides" className="block text-sm font-medium text-gray-700 mb-1">
            No. of Slides
          </label>
          <input
            type="number"
            id="numSlides"
            placeholder="e.g., 7"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Describe the PPT Content
          </label>
          <textarea
            id="description"
            rows="6"
            placeholder="Write a brief about your topic..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>
        </div>

        <button onClick={()=>nav('/presentation/123')} className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-200">
          Generate
        </button>
      </div>
    </div>
  );
}

export default AiPPT;
