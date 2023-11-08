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
      <div className={'border-x-2 border-primary w-full h-24 elative mb-4'}
      onMouseOver={handleHoverIn}
      onMouseOut={handleHoverOut}
      style={{ overflow: 'hidden' }}>
        <div className='p-2 h-24 flex items-center relative w-full'>
          <div className='w-1/3 flex justify-end pr-6'>
              <img src={`${item.photo}`} alt='User' className=' border border-primary_light h-20 w-20 rounded-full z-2' />
          </div>
          <div className='p-2 text-center w-3/4 pr-8'>
              <p className='font-Line text-primary_dark text-sm bg-green rounded-lg p-1'>{item.title}</p>
              <p className='font-Line text-primary text-xs'>{item.proxyAddress}</p>
              <p className='font-Line text-gray-500 text-xs'>{item.gender}</p>
              <p className='font-Line text-gray-500 text-xs'>{item.age}</p>
          </div>
        {isHovered && (
            <div className="z-3 hover-info w-full bg-opacity-80 absolute top-0 left-0 justify-center bg-gray-800 h-24 flex items-center"
            style={{}}>
              <div className='text-white'>{item.proxyMsg}</div>
            </div>
        )}
        </div>
      </div>
  );
}