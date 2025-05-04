import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function T6MiniView({ tempData }) {
  const mermaidRef = useRef(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();
    }
  }, []);

  const flowchartCode = tempData.chartType?.flowchart?.code;

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
      <h1
        className="text-center mb-2"
        style={{
          fontFamily: tempData.heading.style.font,
          fontSize: `${tempData.heading.style.fontSize * 0.3}px`,
          color: tempData.heading.style.color,
          fontWeight: tempData.heading.style.bold ? 'bold' : 'normal',
          fontStyle: tempData.heading.style.italic ? 'italic' : 'normal',
        }}
      >
        {tempData.heading.text}
      </h1>

      {/* Flowchart */}
      {flowchartCode && (
        <div className="bg-white p-2 mb-2 rounded-md border w-full max-h-24 overflow-auto">
          <div className="bg-gray-100 p-1 rounded w-full">
            <div className="mermaid text-xs w-full" ref={mermaidRef}>
              {flowchartCode}
            </div>
          </div>
        </div>
      )}

      {/* Graph */}
      {tempData.chartType?.graph?.values && (
        <div className="bg-white p-2 rounded-md border w-full">
          <div className="w-full h-20">
            <Line data={chartData} options={chartOptions} style={{ width: '100%' }} />
          </div>
        </div>
      )}

    </div>
  );
}

export default T6MiniView;
