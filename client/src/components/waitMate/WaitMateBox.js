import React from 'react'

export default function WaitMateBox({item, isSmallScreen}) {
  return (
    <div className='w-full h-full p-2 bg-primary rounded-lg flex flex-col justify-center items-center 
    font-Lin hover:translate-y-[-5px] transform transition-transform duration-200 hover:shadow-lg shadow-md'>
      <div  className={`${isSmallScreen ? 'h-32' : 'h-48' } w-4/5 border border-white rounded-lg`}>
        <img src={`/images/me.jpg`} className='w-full h-full rounded-lg'></img>
        </div>
        <p className='text-green font-Line text-sm mt-2'>{item.title}</p><br />
        <p className='text-gray-300 font-Line text-xs'>{item.date}</p>
        <p className='text-gray-300 font-Line text-xs'>{item.wmAddress}</p>
        <p className='text-gray-300 font-Line text-xs'>{item.waitTime}</p>
    </div>
  )
}
