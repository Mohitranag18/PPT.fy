import React from 'react';

function T5({ tempData }) {
  return ( 
    <div className="p-4 w-full max-w-3xl aspect-video bg-[#f5f5f5] shadow-sm rounded-md border border-gray-300 flex flex-col items-center justify-center">
      
      {/* Heading */}
      <h1
        className="text-center mb-6"
        style={{
          fontFamily: tempData.heading.style.font,
          fontSize: `${tempData.heading.style.fontSize * 0.6}px`, // 40% smaller
          color: tempData.heading.style.color,
          fontWeight: tempData.heading.style.bold ? 'bold' : 'normal',
          fontStyle: tempData.heading.style.italic ? 'italic' : 'normal',
        }}
      >
        {tempData.heading.text}
      </h1>

      {/* Image */}
      <div className="flex flex-col items-center">
        <img
          src={tempData.image}
          alt="Presentation Visual"
          className="max-h-48 object-contain mb-4"
        />
        
        {/* Image Title */}
        <p
          className="text-center"
          style={{
            fontFamily: tempData.imageTitle.style.font,
            fontSize: `${tempData.imageTitle.style.fontSize * 0.6}px`, // 40% smaller
            color: tempData.imageTitle.style.color,
            fontWeight: tempData.imageTitle.style.bold ? 'bold' : 'normal',
            fontStyle: tempData.imageTitle.style.italic ? 'italic' : 'normal',
          }}
        >
          {tempData.imageTitle.text}
        </p>
      </div>

    </div>
  );
}

export default T5;
