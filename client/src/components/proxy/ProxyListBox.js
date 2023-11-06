import React, { useState, useEffect } from 'react';
// import axios from 'axios';

export default function ProxyListBox({item}) {
//   const [userImage, setUserImage] = useState('');
//   const [userInfo, setUserInfo] = useState({});
    const [isHovered, setIsHoverd] = useState(false);
    const handleHoverIn = () => {
        setIsHoverd(true);
    };
    const handleHoverOut = () => {
      setIsHoverd(false);
    };
    return (
      <div className={'rounded-lg border-x-primary border-x-2 w-full h-24 elative mb-2'}
      onMouseOver={handleHoverIn}
      onMouseOut={handleHoverOut}>
        <div className='p-2 h-24 flex items-center absolute z-10 w-full'>
          <div className='lg:overflow-hidden w-1/4 flex justify-end pr-6'>
              <img src='/images/me.jpg' alt='User' className='h-20 rounded-full' />
          </div>
          <div className='p-2 text-center w-3/4 pr-8'>
              <p>{item.id}</p>
              <p>{item.proxyAddress}</p>
              <p>{item.gender}</p>
              <p>{item.age}</p>
          </div>
        </div>
        {isHovered && (
            <div className="hover-info bg-opacity-80 absolute justify-center z-20 bg-gray-800 h-24 w-full rounded-lg flex items-center">
              <div className='text-white'>{item.proxyMsg}</div>
            </div>
        )}
      </div>
  );
}