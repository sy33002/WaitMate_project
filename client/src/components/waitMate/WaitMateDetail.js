import React from 'react'

export default function WaitMateDetail() {
  return (
    <div className='w-full h-full flex flex-col items-center'>
      <p className='text-xs text-primary'>00동 Wait Mate가 찾고 있는 조건이에요!</p>
      <div className='flex flex-col w-4/5 h-4/5 border border-primary rounded-lg justify-center'>
        <div className='h-1/4 flex flex-col justify-center items-center p-2'>
          <img src='/images/me.jpg' className='rounded-lg h-full'></img>
        </div>
        <div className='h-3/4 m-2'>
          <p>Title: </p>
          <p>Store Address: </p>
          <p>Date: </p>
          <p>Time: </p>
          <p>Hourly rate(시급): </p>
          <p>상세설명: </p>
        </div>
        <div>
          <span>최근 채용 횟수: </span>
          <span>게시물 조회수: </span>
          <span>지원자: </span>
          <span>관심: </span>
        </div>
      </div>
    </div>
  )
}
