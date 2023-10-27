import React from 'react';
import Sidebar from './SideBar';
import Header from './Header';
export default function Template({ children }) {
  return (
    <div>
      <Header />
    <main className="flex bg-background">
      <Sidebar />
      <div className="bg-background ml-[20px] mr-[20px] flex-1">
        {children}</div>
    </main>
    </div>
  );
}
