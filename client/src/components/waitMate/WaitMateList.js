import React, { useState, useEffect } from 'react';
import WaitMateBox from './WaitMateBox';

export default function WaitMateList({cities}) {

  const [selectedOption, setSelectedOption] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('서울시 구로구');

  const handleOption = (e) => {
    setSelectedOption(e.target.value);
  }

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/waitMate/list', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          console.log('데이터 가져오기 실패!');
        }
      } catch (error) {
        console.log('데이터 가져오는 중 오류 발생', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [address]);

  return (
    <div className='h-full'>
      <div className='flex justify-between items-center space-x-4'>
        <div>
          <p className='text-[10px] text-primary'>근처에 있는 웨이트메이트 목록</p>
          <select value={selectedOption} onChange={handleOption} className='text-primary text-[10px] bg-background'>
            <option value='byRecently'>최근 목록순</option>
            <option value='byRating'>평점순</option>
          </select>
        </div>
        {/* <span className='text-[10px] text-primary' onClick={handleAddressChange}>{address}</span> */}
        <select value={selectedOption} onChange={handleAddressChange}>
          <option value="">선택하세요</option>
          {cities.map((city) => (
            <optgroup label={city.label} key={city.label}>
              {city.values.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      <p>선택한 옵션: {selectedOption}</p>
        <div></div>
        <div></div>
      </div>
      <div className='w-2/5 h-1/3 m-8'>
        {items.map((item) => (
          <WaitMateBox key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
