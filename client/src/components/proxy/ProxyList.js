import React, { useState, useEffect } from 'react';
import ProxyListBox from './ProxyListBox';

export default function WaitMateList({cities}) {
  const [selectedOption, setSelectedOption] = useState('updatedAt');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');

  const handleOption = (e) => {
    setSelectedOption(e.target.value);
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/proxy/getter?address=${address}&order=${selectedOption}`, {
            method: 'GET',
          });
        if (response.ok) {
          const {list} = await response.json();
          setItems(list);
          console.log("aaaaaaaaaaa",list);
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
  }, []);

  return (
    <div className='h-full'>
      <div className='flex justify-between items-center space-x-4'>
        <div>
          <p className='text-[10px] text-primary'>근처에 있는 프록시 목록</p>
          <select value={selectedOption} onChange={handleOption} className='text-primary text-[10px] bg-background'>
            <option value='updatedAt'>최근 목록순</option>
            <option value='byRating'>평점순</option>
          </select>
        </div>
        {/* <span className='text-[10px] text-primary' onClick={handleAddressChange}>{address}</span> */}
        <select value={selectedOption} onChange={handleAddressChange}>
        <option value={address}>{address}</option>
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
        <div></div>
        <div></div>
      </div>
      <div className='w-2/5 h-1/3 m-8'>
        {items.map((item) => (
          <ProxyListBox key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}