import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create_presentation } from '../api/endpoints';
import { Info, CheckCircle } from 'lucide-react';

function CustomPPT() {
  const nav = useNavigate();
  const [pname, setPname] = useState('');
  const [showTip, setShowTip] = useState(null);

  // Steps tracker
  const steps = [
    { label: 'Details' },
    { label: 'Create' }
  ];
  const currentStep = pname ? 1 : 0;

  const handleCreatePresentation = async () => {
    const response = await create_presentation(pname);
    console.log(response);
    // You can navigate somewhere after successful creation if you want
    // nav('/your-next-page');
  };

  return (
    <div className="min-h-[40vh] w-full flex flex-col items-center justify-center bg-transparent">
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
          <div className="relative">
            <label htmlFor="pptName" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <span role="img" aria-label="document">📄</span>Presentation Name
              <button type="button" onClick={() => setShowTip(showTip === 'pname' ? null : 'pname')} className="ml-1 text-gray-400 hover:text-pink-500">
                <Info size={16} />
              </button>
            </label>
            {showTip === 'pname' && (
              <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-xs text-gray-600 z-20 w-64">
                Give your presentation a clear, descriptive name. Example: "Q2 Marketing Strategy" or "Physics Revision Notes".
              </div>
            )}
            <input
              onChange={(e) => setPname(e.target.value)}
              value={pname}
              type="text"
              id="pptName"
              placeholder="Enter presentation name"
              className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          {/* Tips Section */}
          <div className="bg-white/60 border border-white/20 rounded-xl p-4 mb-2 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">Tip: Use a specific name so you can easily find your presentation later.</span>
          </div>
          <button onClick={handleCreatePresentation} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition duration-200 shadow-lg mt-2">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomPPT;
