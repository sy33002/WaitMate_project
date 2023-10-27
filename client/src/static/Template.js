import React from 'react';
import Sidebar from './SideBar';

export default function Template({ children }) {
  return (
    <main className="flex bg-background">
      <Sidebar />
      <div className="bg-background ml-[20px] mr-1/5 flex-1">
        {children}</div>
    </main>
  );
}
