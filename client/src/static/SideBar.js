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
      {isSubMenuOpen && <ul className="pl-4">{subMenu}</ul>}
    </div>
  );
}

function Sidebar() {
  return (
    <div className="p-4 bg-background md:w-1/5 md:h-screen md:mt-20">
      <ul className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl h-full flex flex-col justify-start item-center text-center">
        <SidebarItem 
          text="Wait Mate" 
          subMenu={wmSubmenu} />
        <SidebarItem 
          text="Proxy"
         subMenu={proxySubmenu} />
        <SidebarItem 
          text="My Chat"
         subMenu={mychatSubmenu} />
      </ul>
    </div>
  );
}

export default Sidebar;
