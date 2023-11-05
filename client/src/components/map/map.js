import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function MapComponent({ setLocationInfo }) {
  const [userLocation, setUserLocation] = useState(null);
  const [addressLocation, setAddressLocation] = useState(null);
  const [inputAddressValue, setInputAddressValue] = useState('');

  // 사용자의 현재 위치를 가져오는 함수
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
    // 컴포넌트가 처음 렌더링될 때 사용자의 현재 위치를 가져옵니다.
    getCurrentLocation((location) => {
      if (location) {
        setUserLocation(location);
      }
    });
  }, []);

  const waitMateAddress = () => {
    console.log('data : ', addressLocation); // addressLocation을 사용
    // setLocationInfo 함수를 호출하여 위치 정보 설정
    setLocationInfo({
      lat: addressLocation.lat,
      lng: addressLocation.lng,
    });
    console.log('사용자 정보 호출', setLocationInfo);
  };

  return (
    <div>
      <Map
        className="map"
        level={3}
        center={userLocation || addressLocation || { lat: 0, lng: 0 }} // 기본값 설정
        style={{ width: '100%', height: '800px' }}
      >
        {/* 사용자의 위치를 마커로 표시 */}
        {userLocation && (
          <MapMarker
            position={userLocation}
            text="Your Location"
            image={{
              src: './images/proxy.png',
              size: { width: 64, height: 64 },
            }}
          />
        )}

        {/* 주소 검색 결과로 가져온 위치 정보를 마커로 표시 */}
        {addressLocation && (
          <MapMarker
          position={{
            lat: setLocation.lat,
            lng: setLocation.lng
          }}
            image={{
              src: './images/waitMate.png',
              size: { width: 64, height: 64 },
            }}
          />
        )}
      </Map>
    </div>
  );
}
