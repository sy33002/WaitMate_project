import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

function Header() {
  const {id, nickname, photo, userId, setUserInfo} = useUserStore();
  useEffect(() => {
    setUserInfo()
  }, []) 
  return (
    <header className='bg-background flex justify-between items-center p-1'>
      <div>
        <Link to="/map">
          <img src='/images/logo.png' alt='로고' className='w-12 md:w-24 sm:w-20' />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <div className="w-12 md:w-24 sm:w-20 p-1">
            <img src='/images/someone.png' alt='익명' className='w-full h-full rounded-full' />
          </div>
        </div>
        <button className="text-primary bg-transparent py-2 px-4 sm:py-2 sm:px-4 md:py-2 md:px-8 text-xs sm:text-sm md:text-base hover:bg-primary hover:text-white rounded-full">
          <a href="/your-link">{nickname}</a>
        </button>
      </div>
    </header>
  );
}

export default Header;