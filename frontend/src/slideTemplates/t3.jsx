import React from 'react';

function T3({ tempData }) {
  const { heading, topic1, points1, topic2, points2 } = tempData || {};

  const renderPoints = (points) => (
    <ul className="list-disc list-inside mb-4">
      {points.map((point, idx) => (
        <li
          key={idx}
          style={{
            fontFamily: point.style.font,
            fontSize: point.style.fontSize * 0.6,
            color: point.style.color,
            fontWeight: point.style.bold ? 'bold' : 'normal',
            fontStyle: point.style.italic ? 'italic' : 'normal',
            marginBottom: '6px',
          }}
        >
          {point.text}
        </li>
      ))}
    </ul>
  );

  const renderTopic = (topic) => (
    <h2
      style={{
        fontFamily: topic.style.font,
        fontSize: topic.style.fontSize * 0.6,
        color: topic.style.color,
        fontWeight: topic.style.bold ? 'bold' : 'normal',
        fontStyle: topic.style.italic ? 'italic' : 'normal',
        marginTop: '16px',
        marginBottom: '8px',
      }}
    >
      {topic.text}
    </h2>
  );

  return (
    <div className="border border-gray-300 w-full max-w-3xl aspect-video bg-[#f5f5f5] shadow-sm rounded-md p-4 overflow-auto">
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

      {topic1 && renderTopic(topic1)}
      {points1 && renderPoints(points1)}

      {topic2 && renderTopic(topic2)}
      {points2 && renderPoints(points2)}
    </div>
  );
}

export default T3;
