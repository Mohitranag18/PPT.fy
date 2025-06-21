import React, { useEffect, useRef, useState } from 'react';

function T6({ tempData }) {
  const mermaidRef = useRef(null);
  const containerRef = useRef(null);
  const [mermaidId, setMermaidId] = useState(0);
  
  const flowchartCode = tempData?.chartType?.flowchart?.code || '';
  const flowchartDescription = tempData?.chartType?.flowchart?.description || '';

  const scaleFlowchartToFit = () => {
    if (!mermaidRef.current || !containerRef.current) return;
    
    const svg = mermaidRef.current.querySelector('svg');
    if (!svg) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = container.clientWidth - 32; // Account for padding
    const containerHeight = container.clientHeight - 16; // Account for padding
    
    // Get the original SVG dimensions
    const svgRect = svg.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;
    
    // Calculate scale factors
    const scaleX = containerWidth / svgWidth;
    const scaleY = containerHeight / svgHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down
    
    // Apply scaling
    if (scale < 1) {
      svg.style.transform = `scale(${scale})`;
      svg.style.transformOrigin = 'center center';
      svg.style.width = `${svgWidth}px`;
      svg.style.height = `${svgHeight}px`;
    } else {
      // Reset transform if no scaling needed
      svg.style.transform = '';
      svg.style.transformOrigin = '';
      svg.style.maxWidth = '100%';
      svg.style.maxHeight = '100%';
    }
  };

  useEffect(() => {
    if (flowchartCode && mermaidRef.current) {
      // Clear previous content
      mermaidRef.current.innerHTML = '';
      
      // Create a unique ID for this mermaid diagram
      const uniqueId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
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
            
            // Scale the flowchart to fit after a short delay to ensure DOM is updated
            setTimeout(() => {
              scaleFlowchartToFit();
            }, 100);
          }
        }).catch((error) => {
          console.error('Mermaid rendering error:', error);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = `
              <div class="text-red-500 text-sm p-2 border border-red-300 rounded bg-red-50">
                <strong>Mermaid Error:</strong> Invalid syntax. Please check your flowchart code.
                <pre class="mt-1 text-xs">${error.message || 'Syntax error'}</pre>
              </div>
            `;
          }
        });
      }).catch((error) => {
        console.error('Failed to load Mermaid:', error);
      });
    }
  }, [flowchartCode]);

  // Add resize observer to handle container size changes
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      scaleFlowchartToFit();
    });
    
    resizeObserver.observe(containerRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [flowchartCode]);

  return (
    <div className="p-4 w-full max-w-3xl aspect-video bg-[#f5f5f5] shadow-sm rounded-md border border-gray-300 flex flex-col items-center justify-start">
      {/* Heading */}
      {tempData?.heading?.text && (
        <h1
          className="text-center mb-4 flex-shrink-0"
          style={{
            fontFamily: tempData.heading.style?.font || 'Arial',
            fontSize: `${(tempData.heading.style?.fontSize || 24) * 0.6}px`,
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
        <div className="bg-white p-3 mb-4 rounded-md border w-full flex-1 min-h-0 flex flex-col">
          <h2 className="text-base font-semibold mb-2 text-gray-700 flex-shrink-0">Flowchart:</h2>
          <div 
            className="bg-gray-100 p-4 rounded flex-1 min-h-0 flex items-center justify-center overflow-hidden" 
            ref={containerRef}
          >
            <div 
              className="flex items-center justify-center w-full h-full"
              ref={mermaidRef}
            >
              <div className="text-gray-500 text-sm">Loading flowchart...</div>
            </div>
          </div>
          {flowchartDescription && (
            <p className="text-xs mt-2 text-gray-500 flex-shrink-0">{flowchartDescription}</p>
          )}
        </div>
      )}
      
      {/* Show message if no flowchart code */}
      {!flowchartCode && (
        <div className="bg-white p-6 rounded-md border w-full flex-1 flex items-center justify-center text-center text-gray-500">
          <p>No flowchart to display. Add Mermaid code in the form to see your flowchart here.</p>
        </div>
      )}
    </div>
  );
}

export default T6;