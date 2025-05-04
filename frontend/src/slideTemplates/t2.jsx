import React from 'react';

function T2({ tempData }) {
  const { heading, points, image } = tempData || {};

  return (
    <div className="border border-gray-300 w-full max-w-3xl aspect-video bg-[#f5f5f5] shadow-sm rounded-md p-4 flex flex-col overflow-auto">
      {heading && (
        <h1
          className="text-center mb-4"
          style={{
            fontFamily: heading.style.font,
            fontSize: heading.style.fontSize * 0.6,
            color: heading.style.color,
            fontWeight: heading.style.bold ? 'bold' : 'normal',
            fontStyle: heading.style.italic ? 'italic' : 'normal',
          }}
        >
          {heading.text}
        </h1>
      )}

      {points?.length > 0 && (
        <ul className="list-disc list-inside mb-4 space-y-2">
          {points.map((point, idx) => (
            <li
              key={idx}
              style={{
                fontFamily: point.style.font,
                fontSize: point.style.fontSize * 0.6,
                color: point.style.color,
                fontWeight: point.style.bold ? 'bold' : 'normal',
                fontStyle: point.style.italic ? 'italic' : 'normal',
              }}
            >
              {point.text}
            </li>
          ))}
        </ul>
      )}

      {image && (
        <div className="mt-auto flex justify-center">
          <img src={image} alt="Slide" className="max-h-32 object-contain" />
        </div>
      )}
    </div>
  );
}

export default T2;
