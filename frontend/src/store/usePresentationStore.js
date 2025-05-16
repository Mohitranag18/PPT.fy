import { create } from 'zustand';

const usePresentationStore = create((set) => ({
  pdata: [],
  selectedSlide: null,
  selectedSlideData: null,

  setPresentationData: (pdata) => set({ pdata }),
  setSelectedSlide: (selectedSlide) => set({ selectedSlide }),
  setSelectedSlideData: (selectedSlideData) => set({ selectedSlideData }),
}));

export default usePresentationStore;
