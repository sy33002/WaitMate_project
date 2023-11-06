import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

function Header() {
   const {id, nickname, photo, userId, setUserInfo} = useUserStore();
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setUserInfo();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
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
          <div className="flex flex-col">
            <button
              onClick={toggleMenu}
              className="font-extrabold text-primary py-2 px-1 sm:py-2 sm:px-1 md:py-2 md:px-2 text-xs sm:text-sm md:text-baserounded-full relative"
            >
              ▽
              {isMenuOpen && (
                <div className="menu bg-white absolute right-0 top-full p-2 rounded-md shadow-md">
                  <div className="text-primary w-full">
                    <Link to="/mypage/myPage">
                      <p className="p-2">My Page</p>
                    </Link>
                    <Link to="/mypage/myPage">
                      <p className="p-2">My ChatList</p>
                    </Link>
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
      <hr className="border-t border-gray-200 w-full" />
    </div>
  );
}

export default Header;
