import React, { useState } from 'react'

export default function Error404() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

  return (
    <div className='w-full h-screen bg-white flex items-center justify-center'>
        <img 
            className={`${isSmallScreen ? 'w-full h-2/5' : 'w-full h-4/5'}`}
            src='https://sesac-projects.site/waitmate/images/404errorpage.jpg'></img>
    </div>
  )
}
