import React, { useState } from 'react';
import {wmSubmenu} from './MobileSideBarSub'; 
import {proxySubmenu} from './MobileSideBarSub';
import {mychatSubmenu} from './MobileSideBarSub';

function SidebarItem({ text, subMenu }) {
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  
    const toggleSubMenu = () => {
      setSubMenuOpen(!isSubMenuOpen);
    };
  
    return (
      <div>
        <div
          className={`text-primary`}
          onClick={toggleSubMenu}
        >
          {text}
        </div>
        {isSubMenuOpen && <div className="pl-4">{subMenu}</div>}
      </div>
    );
  }

export default function MobileSidebar() {
    return (
        <div className="bg-background h-1/5 w-full text-base flex justify-center item-center text-center">
          <SidebarItem 
            text="Wait Mate" 
            subMenu={wmSubmenu} />
          <SidebarItem 
            text="Proxy"
           subMenu={proxySubmenu} />
          <SidebarItem 
            text="My Chat"
           subMenu={mychatSubmenu} />
        </div>
    );
  }
  