import React, { useState, useEffect } from 'react';
import WaitMateBox from './WaitMateBox';

export default function WaitMateList() {
  const cities = [
    {
      label: "서울특별시",
      values: ["종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구","강동구"]
    },
    {
      label: "경기도",
      values: ["수원시", "성남시", "고양시", "용인시", "부천시", "안산시", "안양시", "남양주시", "화성시", "평택시", "의정부시", "시흥시", "파주시", "광명시", "김포시", "군포시", "광주시", "이천시", "양주시", "오산시", "구리시", "안성시", "포천시", "의왕시", "하남시", "여주시", "여주군", "양평군", "동두천시", "과천시", "가평군", "연천군"]
    },
    {
      label: "부산광역시",
      values: ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"]
    },
    {
      label: "대구광역시",
      values: ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군"]
    },
    {
      label: "인천광역시",
      values: ["중구", "동구", "남구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"]
    },
    {
      label: "광주광역시",
      values: ["동구", "서구", "남구", "북구", "광산구"]
    },
    {
      label: "대전광역시",
      values: ["동구", "중구", "서구", "유성구", "대덕구"]
    },
    {
      label: "울산광역시",
      values: ["중구", "남구", "동구", "북구", "울주군"]
    },
    {
      label: "세종특별자치시",
      values: ["세종특별자치시"]
    },
    {
      label: "강원도",
      values: ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"]
    },
    {
      label: "충청북도",
      values: ["청주시", "충주시", "제천시", "청원군", "보은군", "옥천군", "영동군", "진천군", "괴산군", "음성군", "단양군", "증평군"]
    },
    {
      label: "충청남도",
      values: ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "당진군", "금산군", "연기군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"]
    },
    {
      label: "전라북도",
      values: ["전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"]
    },
    {
      label: "전라남도",
      values: ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"]
    },
    {
      label: "경상북도",
      values: ["포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"]
    },
    {
      label: "경상남도",
      values: ["창원시", "마산시", "진주시", "진해시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"]
    },
    {
      label: "제주특별자치도",
      values: ["제주시", "서귀포시", "북제주군", "남제주군"]
    },
  ];
  

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
