import React, { useState, useEffect } from 'react';
import WaitMateBox from './WaitMateBox';
import { Link } from 'react-router-dom';
import Select from "react-select";

export default function WaitMateList({cities, id, nickname, photo, userId }) {
  const [selectedOption, setSelectedOption] = useState('updatedAt');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

  const handleOption = (e) => {
    setSelectedOption(e.target.value);
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/waitMate/list?wmAddress=${address}&order=${selectedOption}`, {
            method: 'GET',
          });
        if (response.ok) {
          const {waitMates} = await response.json();
          setItems(waitMates);
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

  return (
    <div className='h-screen p-4 mt-4 flex flex-col item-center justify-center text-center'>
      <div className='flex justify-between items-center space-x-4 '>
        <div>
        <p className={`${isSmallScreen ? 'text-[8px]' : 'text-[13px]'} text-green font-Line`}>
          근처에 있는 
            <span className='text-primary'>웨이트 메이트</span>
          를 찾아보세요!</p>
          <select value={selectedOption} onChange={handleOption} 
          className={`${isSmallScreen ? 'text-[8px]' : 'text-[12px]'} text-primary p-2 font-Line bg-background'}`}>
            <option value='updatedAt'>최근 목록순</option>
            <option value='pay'>시급순</option>
            <option value='count'>조회순</option>
          </select>
        </div>
        <Select
          className={`${isSmallScreen ? 'text-[10px] w-2/3' : 'text-[12px] w-1/3'} text-primary font-Line text-sm'}`}
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
      <div className='w-full h-full p-2 '>
      {currentItems.map((item, index) => {
        if (index % 2 === 0) {
          const nextItem = currentItems[index + 1];
          return (
            <div key={item.wdId} className="flex w-full h-1/2justify-center item-center">
              <div className='w-1/2 p-1'>
              <Link to={`/waitMate/detail/${item.wmId}`}>
                <WaitMateBox item={item} isSmallScreen={isSmallScreen} />
              </Link>
              </div>
              <div className='w-1/2 p-1'>
              {nextItem && 
              <Link to={`/waitMate/detail/${item.wmId}`}>
                <WaitMateBox item={nextItem} isSmallScreen={isSmallScreen} />
              </Link>
              }
              </div>
            </div>
          );
        }
        return null;
      })}
      <div className="pagination">
      </div>
      <div className='relative bottom-0 left-0 w-full flex justify-center items-center'>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}
        className='text-sm text-gray-500 font-Line'>
          prev
        </button>
        <span
          className='font-Line text-xs text-primary_dark m-2'
        >{`${currentPage} / ${totalPages}`}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}
        className='text-sm text-gray-500 font-Line'>
          next
        </button>
      </div>
      </div>
    </div>
  );
}