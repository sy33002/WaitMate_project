import React, { useState, useEffect } from 'react';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../common/axiosInstance';
import axios from 'axios';

function Mypage() {
  const {
    userId,
    nickname,
    profileImg,
    setProfileImage,
    setUserInfo,
    logout,
  } = useUserStore();
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);
  const [toggleProxybutton, setToggleProxybutton] = useState(false);
  const [toggleWMbutton, setToggleWMbuton] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className='w-full h-screen text-primary_dark font-Line m-1 p-1'>
      <h1 className={`${isSmallScreen? 'text-[20px]' : 'text-[30px] mt-3 p-4'}`}>My page</h1>
    <div className='w-full h-screen text-primary_dark font-Line flex m-1 p-1'>
      <div className='flex w-1/3 items-center h-4/5'>
        <div className='flex flex-col items-center justify-center h-4/5 w-full'>
          <div className='h-1/4 w-4/5 bg-white rounded-lg'><img src={profileImg} alt="Profile" /></div>
        <label htmlFor="profile-upload">프로필 사진 Edit</label>
        <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
      <div className='w-full h-4/5'>
        <div className='flex w-full h-24'>
          <div className={`${isSmallScreen? 'text-[10px]' : 'text-[16px]'} w-1/2`}>
          <button onClick={() => { setToggleProxybutton(!toggleProxybutton)}}>My Proxy</button>
            <div className={`${isSmallScreen? 'text-[7px]' : 'text-[10px]'} flex`}>
              <button className={`${toggleProxybutton ? 'block' : 'hidden' }`}>나의 이력서</button>
              <button className={`${toggleProxybutton ? 'block' : 'hidden' }`}>나의 찜한 웨이트메이트 list</button>
              <button className={`${toggleProxybutton? 'block' : 'hidden' }`}>거래 완료 list</button>
            </div>
          </div>
          <div className='w-1/2'>
          <button onClick={() => {setToggleWMbuton(!toggleWMbutton)}}>My WaitMate</button>
            <div className='flex'>
              <button className={`${toggleWMbutton ? 'block' : 'hidden' }`}>나의 이력서</button>
              <button className={`${toggleWMbutton ? 'block' : 'hidden' }`}>나의 찜한 웨이트메이트 list</button>
              <button className={`${toggleWMbutton ? 'block' : 'hidden' }`}>거래 완료 list</button>
            </div>
          </div>
        </div>
        <div className='w-full h-4/5 border-2 border-primary_dark rounded-lg'></div>
      </div>
    </div>
    </div>
  )
}

export default Mypage;