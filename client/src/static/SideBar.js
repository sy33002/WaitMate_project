import React, { useState } from 'react';
import {wmSubmenu} from './SideBarSub';
import {proxySubmenu} from './SideBarSub';
import {mychatSubmenu} from './SideBarSub';

function SidebarItem({ text, subMenu }) {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div>
      <li
        className={`text-primary`}
        onClick={toggleSubMenu}
      >
        {text}
      </li>
      {isSubMenuOpen && <ul>{subMenu}</ul>}
    </div>
  );
}

function Sidebar() {
  return (
    <div className="p-4 bg-background w-58 h-screen mt-16">
      <ul className="text-lg xl:text-xl h-full flex flex-col justify-start item-center text-center">
        <div className='h-1/4'>
        <SidebarItem 
          text="Wait Mate" 
          subMenu={wmSubmenu} />
        </div>
        <div className='h-1/4'>
        <SidebarItem 
          text="Proxy"
         subMenu={proxySubmenu} />
        </div>
        <div className='h-1/4'>
        <SidebarItem 
          text="My Chat"
         subMenu={mychatSubmenu} />
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
