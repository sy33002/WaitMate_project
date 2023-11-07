import create from 'zustand';
import { axiosInstance } from '../components/common/axiosInstance';

const useUserStore = create((set) => ({
  id: '',
  userId: '',
  nickname: '',
  profileImg: '',
  setProfileImage: (newImage) => set(() => ({ profileImg: newImage })),
  setUserInfo: async () => {
    if (useUserStore.getState().id === '') {
      const response = await axiosInstance.get('/user/myInfo');
      const { id, userId, nickname, photo } = response.data;
      set({
        id: id,
        userId: userId,
        nickname: nickname,
        profileImg: photo,
      });
    }
  },
  logout: async () => {
    const response = await axiosInstance.get('/user/logout');
    if (response.status === 200) {
      set({
        id: '',
        userId: '',
        nickname: '',
        profileImg: '',
      });
    }
  },
}));

export default useUserStore;
