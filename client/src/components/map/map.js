import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MapComponent() {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const { wmId } = useParams();

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

  useEffect(() => {
    axios.get(`http://localhost:8080/waitMate/mapList`)
      .then((res) => {
        const data = res.data;
        setUserAddress(data);
        console.log('waitMate 데이터:', data);
        data.forEach((data)=>{
          console.log("data.lat",data.lat);
        })
      })
      .catch((error) => {
        // 요청이 실패했을 때 에러 처리
        console.error('데이터 가져오기 실패:', error);
      });
  }, [wmId]); // wmId가 변경될 때마다 다시 요청

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

        {/* userAddress의 데이터를 마커로 표시 */}
        {userAddress.map((data, index) => {
          console.log('data', data);
          if (data.lat && data.lng) {
            return (
              <MapMarker
                key={index}
                position={{ lat: data.lat, lng: data.lng }}
                text={data.key} // 각 데이터의 텍스트 표시 설정 (원하는 대로 수정 가능)
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
