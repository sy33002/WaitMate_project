import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

function Header() {
  const { id, nickname, photo, userId, setUserInfo } = useUserStore();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    setUserInfo();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    setIsAlertOpen(false);
  };

  const toggleAlert = () => {
    setIsAlertOpen(!isAlertOpen);
    setMenuOpen(false);
  };

  const profileImage = photo || '/images/waitMate2.png';

  return (
    <div>
      <header className="bg-background h-20 flex justify-between items-center p-2 w-full">
        <div>
          <Link to="/map">
            <img
              src="/images/logo_letter2.png"
              alt="로고"
              className="w-20 md:w-24 sm:w-20 bg-background rounded-none p-1"
            />
          </Link>
        </div>
        <div className="flex items-center relative">
          <Link to="/mypage/myPage">
            <div className="w-16 md:w-24 sm:w-20 p-3">
              <img
                src={profileImage}
                alt="프로필"
                className="w-full h-full rounded-full border border-gray-300"
              />
            </div>
          </Link>
          <div>
            <button
              onClick={toggleAlert}
              className="font-extrabold text-primary py-2 px-1 sm:py-2 sm:px-1 md:py-2 md:px-2 text-xs sm:text-sm md:text-baserounded-full relative"
            >
              🔔
              {isAlertOpen && (
                <div className="menu bg-white absolute right-0 top-full p-2 rounded-md shadow-md">
                  <div className="text-primary w-24">
                    <p>알림입니다!</p>
                  </div>
                </div>
              )}
            </button>
          </div>
          <div className="flex flex-col">
            <button
              onClick={toggleMenu}
              className="font-extrabold text-primary py-2 px-1 sm:py-2 sm:px-1 md:py-2 md:px-2 text-xs sm:text-sm md:text-baserounded-full relative"
            >
              ▽
              {isMenuOpen && (
                <div className="menu bg-gray-100 absolute right-0 top-full p-2 rounded-md shadow-md">
                  <div className="text-primary text-xs w-28 font-gmarket">
                    <Link to="/mypage/myPage">
                      <p className="p-2">My Page</p>
                    </Link>
                    <hr className="border-gray-300 w-full" />
                    <Link to="/mypage/myPage">
                      <p className="p-2 mt-1">My ChatList</p>
                    </Link>
                    <hr className="border-gray-300 w-full" />
                    <Link to="/mypage/myPage">
                      <p className="p-2">Logout</p>
                    </Link>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>
      <hr className="border-t border-gray-300 w-full" />
    </div>
  );
}

export default Header;
