import React from 'react';

function T1Form({ tempData, onDataChange }) {
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

  const renderTextEditor = (section, label) => {
    const data = tempData?.[section] || {
      text: '',
      style: { font: 'Arial', fontSize: 24, color: '#000000', bold: false, italic: false }
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
            Font Size: {data.style?.fontSize || 24}px
          </label>
          <input
            type="range"
            min="12"
            max="72"
            value={data.style?.fontSize || 24}
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

  return (
    <div className="w-full max-w-sm bg-gray-50 p-4 rounded-lg border border-gray-200 w-80 h-[450px] overflow-y-auto">
      {renderTextEditor('heading', 'Heading')}
      {renderTextEditor('subheading', 'Subheading')}
      {renderTextEditor('description', 'Description')}
    </div>
  );
}

export default T1Form;