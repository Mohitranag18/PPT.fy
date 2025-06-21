import React from 'react';

function T4Form({ tempData, onDataChange }) {
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
          fontSize: section === 'heading' ? 24 : section === 'topic' ? 20 : 16,
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
        fontSize: section === 'heading' ? 24 : section === 'topic' ? 20 : 16,
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

  const updatePoint = (index, field, value) => {
    const newData = { ...tempData };
    
    if (!newData.points) {
      newData.points = [];
    }
    
    if (!newData.points[index]) {
      newData.points[index] = {
        text: '',
        style: {
          font: 'Arial',
          fontSize: 16,
          color: '#000000',
          bold: false,
          italic: false
        }
      };
    }
    
    if (!newData.points[index].style) {
      newData.points[index].style = {
        font: 'Arial',
        fontSize: 16,
        color: '#000000',
        bold: false,
        italic: false
      };
    }
    
    if (field === 'text') {
      newData.points[index].text = value;
    } else {
      newData.points[index].style[field] = value;
    }
    
    onDataChange(newData);
  };

  const addPoint = () => {
    const newData = { ...tempData };
    if (!newData.points) {
      newData.points = [];
    }
    
    newData.points.push({
      text: 'New point',
      style: {
        font: 'Arial',
        fontSize: 16,
        color: '#000000',
        bold: false,
        italic: false
      }
    });
    
    onDataChange(newData);
  };

  const removePoint = (index) => {
    const newData = { ...tempData };
    if (newData.points) {
      newData.points.splice(index, 1);
      onDataChange(newData);
    }
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

  const renderPointEditor = (point, index) => {
    const pointData = point || {
      text: '',
      style: { font: 'Arial', fontSize: 16, color: '#000000', bold: false, italic: false }
    };

    return (
      <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-3">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-md font-medium text-gray-700">Point {index + 1}</h4>
          <button
            onClick={() => removePoint(index)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>
        
        {/* Text Content */}
        <div className="mb-2">
          <input
            type="text"
            value={pointData.text || ''}
            onChange={(e) => updatePoint(index, 'text', e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
            placeholder={`Enter point ${index + 1}`}
          />
        </div>

        {/* Font and Size */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <select
            value={pointData.style?.font || 'Arial'}
            onChange={(e) => updatePoint(index, 'font', e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
          >
            {fonts.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
          <input
            type="number"
            min="12"
            max="72"
            value={pointData.style?.fontSize || 16}
            onChange={(e) => updatePoint(index, 'fontSize', parseInt(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
            placeholder="Size"
          />
        </div>

        {/* Color */}
        <div className="flex items-center gap-2 mb-2">
          <input
            type="color"
            value={pointData.style?.color || '#000000'}
            onChange={(e) => updatePoint(index, 'color', e.target.value)}
            className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={pointData.style?.color || '#000000'}
            onChange={(e) => updatePoint(index, 'color', e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
            placeholder="#000000"
          />
        </div>

        {/* Bold and Italic */}
        <div className="flex gap-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={pointData.style?.bold || false}
              onChange={(e) => updatePoint(index, 'bold', e.target.checked)}
              className="mr-1 accent-pink-500"
            />
            <span className="text-xs text-gray-700">Bold</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={pointData.style?.italic || false}
              onChange={(e) => updatePoint(index, 'italic', e.target.checked)}
              className="mr-1 accent-pink-500"
            />
            <span className="text-xs text-gray-700">Italic</span>
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-sm bg-gray-50 p-4 rounded-lg border border-gray-200 w-80 h-[450px] overflow-y-auto">
      
      {renderTextEditor('heading', 'Heading', 24)}
      {renderTextEditor('topic', 'Topic', 20)}
      
      {/* Points Section */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Points</h3>
          <button
            onClick={addPoint}
            className="px-3 py-1 bg-pink-600 text-white rounded-md hover:bg-pink-700 text-sm"
          >
            Add Point
          </button>
        </div>
        
        {tempData?.points?.map((point, index) => renderPointEditor(point, index))}
        
        {(!tempData?.points || tempData.points.length === 0) && (
          <p className="text-gray-500 text-sm">No points added yet. Click "Add Point" to start.</p>
        )}
      </div>
    </div>
  );
}

export default T4Form;