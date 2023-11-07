import React, { useState, useEffect } from 'react';
import ProxyListBox from './ProxyListBox';
import { Link } from 'react-router-dom';
import Select from "react-select";

export default function WaitMateList({cities, id, nickname, photo, userId }) {
  const [selectedOption, setSelectedOption] = useState('updatedAt');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleOption = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  }

  const handleAddressChange = (e) => {
    const selectedValue = e.target.value;
    setAddress(selectedValue);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const selectedCity = cities.find(city => city.values.includes(address));
        const fullAddress = `${selectedCity.label} ${address}`;
        console.log(fullAddress);
        const response = await fetch(`http://localhost:8080/proxy/list?address=${fullAddress}&order=${selectedOption}`, {
            method: 'GET',
          });
        if (response.ok) {
          const {list} = await response.json();
          setItems(list);
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
  }, [address, selectedOption]);

  //페이지 네이션
  const indexOfLastItem = currentPage * itemsPerPage; 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  
  console.log("indexOfLastItem >>>", indexOfLastItem);
  console.log("indexOfFirstItem >>>", indexOfFirstItem);
  console.log("currentItems >>>", currentItems);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const collectOption = (address === '' ? '선택하세요' : address);

  return (
    <div className='h-2/3 p-4'>
      <div className='flex justify-between items-center space-x-4 text-center'>
        <div>
          <p className='text-[13px] text-green font-Line'>근처에 있는 <span className='text-primary'>프록시</span>를 찾아보세요!</p>
          <select value={selectedOption} onChange={handleOption} 
          className='text-primary p-2 font-Line text-[12px] bg-background'>
            <option value='updatedAt'>최근 목록순</option>
            <option value='pay'>시급순</option>
            <option value='count'>조회순</option>
          </select>
        </div>
        <Select
          className='w-1/3 text-primary font-Line text-sm'
          options={cities}
          onChange={(selectedOption) => {
            if (selectedOption) {
              setAddress(selectedOption.value);
            } else {
              setAddress(null);
            }
          }}
        />
        <div></div>
        <div></div>
      </div>
      <div className='w-full h-full m-8'>
        {currentItems.map((item, index) => (
          <div key={item.proxyId} className="flex w-full">
            <Link to={`/proxy/detail/${item.proxyId}`}>
            <ProxyListBox item={item} />
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        이전
      </button>
      <span>{`${currentPage} / ${totalPages}`}</span>
      </div>
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        다음
      </button>
    </div>
  );
}