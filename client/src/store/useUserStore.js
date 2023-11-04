import create from 'zustand'
import { axiosInstance } from '../components/common/axiosInstance'

const useUserStore = create((set) => ({
  id : '',
  userId : '',
  nickname : '',
  profileImg : '',
  setUserInfo : async () => {
    const response = await axiosInstance.get('/user/myInfo')
    console.log(response)
    const {id, userId, nickname, photo} = response.data
    set(({
      id : id,
      userId : userId,
      nickname : nickname,
      profileImg : photo
    }))
  } 
}))

export default useUserStore