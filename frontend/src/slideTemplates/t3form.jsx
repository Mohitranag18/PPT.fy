import React from 'react';

function T3Form({ tempData, onDataChange }) {
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

  const updateTopic = (topicKey, field, value) => {
    const newData = { ...tempData };
    
    if (!newData[topicKey]) {
      newData[topicKey] = {
        text: '',
        style: {
          font: 'Arial',
          fontSize: 20,
          color: '#000000',
          bold: false,
          italic: false
        }
      };
    }
    
    if (!newData[topicKey].style) {
      newData[topicKey].style = {
        font: 'Arial',
        fontSize: 20,
        color: '#000000',
        bold: false,
        italic: false
      };
    }
    
    if (field === 'text') {
      newData[topicKey].text = value;
    } else {
      newData[topicKey].style[field] = value;
    }
    
    onDataChange(newData);
  };

  const updatePoint = (pointsKey, index, field, value) => {
    const newData = { ...tempData };
    
    if (!newData[pointsKey]) {
      newData[pointsKey] = [];
    }
    
    if (!newData[pointsKey][index]) {
      newData[pointsKey][index] = {
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
    
    if (!newData[pointsKey][index].style) {
      newData[pointsKey][index].style = {
        font: 'Arial',
        fontSize: 16,
        color: '#000000',
        bold: false,
        italic: false
      };
    }
    
    if (field === 'text') {
      newData[pointsKey][index].text = value;
    } else {
      newData[pointsKey][index].style[field] = value;
    }
    
    onDataChange(newData);
  };

  const addPoint = (pointsKey) => {
    const newData = { ...tempData };
    if (!newData[pointsKey]) {
      newData[pointsKey] = [];
    }
    
    newData[pointsKey].push({
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

  const removePoint = (pointsKey, index) => {
    const newData = { ...tempData };
    if (newData[pointsKey]) {
      newData[pointsKey].splice(index, 1);
      onDataChange(newData);
    }
  };

  const renderHeadingEditor = () => {
    const heading = tempData?.heading || {
      text: '',
      style: { font: 'Arial', fontSize: 24, color: '#000000', bold: false, italic: false }
    };

    return (
      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Heading</h3>
        
        <div className="mb-3">
          <input
            type="text"
            value={heading.text || ''}
            onChange={(e) => updateHeading('text', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Enter heading"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <select
            value={heading.style?.font || 'Arial'}
            onChange={(e) => updateHeading('font', e.target.value)}
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
            value={heading.style?.fontSize || 24}
            onChange={(e) => updateHeading('fontSize', parseInt(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
            placeholder="Size"
          />
        </div>

        <div className="flex items-center gap-2 mb-3">
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
            className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
            placeholder="#000000"
          />
        </div>

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

  const renderTopicEditor = (topicKey, label) => {
    const topic = tempData?.[topicKey] || {
      text: '',
      style: { font: 'Arial', fontSize: 20, color: '#000000', bold: false, italic: false }
    };

    return (
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-3">
        <h4 className="text-md font-semibold mb-2 text-blue-800">{label}</h4>
        
        <div className="mb-2">
          <input
            type="text"
            value={topic.text || ''}
            onChange={(e) => updateTopic(topicKey, 'text', e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <select
            value={topic.style?.font || 'Arial'}
            onChange={(e) => updateTopic(topicKey, 'font', e.target.value)}
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
            value={topic.style?.fontSize || 20}
            onChange={(e) => updateTopic(topicKey, 'fontSize', parseInt(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
            placeholder="Size"
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="color"
            value={topic.style?.color || '#000000'}
            onChange={(e) => updateTopic(topicKey, 'color', e.target.value)}
            className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={topic.style?.color || '#000000'}
            onChange={(e) => updateTopic(topicKey, 'color', e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
            placeholder="#000000"
          />
        </div>

        <div className="flex gap-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={topic.style?.bold || false}
              onChange={(e) => updateTopic(topicKey, 'bold', e.target.checked)}
              className="mr-1 accent-pink-500"
            />
            <span className="text-xs text-gray-700">Bold</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={topic.style?.italic || false}
              onChange={(e) => updateTopic(topicKey, 'italic', e.target.checked)}
              className="mr-1 accent-pink-500"
            />
            <span className="text-xs text-gray-700">Italic</span>
          </label>
        </div>
      </div>
    );
  };

  const renderPointEditor = (pointsKey, point, index, topicLabel) => {
    const pointData = point || {
      text: '',
      style: { font: 'Arial', fontSize: 16, color: '#000000', bold: false, italic: false }
    };

    return (
      <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-600">{topicLabel} Point {index + 1}</span>
          <button
            onClick={() => removePoint(pointsKey, index)}
            className="text-red-500 hover:text-red-700 text-xs"
          >
            ×
          </button>
        </div>
        
        <div className="mb-2">
          <input
            type="text"
            value={pointData.text || ''}
            onChange={(e) => updatePoint(pointsKey, index, 'text', e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
            placeholder="Enter point"
          />
        </div>

        <div className="grid grid-cols-2 gap-1 mb-1">
          <select
            value={pointData.style?.font || 'Arial'}
            onChange={(e) => updatePoint(pointsKey, index, 'font', e.target.value)}
            className="px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
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
            onChange={(e) => updatePoint(pointsKey, index, 'fontSize', parseInt(e.target.value))}
            className="px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
            placeholder="Size"
          />
        </div>

        <div className="flex items-center gap-1 mb-1">
          <input
            type="color"
            value={pointData.style?.color || '#000000'}
            onChange={(e) => updatePoint(pointsKey, index, 'color', e.target.value)}
            className="w-6 h-5 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={pointData.style?.color || '#000000'}
            onChange={(e) => updatePoint(pointsKey, index, 'color', e.target.value)}
            className="flex-1 px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
            placeholder="#000000"
          />
        </div>

        <div className="flex gap-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={pointData.style?.bold || false}
              onChange={(e) => updatePoint(pointsKey, index, 'bold', e.target.checked)}
              className="mr-1 accent-pink-500"
            />
            <span className="text-xs text-gray-700">B</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={pointData.style?.italic || false}
              onChange={(e) => updatePoint(pointsKey, index, 'italic', e.target.checked)}
              className="mr-1 accent-pink-500"
            />
            <span className="text-xs text-gray-700">I</span>
          </label>
        </div>
      </div>
    );
  };

  const renderTopicSection = (topicKey, pointsKey, label) => {
    return (
      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-gray-800">{label} Section</h3>
        
        {renderTopicEditor(topicKey, `${label} Title`)}
        
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">{label} Points</span>
            <button
              onClick={() => addPoint(pointsKey)}
              className="px-2 py-1 bg-pink-600 text-white rounded-md hover:bg-pink-700 text-xs"
            >
              Add Point
            </button>
          </div>
          
          {tempData?.[pointsKey]?.map((point, index) => 
            renderPointEditor(pointsKey, point, index, label)
          )}
          
          {(!tempData?.[pointsKey] || tempData[pointsKey].length === 0) && (
            <p className="text-gray-500 text-xs">No points added yet.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-sm bg-gray-50 p-4 rounded-lg border border-gray-200 h-[450px] w-80 h-[450px] overflow-y-auto">
      
      {renderHeadingEditor()}
      {renderTopicSection('topic1', 'points1', 'Topic 1')}
      {renderTopicSection('topic2', 'points2', 'Topic 2')}
    </div>
  );
}

export default T3Form;