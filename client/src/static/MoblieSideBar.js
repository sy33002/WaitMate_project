import React, { useState } from 'react';
import {wmSubmenu} from './MobileSideBarSub'; 
import {proxySubmenu} from './MobileSideBarSub';
import {mychatSubmenu} from './MobileSideBarSub';
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
        <div 
          className={`relative m-2 text-xs rounded-sm p-2 cursor-pointer font-bold font-gmarket transition-all duration-300 ${
            isHovered ? 'text-background bg-primary_dark transition-transform transform translate-x-0 hover:translate-x-2' : 'text-primary bg-background'
          } ${
            isSubMenuOpen ? 'bg-red-200 shadow-lg text-green' : ''
          }`}
              onClick={toggleSubMenu}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
        >
          {text}
        </div>
        {isSubMenuOpen && (
        <div className="w-full animate-fade-in">
          {subMenu}
        </div>
        )}
      </div>
    );
  }

export default function MobileSidebar() {
  const [activeSubMenu, setActiveSubMenu] = useState(null);

    return (
        <div className="bg-background h-1/5 my-1 w-full text-base flex justify-center item-center text-center">
          <div className='w-1/4'>
        <Link to='/waitMate/register'>
          <SidebarItem 
            text="Wait Mate" 
            subMenu={wmSubmenu} 
            activeSubMenu={activeSubMenu}
          setActiveSubMenu={setActiveSubMenu} />
        </Link>
          </div>
          <div className='w-1/4'>
        <Link to='/proxy/register'>
          <SidebarItem 
            text="Proxy"
           subMenu={proxySubmenu} 
           activeSubMenu={activeSubMenu}
          setActiveSubMenu={setActiveSubMenu} />
        </Link>
          </div>
          <div className='w-1/4'>
          <Link to='/map'>
          <SidebarItem 
            text="Map"
            activeSubMenu={activeSubMenu}
          setActiveSubMenu={setActiveSubMenu} />
          </Link>
          </div>
          <div className='w-1/4'>
        <Link to='/myPage/Chatlist'>
          <SidebarItem 
            text="My Chat" 
            activeSubMenu={activeSubMenu}
          setActiveSubMenu={setActiveSubMenu} />
        </Link>
          </div>
        </div>
    );
  }
  