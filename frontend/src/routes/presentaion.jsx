import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get_presentation_detail } from '../api/endpoints';
import usePresentationStore from '../store/usePresentationStore';
import T1 from '../slideTemplates/t1';
import T2 from '../slideTemplates/t2';
import T3 from '../slideTemplates/t3';
import T4 from '../slideTemplates/t4';
import T5 from '../slideTemplates/t5';
import T6 from '../slideTemplates/t6';
import T1MiniView from '../slideTemplates/t1MiniView';
import T2MiniView from '../slideTemplates/t2MiniView';
import T3MiniView from '../slideTemplates/t3MiniView';
import T4MiniView from '../slideTemplates/t4MiniView';
import T5MiniView from '../slideTemplates/t5MiniView';
import T6MiniView from '../slideTemplates/t6MiniView';

function Presentation() {
  const { pid } = useParams();
  const nav = useNavigate();

  // Zustand setters and state
  const {
    pdata,
    selectedSlide,
    selectedSlideData,
    setPresentationData,
    setSelectedSlide,
    setSelectedSlideData,
  } = usePresentationStore();

  const handleGetPresentationDetails = async () => {
    try {
      const response = await get_presentation_detail(pid);
      console.log(response);
      setPresentationData(response.pdata);
      if (response.pdata.length > 0) {
        setSelectedSlide(response.pdata[0].templateName);
        setSelectedSlideData(response.pdata[0]);
      }
    } catch (error) {
      console.error('Error fetching presentation details:', error);
    }
  };

  useEffect(() => {
    handleGetPresentationDetails();
  }, [pid]);

  const handleSlideClick = (slide) => {
    setSelectedSlide(slide.templateName);
    setSelectedSlideData(slide);
  };

  const renderMiniView = (slide) => {
    switch (slide.templateName) {
      case 'T1': return <T1MiniView tempData={slide} />;
      case 'T2': return <T2MiniView tempData={slide} />;
      case 'T3': return <T3MiniView tempData={slide} />;
      case 'T4': return <T4MiniView tempData={slide} />;
      case 'T5': return <T5MiniView tempData={slide} />;
      case 'T6': return <T6MiniView tempData={slide} />;
      default: return null;
    }
  };

  const renderFullView = () => {
    switch (selectedSlide) {
      case 'T1': return <T1 tempData={selectedSlideData} />;
      case 'T2': return <T2 tempData={selectedSlideData} />;
      case 'T3': return <T3 tempData={selectedSlideData} />;
      case 'T4': return <T4 tempData={selectedSlideData} />;
      case 'T5': return <T5 tempData={selectedSlideData} />;
      case 'T6': return <T6 tempData={selectedSlideData} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Presentation Slides</h1>

      <div className='flex gap-6 justify-start w-full'>
        {/* Mini Views */}
        <div className="flex flex-col gap-6 w-80 h-[450px] overflow-y-auto">
          {pdata.map((slide, index) => (
            <div key={index} onClick={() => handleSlideClick(slide)} className="cursor-pointer">
              {renderMiniView(slide)}
            </div>
          ))}
        </div>

        {/* Full View */}
        <div className="flex flex-col w-full">
          {selectedSlide && selectedSlideData && renderFullView()}
        </div>
      </div>
    </div>
  );
}

export default Presentation;
