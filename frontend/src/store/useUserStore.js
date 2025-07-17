import { create } from 'zustand';

const useUserStore = create((set) => ({
  userInfo: null,
  userInfoLoading: false,
  userInfoError: null,

  setUserInfo: (userInfo) => set({ userInfo }),
  setUserInfoLoading: (userInfoLoading) => set({ userInfoLoading }),
  setUserInfoError: (userInfoError) => set({ userInfoError }),
}));

export default useUserStore; 