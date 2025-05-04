import React from 'react';

function T4MiniView({ tempData }) {
  return ( 
    <div className="border border-gray-300 w-full max-w-[220px] aspect-[4/3] bg-[#f5f5f5] shadow-sm rounded-md p-3 flex flex-col overflow-hidden">
      
      {/* Heading */}
      <h1
        className="text-center mb-2"
        style={{
          fontFamily: tempData.heading.style.font,
          fontSize: `${tempData.heading.style.fontSize * 0.3}px`, // smaller
          color: tempData.heading.style.color,
          fontWeight: tempData.heading.style.bold ? 'bold' : 'normal',
          fontStyle: tempData.heading.style.italic ? 'italic' : 'normal',
        }}
      >
        {tempData.heading.text}
      </h1>

      {/* Topic */}
      <h2
        className="text-center mb-2"
        style={{
          fontFamily: tempData.topic.style.font,
          fontSize: `${tempData.topic.style.fontSize * 0.3}px`,
          color: tempData.topic.style.color,
          fontWeight: tempData.topic.style.bold ? 'bold' : 'normal',
          fontStyle: tempData.topic.style.italic ? 'italic' : 'normal',
        }}
      >
        {tempData.topic.text}
      </h2>

      {/* Points */}
      <ul className="list-disc list-inside space-y-1">
        {tempData.points.map((point, index) => (
          <li
            key={index}
            style={{
              fontFamily: point.style.font,
              fontSize: `${point.style.fontSize * 0.3}px`,
              color: point.style.color,
              fontWeight: point.style.bold ? 'bold' : 'normal',
              fontStyle: point.style.italic ? 'italic' : 'normal',
            }}
          >
            {point.text}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default T4MiniView;
