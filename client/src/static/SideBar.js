import React, { useState } from 'react';
import {wmSubmenu} from './SideBarSub';
import {proxySubmenu} from './SideBarSub';
import { Link } from 'react-router-dom';
import './sideBar.css';

function SidebarItem({ text, subMenu, activeSubMenu, setActiveSubMenu }) {
  const isSubMenuOpen = activeSubMenu === text;
  const [isHovered, setHovered] = useState(false);

  const toggleSubMenu = () => {
    if (isSubMenuOpen) {
      setActiveSubMenu(null);
    } else {
      setActiveSubMenu(text);
    }
  };

  return (
    <div>
      <li className={`relative m-2 rounded-sm p-2 cursor-pointer font-gmarket font-bold transition-all duration-300 ${
      isHovered ? 'text-green bg-primary_dark transition-transform transform translate-x-0 hover:translate-x-4' : 'text-primary_dark bg-background'
    } ${
      isSubMenuOpen ? ' bg-red-200 shadow-lg ' : ''
    }`}
        onClick={toggleSubMenu}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {text}
      </li>
      {isSubMenuOpen && 
        <ul className="animate-fade-in">{subMenu}</ul>}
    </div>
  );
}

function Sidebar() {
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  return (
    <div className="p-4 bg-background w-58 h-screen mt-10">
      <ul className="text-lg xl:text-xl h-full flex flex-col justify-start item-center text-center">
        <div className='h-1/5'>
        <Link to='/waitMate/register'>
        <SidebarItem 
          text="Wait Mate" 
          subMenu={wmSubmenu} 
          activeSubMenu={activeSubMenu}
          setActiveSubMenu={setActiveSubMenu} />
        </Link>
        </div>
        <div className='h-1/5'>
        <Link to='/proxy/register'>
        <SidebarItem 
          text="Proxy"
          subMenu={proxySubmenu}
          activeSubMenu={activeSubMenu}
          setActiveSubMenu={setActiveSubMenu} />
        </Link>
        </div>
        <div className='h-1/5'>
        <Link to='/map'>
        <SidebarItem 
          text="Map" 
          activeSubMenu={activeSubMenu}
          setActiveSubMenu={setActiveSubMenu} />
        </Link>
        </div>
        <div className='h-1/5'>
        <Link to='/myPage/Chatlist'>
        <SidebarItem 
          text="My Chat"
          activeSubMenu={activeSubMenu}
          setActiveSubMenu={setActiveSubMenu} />
        </Link>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;