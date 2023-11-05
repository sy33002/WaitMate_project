import React from 'react';
import Sidebar from './SideBar.js';
import Header from './Header.js';
import MobileSidebar from './MoblieSideBar';

export default function Template({ children }) {
  const isMobile = window.innerWidth < 700;

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
    </div>
  );
}
