import React, { useState, useEffect } from 'react';
import WaitMateBox from './WaitMateBox';
import { Link } from 'react-router-dom';
import Select from "react-select";

export default function WaitMateList({cities, id, nickname, photo, userId }) {
  const [selectedOption, setSelectedOption] = useState('updatedAt');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleOption = (e) => {
    setSelectedOption(e.target.value);
  }

  const handleAddressChange = (e) => {
    const selectedValue = e.target.value;
    setAddress(selectedValue);
  }

  const filterAddresses = () => {
    if (searchText) {
      return cities.reduce((filteredCities, city) => {
        const filteredValues = city.values.filter(value => value.includes(searchText));
        if (filteredValues.length > 0) {
          return [...filteredCities, { ...city, values: filteredValues }];
        }
        return filteredCities;
      }, []);
    }
    return cities;
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
    <div className='h-full'>
      <div className='flex justify-between items-center space-x-4'>
        <div>
          <p className='text-[10px] text-primary'>근처에 있는 웨이트메이트 목록</p>
          <select value={selectedOption} onChange={handleOption} className='text-primary text-[10px] bg-background'>
            <option value='updatedAt'>최근 목록순</option>
            <option value='byRating'>평점순</option>
          </select>
        </div>
        <Select
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
      {currentItems.map((item, index) => {
        // 짝수 인덱스인 경우 현재 아이템과 다음 아이템 표시
        if (index % 2 === 0) {
          const nextItem = currentItems[index + 1];
          return (
            <div key={item.wdId} className="flex w-full">
              <Link to={`/waitMate/detail/${item.wdId}`}>
                <WaitMateBox item={item} />
              </Link>
              {nextItem && 
              <Link to={`/waitMate/detail/${item.wdId}`}>
                <WaitMateBox item={nextItem} />
              </Link>
              }
            </div>
          );
        }
        return null;
      })}
      <div className="pagination">
      </div>
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        이전
      </button>
      <span>{`${currentPage} / ${totalPages}`}</span>
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        다음
      </button>
      </div>
    </div>
  );
}