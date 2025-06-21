import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function T7MiniView({ tempData }) {
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
      x: { 
        ticks: { 
          font: { size: 7 },
          maxRotation: 45,
          minRotation: 0,
          maxTicksLimit: 5
        },
        grid: {
          display: false
        }
      },
      y: { 
        ticks: { 
          font: { size: 7 },
          maxTicksLimit: 4
        },
        grid: {
          display: false
        }
      },
    },
    elements: {
      point: {
        radius: 1,
        hoverRadius: 2
      },
      line: {
        borderWidth: 1
      }
    },
    layout: {
      padding: {
        top: 2,
        bottom: 2,
        left: 2,
        right: 2
      }
    }
  };

  return (
    <div className="border border-gray-300 w-full max-w-[220px] aspect-[4/3] bg-[#f5f5f5] shadow-sm rounded-md p-3 flex flex-col overflow-hidden">
      {/* Heading */}
      <h1
        className="text-center mb-2 flex-shrink-0"
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

      {/* Graph */}
      {tempData.chartType?.graph?.values && (
        <div className="bg-white p-1 rounded-md border w-full flex-1 flex flex-col min-h-0">
          <div className="w-full flex-1 relative min-h-0">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
}

export default T7MiniView;