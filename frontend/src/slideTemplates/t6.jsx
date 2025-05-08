import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function T6({ tempData }) {
  const mermaidRef = useRef(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();
    }
  }, []);

  const flowchartCode = tempData.chartType?.flowchart?.code;
  const latexEquation = tempData.chartType?.latex?.equation;

  const chartData = {
    labels: tempData.chartType?.graph?.labels || [],
    datasets: [
      {
        label: tempData.chartType?.graph?.title || '',
        data: tempData.chartType?.graph?.values || [],
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
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: tempData.chartType?.graph?.title || '',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: tempData.chartType?.graph?.x_axis_label || '',
        },
      },
      y: {
        title: {
          display: true,
          text: tempData.chartType?.graph?.y_axis_label || '',
        },
      },
    },
  };

  return (
    <div className="p-4 w-full max-w-3xl aspect-video bg-[#f5f5f5] shadow-sm rounded-md border border-gray-300 flex flex-col items-center overflow-auto justify-start">
      
      {/* Heading */}
      <h1
        className="text-center mb-4"
        style={{
          fontFamily: tempData.heading.style.font,
          fontSize: `${tempData.heading.style.fontSize * 0.6}px`,
          color: tempData.heading.style.color,
          fontWeight: tempData.heading.style.bold ? 'bold' : 'normal',
          fontStyle: tempData.heading.style.italic ? 'italic' : 'normal',
        }}
      >
        {tempData.heading.text}
      </h1>

      {/* Flowchart */}
      {flowchartCode && (
        <div className="bg-white p-3 mb-4 rounded-md border w-full max-h-96 overflow-auto">
          <h2 className="text-base font-semibold mb-2 text-gray-700">Flowchart:</h2>
          <div className="bg-gray-100 p-2 rounded" ref={mermaidRef}>
            <div className="mermaid">
              {flowchartCode}
            </div>
          </div>
          <p className="text-xs mt-2 text-gray-500">{tempData.chartType.flowchart.description}</p>
        </div>
      )}
    </div>
  );
}

export default T6;
