import React from 'react';

function T5MiniView({ tempData }) {
  return ( 
    <div className="border border-gray-300 w-full max-w-[220px] aspect-[4/3] bg-[#f5f5f5] shadow-sm rounded-md p-3 flex flex-col overflow-hidden">
      
      {/* Heading */}
      <h1
        className="text-center mb-3"
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

      {/* Image */}
      <div className="flex flex-col items-center">
        <img
          src={tempData.image}
          alt="Presentation Visual"
          className="max-h-20 object-contain mb-2"
        />
        
        {/* Image Title */}
        <p
          className="text-center"
          style={{
            fontFamily: tempData.imageTitle.style.font,
            fontSize: `${tempData.imageTitle.style.fontSize * 0.3}px`,
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

export default T5MiniView;
