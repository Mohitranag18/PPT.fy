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
import T7 from '../slideTemplates/t7';
import T1MiniView from '../slideTemplates/t1MiniView';
import T2MiniView from '../slideTemplates/t2MiniView';
import T3MiniView from '../slideTemplates/t3MiniView';
import T4MiniView from '../slideTemplates/t4MiniView';
import T5MiniView from '../slideTemplates/t5MiniView';
import T6MiniView from '../slideTemplates/t6MiniView';
import T7MiniView from '../slideTemplates/t7MiniView';
import T1Form from '../slideTemplates/t1form';
import T2Form from '../slideTemplates/t2form';
import T3Form from '../slideTemplates/t3form';
import T4Form from '../slideTemplates/t4form';
import T5Form from '../slideTemplates/t5form';
import T6Form from '../slideTemplates/t6form';
import T7Form from '../slideTemplates/t7form';


function Presentation() {
  const { pid } = useParams();
  const nav = useNavigate();
  const [showForm, setShowForm] = useState(false);

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
      case 'T7': return <T7MiniView tempData={slide} />
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
      case 'T7': return <T7 tempData={selectedSlideData} />;
      default: return null;
    }
  };

  const handleFormDataChange = (updatedData) => {
  // Update the selected slide data in the store
  setSelectedSlideData(updatedData);
  
  // Also update the data in the pdata array to keep everything in sync
  const updatedPdata = pdata.map(slide => 
    slide === selectedSlideData ? updatedData : slide
  );
  setPresentationData(updatedPdata);
  
  // Optional: Here you can also add API call to save changes to backend
  // savePresentationData(pid, updatedPdata);
};

  return (
    <div className='w-full'>
      <div className='flex gap-6 justify-start w-full p-4'>
        {/* Mini Views */}
        <div className="flex flex-col gap-5 w-80 h-[450px] overflow-y-auto">
          {pdata.map((slide, index) => (
            <div key={index} onClick={() => handleSlideClick(slide)} className="cursor-pointer">
              {renderMiniView(slide)}
            </div>
          ))}
        </div>

        {/* Full View */}
        <div className="flex flex-col w-full items-center">
          {selectedSlide && selectedSlideData && renderFullView()}
          
          
        </div>
        
        {/* Form Panel - Show for T1, T2, or T3 when showForm is true */}
        {showForm && selectedSlide === 'T1' && (
          <T1Form 
            tempData={selectedSlideData} 
            onDataChange={handleFormDataChange}
          />
        )}
        {showForm && selectedSlide === 'T2' && (
          <T2Form 
            tempData={selectedSlideData} 
            onDataChange={handleFormDataChange}
          />
        )}
        {showForm && selectedSlide === 'T3' && (
          <T3Form 
            tempData={selectedSlideData} 
            onDataChange={handleFormDataChange}
          />
        )}
        {showForm && selectedSlide === 'T4' && (
          <T4Form 
            tempData={selectedSlideData} 
            onDataChange={handleFormDataChange}
          />
        )}
        {showForm && selectedSlide === 'T5' && (
          <T5Form 
            tempData={selectedSlideData} 
            onDataChange={handleFormDataChange}
          />
        )}
        {showForm && selectedSlide === 'T6' && (
          <T6Form 
            tempData={selectedSlideData} 
            onDataChange={handleFormDataChange}
          />
        )}
        {showForm && selectedSlide === 'T7' && (
          <T7Form 
            tempData={selectedSlideData} 
            onDataChange={handleFormDataChange}
          />
        )}
      </div>

      <div className='w-full flex justify-center items-center gap-8 border border-gray-400 py-4 bg-gray-100'>
          {/* Edit Button */}
          {(selectedSlide === 'T1' || selectedSlide === 'T2' || selectedSlide === 'T3' || selectedSlide === 'T4' || selectedSlide === 'T5' || selectedSlide === 'T6' || selectedSlide === 'T7') && (
            <button 
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 self-center"
            >
              {showForm ? 'Hide Editor' : 'Edit Slide'}
            </button>
          )}

          <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 self-center"
            >
              Save Changes
            </button>
      </div>
    </div>
  );
}

export default Presentation;
