import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function T7({ tempData }) {
  const mermaidRef = useRef(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();
    }
  }, []);

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
        labels: {
          boxWidth: 12,
          padding: 10,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: tempData.chartType?.graph?.title || '',
        font: {
          size: 14
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: tempData.chartType?.graph?.x_axis_label || '',
          font: {
            size: 11
          }
        },
        ticks: {
          font: {
            size: 10
          },
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        title: {
          display: true,
          text: tempData.chartType?.graph?.y_axis_label || '',
          font: {
            size: 11
          }
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 5
      }
    }
  };

  return (
    <div className="p-4 w-full max-w-3xl aspect-video bg-[#f5f5f5] shadow-sm rounded-md border border-gray-300 flex flex-col items-center overflow-hidden">
      {/* Heading */}
      <h1
        className="text-center mb-4 flex-shrink-0"
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

      {/* Graph */}
      {tempData.chartType?.graph?.values && (
        <div className="bg-white p-3 rounded-md border w-full flex-1 flex flex-col min-h-0">
          <h2 className="text-base font-semibold mb-2 text-gray-700 flex-shrink-0">Graph:</h2>
          <div className="bg-gray-100 p-2 rounded w-full flex-1 flex flex-col min-h-0">
            <div className="w-full flex-1 relative min-h-0">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
          <p className="text-xs mt-2 text-gray-500 flex-shrink-0">{tempData.chartType.graph.description}</p>
        </div>
      )}
    </div>
  );
}

export default T7;