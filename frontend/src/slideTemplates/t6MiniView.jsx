import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function T6MiniView({ tempData }) {
  const mermaidRef = useRef(null);
  
  const flowchartCode = tempData?.chartType?.flowchart?.code || '';
  
  useEffect(() => {
    if (flowchartCode && mermaidRef.current) {
      // Clear previous content
      mermaidRef.current.innerHTML = '';
      
      // Create a unique ID for this mermaid diagram
      const uniqueId = `mermaid-mini-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Create div with unique ID
      const mermaidDiv = document.createElement('div');
      mermaidDiv.className = 'mermaid';
      mermaidDiv.id = uniqueId;
      mermaidDiv.textContent = flowchartCode;
      mermaidRef.current.appendChild(mermaidDiv);
      
      // Import and render mermaid dynamically
      import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs').then((mermaid) => {
        mermaid.default.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose'
        });
        
        // Render the specific diagram
        mermaid.default.render(uniqueId + '-svg', flowchartCode).then((result) => {
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = result.svg;
            
            // Scale down the SVG for mini view
            const svg = mermaidRef.current.querySelector('svg');
            if (svg) {
              svg.style.maxWidth = '100%';
              svg.style.maxHeight = '100%';
              svg.style.width = 'auto';
              svg.style.height = 'auto';
            }
          }
        }).catch((error) => {
          console.error('Mermaid rendering error:', error);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = `
              <div class="text-red-400 text-xs p-1 border border-red-200 rounded bg-red-50">
                <strong>Error:</strong> Invalid syntax
              </div>
            `;
          }
        });
      }).catch((error) => {
        console.error('Failed to load Mermaid:', error);
      });
    } else if (!flowchartCode && mermaidRef.current) {
      // Clear the content if no flowchart code
      mermaidRef.current.innerHTML = '<div class="text-gray-400 text-xs">No flowchart</div>';
    }
  }, [flowchartCode]);

  const chartData = {
    labels: tempData?.chartType?.graph?.labels || [],
    datasets: [
      {
        label: tempData?.chartType?.graph?.title || '',
        data: tempData?.chartType?.graph?.values || [],
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { ticks: { font: { size: 8 } } },
      y: { ticks: { font: { size: 8 } } },
    },
  };

  return (
    <div className="border border-gray-300 w-full max-w-[220px] aspect-[4/3] bg-[#f5f5f5] shadow-sm rounded-md p-3 flex flex-col overflow-hidden">
      {/* Heading */}
      {tempData?.heading?.text && (
        <h1
          className="text-center mb-2 truncate"
          style={{
            fontFamily: tempData.heading.style?.font || 'Arial',
            fontSize: `${(tempData.heading.style?.fontSize || 24) * 0.3}px`,
            color: tempData.heading.style?.color || '#000000',
            fontWeight: tempData.heading.style?.bold ? 'bold' : 'normal',
            fontStyle: tempData.heading.style?.italic ? 'italic' : 'normal',
          }}
        >
          {tempData.heading.text}
        </h1>
      )}
      
      {/* Flowchart */}
      {flowchartCode && (
        <div className="bg-white p-2 mb-2 rounded-md border w-full flex-1 min-h-0 overflow-hidden">
          <div className="bg-gray-100 p-1 rounded w-full h-full flex items-center justify-center">
            <div 
              className="w-full h-full flex items-center justify-center" 
              ref={mermaidRef}
              style={{ fontSize: '8px' }}
            >
              <div className="text-gray-400 text-xs">Loading...</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Show message if no flowchart code */}
      {!flowchartCode && (
        <div className="bg-white p-2 rounded-md border w-full flex-1 flex items-center justify-center text-center text-gray-400 text-xs">
          No flowchart
        </div>
      )}
    </div>
  );
}

export default T6MiniView;