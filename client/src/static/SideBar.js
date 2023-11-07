import React, { useState } from 'react';
import {wmSubmenu} from './SideBarSub';
import {proxySubmenu} from './SideBarSub';
import { Link } from 'react-router-dom';
import './sideBar.css';

function SidebarItem({ text, subMenu }) {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div>
      <li className={`relative m-2 rounded-sm p-2 cursor-pointer font-gmarket transition-all duration-300 ${
      isHovered ? 'text-background bg-primary_dark transition-transform transform translate-x-0 hover:translate-x-4' : 'text-primary bg-background'
    } ${
      isSubMenuOpen ? 'bg-primary shadow-lg text-green' : ''
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
  return (
    <div className="p-4 bg-background w-58 h-screen mt-10">
      <ul className="text-lg xl:text-xl h-full flex flex-col justify-start item-center text-center">
        <div className='h-1/5'>
        <Link to='/waitMate/register'>
        <SidebarItem 
          text="Wait Mate" 
          subMenu={wmSubmenu} />
        </Link>
        </div>
        <div className='h-1/5'>
        <Link to='/proxy/register'>
        <SidebarItem 
          text="Proxy"
         subMenu={proxySubmenu} />
        </Link>
        </div>
        <div className='h-1/5'>
        <Link to='/map'>
        <SidebarItem 
          text="Map" />
        </Link>
        </div>
        <div className='h-1/5'>
        <Link to='/myPage/Chatlist'>
        <SidebarItem 
          text="My Chat"/>
        </Link>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;