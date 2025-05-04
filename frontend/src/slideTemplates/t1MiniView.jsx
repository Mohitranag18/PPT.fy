import React from 'react';

function T1MiniView({ tempData }) {
  const { heading, subheading, description } = tempData || {};

  return (
    <div className="border border-gray-300 w-full max-w-[220px] aspect-[4/3] bg-[#f5f5f5] shadow-sm rounded-md p-3 flex flex-col overflow-hidden">

      {heading && (
        <h1
          style={{
            fontFamily: heading.style.font,
            fontSize: heading.style.fontSize * 0.3, // 30% of original
            color: heading.style.color,
            fontWeight: heading.style.bold ? 'bold' : 'normal',
            fontStyle: heading.style.italic ? 'italic' : 'normal',
            marginBottom: '6px',
          }}
        >
          {heading.text}
        </h1>
      )}
      {subheading && (
        <h2
          style={{
            fontFamily: subheading.style.font,
            fontSize: subheading.style.fontSize * 0.3,
            color: subheading.style.color,
            fontWeight: subheading.style.bold ? 'bold' : 'normal',
            fontStyle: subheading.style.italic ? 'italic' : 'normal',
            marginBottom: '6px',
          }}
        >
          {subheading.text}
        </h2>
      )}
      {description && (
        <p
          style={{
            fontFamily: description.style.font,
            fontSize: description.style.fontSize * 0.3,
            color: description.style.color,
            fontWeight: description.style.bold ? 'bold' : 'normal',
            fontStyle: description.style.italic ? 'italic' : 'normal',
            maxWidth: '160px',
            margin: '0 auto',
            lineHeight: '1.1',
          }}
        >
          {description.text}
        </p>
      )}
    </div>
  );
}

export default T1MiniView;
