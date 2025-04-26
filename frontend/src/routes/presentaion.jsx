import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get_presentation_detail } from '../api/endpoints';

function Presentation() {
  const nav = useNavigate();
  const [pdata, setPdata] = useState([]);
  const { pid } = useParams();

  const handleGetPresentationDetails = async () => {
    try {
      const response = await get_presentation_detail(pid);
      console.log(response);
      setPdata(response.pdata);
    } catch (error) {
      console.error('Error fetching presentation details:', error);
    }
  };

  useEffect(() => {
    handleGetPresentationDetails();
  }, [pid]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Presentation Slides</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {pdata.map((slide, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Slide {slide.slideNo}</h2>
            <p className="text-pink-500 font-semibold mb-2">Template: {slide.templateName}</p>

            {slide.heading && <h3 className="text-lg font-semibold mb-1">{slide.heading.text}</h3>}
            {slide.subheading && <h4 className="text-md text-gray-600 mb-2">{slide.subheading.text}</h4>}
            {slide.topic && <h4 className="text-md text-gray-600 mb-2">{slide.topic.text}</h4>}

            {slide.description && <p className="text-gray-700 mb-2">{slide.description.text}</p>}

            {slide.points && (
              <ul className="list-disc list-inside mb-2">
                {slide.points.map((point, idx) => (
                  <li key={idx} className="text-gray-700">{point.text}</li>
                ))}
              </ul>
            )}

            {/* Handle topic1 and points1 */}
            {slide.topic1 && <h4 className="text-md font-semibold text-blue-600 mb-1">{slide.topic1.text}</h4>}
            {slide.points1 && (
              <ul className="list-disc list-inside mb-2">
                {slide.points1.map((point, idx) => (
                  <li key={idx} className="text-gray-700">{point.text}</li>
                ))}
              </ul>
            )}

            {/* Handle topic2 and points2 */}
            {slide.topic2 && <h4 className="text-md font-semibold text-blue-600 mb-1">{slide.topic2.text}</h4>}
            {slide.points2 && (
              <ul className="list-disc list-inside mb-2">
                {slide.points2.map((point, idx) => (
                  <li key={idx} className="text-gray-700">{point.text}</li>
                ))}
              </ul>
            )}

            {/* Handle chartType content */}
            {slide.chartType?.flowchart && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold mb-2">Flowchart Description:</h4>
                <p>{slide.chartType.flowchart.description}</p>
              </div>
            )}

            {slide.chartType?.graph && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold mb-2">Graph Title:</h4>
                <p>{slide.chartType.graph.title}</p>
              </div>
            )}

            {slide.chartType?.latex && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold mb-2">Latex Equation:</h4>
                <p>{slide.chartType.latex.equation}</p>
              </div>
            )}

            {/* Image and title */}
            {slide.image && (
              <div className="mt-4">
                <img src={slide.image} alt="Slide Image" className="rounded-lg w-full object-cover" />
                {slide.imageTitle && (
                  <p className="text-center text-gray-700 font-semibold mt-2">{slide.imageTitle.text}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Presentation;
