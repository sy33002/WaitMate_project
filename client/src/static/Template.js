import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar.js';
import Header from './Header.js';
import MobileSidebar from './MoblieSideBar';
import Footer from './Footer.js';

export default function Template({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Header />
      <main className='bg-background'>
        <div className={`${isMobile ? ' flex flex-col' : 'flex'}`}>
          {isMobile ? <MobileSidebar /> : <Sidebar />}
            <div className="bg-background ml-[20px] mr-[20px] flex-1">
              {children}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
