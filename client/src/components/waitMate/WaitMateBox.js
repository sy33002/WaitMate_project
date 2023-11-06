import React from 'react'

export default function WaitMateBox({item}) {
  return (
    <div className='w-full h-full bg-primary rounded-lg flex flex-col justify-center items-center'>
        <img src='/images/me.jpg' className='w-2/3 h-1/3 border border-white rounded-lg'></img>
        <p className='text-background text-sm m-1'>{item.title}</p>
        <p className='text-gray-400 text-xs'>{item.date}</p>
        <p className='text-gray-400 text-xs'>{item.wmAddress}</p>
        <p className='text-gray-400 text-xs'>{item.waitTime}</p>
        <p className='text-gray-400 text-xs'>{item.description}</p>
    </div>
  )
}
