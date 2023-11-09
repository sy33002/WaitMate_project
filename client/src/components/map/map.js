import React, { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MapComponent({ id }) {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Control the overlay visibility
  const [selectedMarker, setSelectedMarker] = useState(null);
  const isSmallScreen = window.innerWidth < 700;
  const { wmId } = useParams();
  const apiUrl = process.env.REACT_APP_URL;

  function getCurrentLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        callback({ lat: latitude, lng: longitude });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
      callback(null);
    }
  }

  useEffect(() => {
    getCurrentLocation((location) => {
      if (location) {
        setUserLocation(location);
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/waitMate/mapList`)
      .then((res) => {
        const data = res.data;
        setUserAddress(data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 실패:', error);
      });
  }, [wmId]);

  const stylingOverlay = () => {
    // 스타일 함수 내용은 그대로 유지
    // ...
  };

  const openOverlay = (marker) => {
    setSelectedMarker(marker);
    setIsOpen(true);
  };

  const closeOverlay = () => {
    setSelectedMarker(null);
    setIsOpen(false);
  };

  // 화면 크기를 변경할 때 높이를 조정
  const getMapHeight = () => {
    return window.innerWidth > 768 ? '800px' : '400px';
  };

  return (
    <div className={`${isSmallScreen ? 'p-1' : 'p-4'} font-Line`}>
      <div className=" text-primary  flex w-full h-20 items-center">
        <img src="https://sesac-projects.site/waitmate/images/waitMate.png" alt="WaitMate" className='w-20'/>
        <div>
        <p className={`${isSmallScreen ? 'text-[11px]' : 'text-[18px]'} flex`}>
        👈 내 위치 주변의 <p className='text-green'> 웨이트메이트 </p>를 찾아보세요!
        </p>
        <p className={`${isSmallScreen ? 'text-[9px]' : 'text-[14px]'}`}>
          * 웨이트메이트는 프록시에게 웨이팅을 요청하는 역할입니다.
        </p>
        </div>
      </div>
      <div className=" text-primary  flex w-full h-16 items-center mb-3">
        <span className='flex w-full h-20 items-center'>
          <img src="https://sesac-projects.site/waitmate/images/proxy.png" alt="Proxy" className='w-40 p-4'/>
          <p className={`${isSmallScreen ? 'text-[12px]' : 'text-[18px]'}`}>
          👈 프록시
            모양의 핀은 "자신의 위치"입니다!</p>
          </span>
          </div>
            <div className={`${isSmallScreen ? 'text-[9px]' : 'text-[14px]'} text-gray-600 mb-2`}>
            <span>채팅을 통해 웨이트메이트와 대화후 웨이팅을 요청해보세요!</span>
            <p>
              프록시는 자신의 위치를 기반으로 주변 웨이트메이트 공고를 찾아볼수
              있습니다!
            </p>
            </div>        

      <div >
        <Map
          className="map z-10"
          level={3}
          center={userLocation || { lat: 0, lng: 0 }}
          style={{ width: '100%', height: getMapHeight() }}
        >
          {userLocation && (
            <MapMarker
              position={userLocation}
              text="Your Location"
              image={{
                src: 'https://sesac-projects.site/waitmate/images/mapProxy.png',
                size: { width: 92, height: 76 },
              }}
            />
          )}

          {userAddress.map((data, index) => {
            if (data.lat && data.lng) {
              return (
                <MapMarker
                  key={index}
                  position={{ lat: data.lat, lng: data.lng }}
                  image={{
                    src: 'https://sesac-projects.site/waitmate/images/mapWaitMate.png',
                    size: { width: 64, height: 64 },
                  }}
                  onClick={() => openOverlay(data)} // Open the overlay on marker click
                />
              );
            }
          })}

          {isOpen && selectedMarker && (
            <CustomOverlayMap
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            >
              <div className="wrap">
                <div className="info">
                  <div className="title" style={stylingOverlay().info_title}>
                    웨이트 메이트 장소
                    <div
                      className="close"
                      onClick={closeOverlay} // Close the overlay
                      title="닫기"
                      style={stylingOverlay().info_close}
                    ></div>
                  </div>
                  <div className="body">
                    <div className="desc" style={stylingOverlay().info_link}>
                      <div>
                        <a
                          href={`${apiUrl}/waitMate/detail?wmId=${selectedMarker.waitMate}`}
                          target="_blank"
                          className="link"
                          rel="noreferrer"
                          style={stylingOverlay().info_link}
                        >
                          웨이트 메이트 공고 바로가기
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CustomOverlayMap>
          )}
        </Map>
      </div>
    </div>
  );
}
