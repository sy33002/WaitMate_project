import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function MapComponent({ locationInfo }) {
  const [userLocation, setUserLocation] = useState(null);

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

  const hardcodedLocationInfo = {
    marker1: { lat: 37.123, lng: 127.456 },
    marker2: { lat: 38.789, lng: 128.012 },
  };
  
  return (
    <div>
      <Map
        className="map"
        level={3}
        center={userLocation || { lat: 0, lng: 0 }} // 기본값 설정
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

        {/* locationInfo의 데이터를 마커로 표시 */}
        {Object.keys(locationInfo).map((key, index) => {
          const data = locationInfo[key];
          console.log("data", data)
          if (data && data.lat && data.lng) {
            return (
              <MapMarker
                key={index}
                position={{ lat: data.lat, lng: data.lng }}
                text={key} // 각 데이터의 텍스트 표시 설정 (원하는 대로 수정 가능)
                image={{
                  src: './images/waitMate.png',
                  size: { width: 64, height: 64 },
                }}
              />
            );
          }
        })}
      </Map>
    </div>
  );
}
