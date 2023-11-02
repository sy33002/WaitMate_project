import React, { useState } from 'react'
import ProxyListBox from './ProxyListBox';

export default function ProxyList({cities}) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOption = (e) => {
    setSelectedOption(e.target.value);
  }
  return (
    <div className='h-full'>
      <div className='flex justify-between items-center space-x-4'>
        <div>
          <p className='text-[10px] text-primary'>근처에 있는 프록시 목록</p>
          <select value={selectedOption} onChange={handleOption}
          className='text-primary text-[10px] bg-background'>
            <option value='byRecently'>최근 목록순</option>
            <option value='byRating'>조회순</option>
          </select>
        </div>
        <span className='text-[10px] text-primary'>00시 00구 00동</span>
        <div></div>
        <div></div>
      </div>
      <br />
      <ProxyListBox />
    </div>
  )
}
