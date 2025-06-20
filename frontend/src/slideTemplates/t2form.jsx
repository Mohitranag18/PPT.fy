import React from 'react';

function T2Form({ tempData, onDataChange }) {
  const fonts = [
    'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 
    'Tahoma', 'Trebuchet MS', 'Impact', 'Comic Sans MS', 'Courier New'
  ];

  const updateHeading = (field, value) => {
    const newData = { ...tempData };
    
    if (!newData.heading) {
      newData.heading = {
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
    
    if (!newData.heading.style) {
      newData.heading.style = {
        font: 'Arial',
        fontSize: 24,
        color: '#000000',
        bold: false,
        italic: false
      };
    }
    
    if (field === 'text') {
      newData.heading.text = value;
    } else {
      newData.heading.style[field] = value;
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

  const updateImage = (value) => {
    const newData = { ...tempData };
    newData.image = value;
    onDataChange(newData);
  };

  const renderHeadingEditor = () => {
    const heading = tempData?.heading || {
      text: '',
      style: { font: 'Arial', fontSize: 24, color: '#000000', bold: false, italic: false }
    };

    return (
      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Heading</h3>
        
        {/* Text Content */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
          <input
            type="text"
            value={heading.text || ''}
            onChange={(e) => updateHeading('text', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Enter heading"
          />
        </div>

        {/* Font Family */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
          <select
            value={heading.style?.font || 'Arial'}
            onChange={(e) => updateHeading('font', e.target.value)}
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
            Font Size: {heading.style?.fontSize || 24}px
          </label>
          <input
            type="range"
            min="12"
            max="72"
            value={heading.style?.fontSize || 24}
            onChange={(e) => updateHeading('fontSize', parseInt(e.target.value))}
            className="w-full accent-pink-500"
          />
        </div>

        {/* Color */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={heading.style?.color || '#000000'}
              onChange={(e) => updateHeading('color', e.target.value)}
              className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={heading.style?.color || '#000000'}
              onChange={(e) => updateHeading('color', e.target.value)}
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
              checked={heading.style?.bold || false}
              onChange={(e) => updateHeading('bold', e.target.checked)}
              className="mr-2 accent-pink-500"
            />
            <span className="text-sm font-medium text-gray-700">Bold</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={heading.style?.italic || false}
              onChange={(e) => updateHeading('italic', e.target.checked)}
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

  const renderImageEditor = () => {
    return (
      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Image</h3>
        
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            value={tempData?.image || ''}
            onChange={(e) => updateImage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        {tempData?.image && (
          <div className="mt-2">
            <img 
              src={tempData.image} 
              alt="Preview" 
              className="max-h-20 object-contain border border-gray-200 rounded"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-sm bg-gray-50 p-4 rounded-lg border border-gray-200 h-[450px] w-80 h-[450px] overflow-y-auto">
      
      {renderHeadingEditor()}
      
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
      
      {renderImageEditor()}
    </div>
  );
}

export default T2Form;