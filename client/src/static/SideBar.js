import React from 'react';
import { Link } from 'react-router-dom';

function SidebarItem({ text, textSize, url }) {
  return (
    <Link to={`/${url}`}>
    <li className={`text-${textSize} text-primary sm:ml-2 sm:py-1 sm:px-2 md:ml-4 md:py-2 md:px-4 text-base sm:text-sm md:text-lg`}>{text}</li>
    </Link>
  );
}

function Sidebar() {
  return (
    <div className="bg-background w-1/5 p-4 h-screen fixed top-0 left-0 mt-28">
      <ul>
        <SidebarItem text="Wait Mate" textSize="primary"/>
        <SidebarItem text="Proxy" textSize="sm" />
        <SidebarItem text="My Chat" textSize="md" />
      </ul>
    </div>
  );
}

export default Sidebar;
