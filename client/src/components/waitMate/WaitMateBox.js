import React from 'react'

export default function WaitMateBox() {
  return (
    <div className='w-full h-full bg-primary rounded-lg flex flex-col justify-center items-center'>
        <img src='/images/me.jpg' className='w-2/3 h-1/3 border border-white rounded-lg'></img>
        <p className='text-background text-sm m-1'>제목내용 블라블라</p>
        <p className='text-gray-400 text-xs'>Date</p>
        <p className='text-gray-400 text-xs'>Time</p>
        <p className='text-gray-400 text-xs'>상세 내용 어쩌고 저쩌고</p>
    </div>
  )
}
