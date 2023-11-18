import create from 'zustand';
import { axiosInstance } from '../components/common/axiosInstance';

const useUserStore = create((set) => ({
  id: '',
  userId: '',
  nickname: '',
  profileImg: '',
  setProfileImage: (newImage) => set(() => ({ profileImg: newImage })),
  setUserInfo: async () => {
    try {
      const response = await axiosInstance.get('/user/myInfo');
      if (response.data) {
        const { id, userId, nickname, photo } = response.data;
        set({
          id: 3,
          userId: userId,
          nickname: nickname,
          profileImg: photo,
        });
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  },
  logout: async () => {
    try {
      const response = await axiosInstance.get('/user/logout');
      if (response.status === 200) {
        set({
          id: '',
          userId: '',
          nickname: '',
          profileImg: '',
        });
      }
    } catch (error) {
      console.error('Failed to logout:', error);
      // 필요하다면 여기서 에러 핸들링을 할 수 있습니다.
    }
  },
}));

export default useUserStore;
