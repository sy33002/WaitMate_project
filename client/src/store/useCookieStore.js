import create from 'zustand'
import useUserStore from './useUserStore'

const useCookieStore = create((set) => ({
  access : '',
  getCookie: () => {
    const cookies = document.cookie.split('; ');
    let ret = '';
    cookies.forEach((el) => {
      const [keyName, cookieVal] = el.split('=')
      if (keyName === 'access') {
        ret = decodeURIComponent(cookieVal);
      }
    })
    return ret;
  },
  setCookie: () => {
    const cookieVal = useCookieStore.getState().getCookie();
    const access =  useCookieStore.getState().access;
    if (access !== cookieVal) {
      set(() => ({
        access : cookieVal,
      })) 
      useUserStore.getState().setUserInfo()
    }
  }
}))

export default useCookieStore