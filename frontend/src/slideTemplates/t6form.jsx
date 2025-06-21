import React, { useRef } from 'react';

function T6Form({ tempData, onDataChange }) {
  // Store the original flowchart data when component first renders
  const originalFlowchartRef = useRef(null);
  
  // Initialize original data on first render
  if (originalFlowchartRef.current === null) {
    originalFlowchartRef.current = {
      code: tempData?.chartType?.flowchart?.code || '',
      description: tempData?.chartType?.flowchart?.description || ''
    };
  }

  const fonts = [
    'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 
    'Tahoma', 'Trebuchet MS', 'Impact', 'Comic Sans MS', 'Courier New'
  ];

  const updateField = (section, field, value) => {
    const newData = { ...tempData };
    
    // Initialize section if it doesn't exist
    if (!newData[section]) {
      newData[section] = {
        text: '',
        style: {
          font: 'Arial',
          fontSize: 24,
          color: '#000000',
          bold: false,
          italic: false
        }
      };
    }
    
    // Initialize style if it doesn't exist
    if (!newData[section].style) {
      newData[section].style = {
        font: 'Arial',
        fontSize: 24,
        color: '#000000',
        bold: false,
        italic: false
      };
    }
    
    if (field === 'text') {
      newData[section].text = value;
    } else {
      newData[section].style[field] = value;
    }
    
    onDataChange(newData);
  };

  const updateFlowchart = (field, value) => {
    const newData = { ...tempData };
    
    // Initialize chartType structure if it doesn't exist
    if (!newData.chartType) {
      newData.chartType = {};
    }
    
    if (!newData.chartType.flowchart) {
      newData.chartType.flowchart = {
        code: '',
        description: ''
      };
    }
    
    newData.chartType.flowchart[field] = value;
    onDataChange(newData);
  };

  const resetToOriginal = () => {
    const newData = { ...tempData };
    
    // Initialize chartType structure if it doesn't exist
    if (!newData.chartType) {
      newData.chartType = {};
    }
    
    if (!newData.chartType.flowchart) {
      newData.chartType.flowchart = {};
    }
    
    // Reset to original values
    newData.chartType.flowchart.code = originalFlowchartRef.current.code;
    newData.chartType.flowchart.description = originalFlowchartRef.current.description;
    
    onDataChange(newData);
  };

  const renderTextEditor = (section, label, defaultFontSize = 24) => {
    const data = tempData?.[section] || {
      text: '',
      style: { font: 'Arial', fontSize: defaultFontSize, color: '#000000', bold: false, italic: false }
    };

    return (
      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">{label}</h3>
        
        {/* Text Content */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
          <input
            type="text"
            value={data.text || ''}
            onChange={(e) => updateField(section, 'text', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        </div>

        {/* Font Family */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
          <select
            value={data.style?.font || 'Arial'}
            onChange={(e) => updateField(section, 'font', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            {fonts.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Size: {data.style?.fontSize || defaultFontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="72"
            value={data.style?.fontSize || defaultFontSize}
            onChange={(e) => updateField(section, 'fontSize', parseInt(e.target.value))}
            className="w-full accent-pink-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>12px</span>
            <span>72px</span>
          </div>
        </div>

        {/* Color */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={data.style?.color || '#000000'}
              onChange={(e) => updateField(section, 'color', e.target.value)}
              className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={data.style?.color || '#000000'}
              onChange={(e) => updateField(section, 'color', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Bold and Italic */}
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={data.style?.bold || false}
              onChange={(e) => updateField(section, 'bold', e.target.checked)}
              className="mr-2 accent-pink-500"
            />
            <span className="text-sm font-medium text-gray-700">Bold</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={data.style?.italic || false}
              onChange={(e) => updateField(section, 'italic', e.target.checked)}
              className="mr-2 accent-pink-500"
            />
            <span className="text-sm font-medium text-gray-700">Italic</span>
          </label>
        </div>
      </div>
    );
  };

  const renderFlowchartEditor = () => {
    const flowchartData = tempData?.chartType?.flowchart || {
      code: '',
      description: ''
    };

    return (
      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Flowchart</h3>
        
        {/* Flowchart Code */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mermaid Code
          </label>
          <textarea
            value={flowchartData.code || ''}
            onChange={(e) => updateFlowchart('code', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mono text-sm"
            placeholder="graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E"
            rows="6"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter Mermaid flowchart syntax. Visit <span className="font-mono">mermaid.js.org</span> for documentation.
          </p>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={flowchartData.description || ''}
            onChange={(e) => updateFlowchart('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Enter flowchart description"
            rows="3"
          />
        </div>

        {/* Sample Templates */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Quick Templates</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updateFlowchart('code', `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E`)}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
            >
              Basic Flow
            </button>
            <button
              onClick={() => updateFlowchart('code', `graph LR
    A[Input] --> B[Process]
    B --> C[Output]
    C --> D[End]`)}
              className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
            >
              Simple Process
            </button>
            <button
              onClick={() => updateFlowchart('code', `graph TD
    A[Problem] --> B{Analysis}
    B --> C[Solution 1]
    B --> D[Solution 2]
    B --> E[Solution 3]
    C --> F[Implementation]
    D --> F
    E --> F`)}
              className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200"
            >
              Problem Solving
            </button>
            <button
              onClick={resetToOriginal}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 border border-gray-300"
            >
              Reset to Original
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-sm bg-gray-50 p-4 rounded-lg border border-gray-200 w-80 h-[450px] overflow-y-auto">
      
      {renderTextEditor('heading', 'Heading', 24)}
      
      {renderFlowchartEditor()}
      
    </div>
  );
}

export default T6Form;