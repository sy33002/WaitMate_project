import React, { useState } from 'react';
import {wmSubmenu} from './MobileSideBarSub'; 
import {proxySubmenu} from './MobileSideBarSub';
import {mychatSubmenu} from './MobileSideBarSub';
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
        <div 
          className={`relative m-2 rounded-sm p-2 cursor-pointer font-gmarket transition-all duration-300 ${
            isHovered ? 'text-background bg-primary_dark transition-transform transform translate-x-0 hover:translate-x-2' : 'text-primary bg-background'
          } ${
            isSubMenuOpen ? 'bg-primary shadow-lg text-green' : ''
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
    return (
        <div className="bg-background h-1/5 my-1 w-full text-base flex justify-center item-center text-center">
          <div className='w-1/4'>
        <Link to='/waitMate/register'>
          <SidebarItem 
            text="Wait Mate" 
            subMenu={wmSubmenu} />
        </Link>
          </div>
          <div className='w-1/4'>
        <Link to='/proxy/register'>
          <SidebarItem 
            text="Proxy"
           subMenu={proxySubmenu} />
        </Link>
          </div>
          <div className='w-1/4'>
          <Link to='/map'>
          <SidebarItem 
            text="Map" />
          </Link>
          </div>
          <div className='w-1/4'>
        <Link to='/myPage/Chatlist'>
          <SidebarItem 
            text="My Chat" />
        </Link>
          </div>
        </div>
    );
  }
  