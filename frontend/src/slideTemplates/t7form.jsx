import React from 'react';

function T7Form({ tempData, onDataChange }) {
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

  const updateChart = (field, value) => {
    const newData = { ...tempData };
    
    if (!newData.chartType) {
      newData.chartType = {
        graph: {
          title: '',
          x_axis_label: '',
          y_axis_label: '',
          labels: [],
          values: [],
          description: ''
        }
      };
    }
    
    if (!newData.chartType.graph) {
      newData.chartType.graph = {
        title: '',
        x_axis_label: '',
        y_axis_label: '',
        labels: [],
        values: [],
        description: ''
      };
    }
    
    if (field === 'labels') {
      // Parse comma-separated labels - keep all non-empty strings
      newData.chartType.graph[field] = value.split(',').map(item => item.trim()).filter(item => item !== '');
    } else if (field === 'values') {
      // Parse comma-separated values - convert to numbers, keep valid numbers including 0
      newData.chartType.graph[field] = value.split(',').map(item => {
        const num = parseFloat(item.trim());
        return isNaN(num) ? 0 : num;
      }).slice(0, value.split(',').length); // Keep the same length as input
    } else {
      newData.chartType.graph[field] = value;
    }
    
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter chart heading"
          />
        </div>

        {/* Font Family */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
          <select
            value={heading.style?.font || 'Arial'}
            onChange={(e) => updateHeading('font', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full accent-blue-500"
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
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="mr-2 accent-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Bold</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={heading.style?.italic || false}
              onChange={(e) => updateHeading('italic', e.target.checked)}
              className="mr-2 accent-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Italic</span>
          </label>
        </div>
      </div>
    );
  };

  const renderGraphEditor = () => {
    const graph = tempData?.chartType?.graph || {
      title: '',
      x_axis_label: '',
      y_axis_label: '',
      labels: [],
      values: [],
      description: ''
    };

    return (
      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Line Graph</h3>
        
        {/* Graph Title */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Graph Title</label>
          <input
            type="text"
            value={graph.title || ''}
            onChange={(e) => updateChart('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter graph title"
          />
        </div>

        {/* X-Axis Label */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">X-Axis Label</label>
          <input
            type="text"
            value={graph.x_axis_label || ''}
            onChange={(e) => updateChart('x_axis_label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Time, Date, Category"
          />
        </div>

        {/* Y-Axis Label */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis Label</label>
          <input
            type="text"
            value={graph.y_axis_label || ''}
            onChange={(e) => updateChart('y_axis_label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Value, Amount, Count"
          />
        </div>

        {/* Labels */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Labels (comma-separated)
          </label>
          <input
            type="text"
            value={graph.labels?.join(', ') || ''}
            onChange={(e) => updateChart('labels', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Jan, Feb, Mar, Apr, May"
          />
          <p className="text-xs text-gray-500 mt-1">Enter X-axis labels separated by commas</p>
        </div>

        {/* Values */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Values (comma-separated)
          </label>
          <input
            type="text"
            value={graph.values?.join(', ') || ''}
            onChange={(e) => updateChart('values', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="10, 25, 30, 45, 60"
          />
          <p className="text-xs text-gray-500 mt-1">Enter Y-axis values separated by commas</p>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={graph.description || ''}
            onChange={(e) => updateChart('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Brief description of the graph"
            rows={2}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-sm bg-gray-50 p-4 rounded-lg border border-gray-200 w-80 h-[450px] overflow-y-auto">
      {renderHeadingEditor()}
      {renderGraphEditor()}
    </div>
  );
}

export default T7Form;