import React from 'react';

function T1({ tempData }) {
  const { heading, subheading, description } = tempData || {};
  console.log(`selected data:`, tempData)

  return (
    <div
      className="border border-gray-300 w-full max-w-3xl aspect-video bg-[#f5f5f5] shadow-sm rounded-md"
      style={{ padding: '16px', textAlign: 'center' }}
    >
      {heading && (
        <h1
          style={{
            fontFamily: heading.style.font,
            fontSize: heading.style.fontSize * 0.6, // 40% smaller
            color: heading.style.color,
            fontWeight: heading.style.bold ? 'bold' : 'normal',
            fontStyle: heading.style.italic ? 'italic' : 'normal',
            marginBottom: '12px',
          }}
        >
          {heading.text}
        </h1>
      )}
      {subheading && (
        <h2
          style={{
            fontFamily: subheading.style.font,
            fontSize: subheading.style.fontSize * 0.6,
            color: subheading.style.color,
            fontWeight: subheading.style.bold ? 'bold' : 'normal',
            fontStyle: subheading.style.italic ? 'italic' : 'normal',
            marginBottom: '16px',
          }}
        >
          {subheading.text}
        </h2>
      )}
      {description && (
        <p
          style={{
            fontFamily: description.style.font,
            fontSize: description.style.fontSize * 0.6,
            color: description.style.color,
            fontWeight: description.style.bold ? 'bold' : 'normal',
            fontStyle: description.style.italic ? 'italic' : 'normal',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.3',
          }}
        >
          {description.text}
        </p>
      )}
    </div>
  );
}

export default T1;
