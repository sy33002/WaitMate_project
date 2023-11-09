import React, { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MapComponent({ id }) {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Control the overlay visibility
  const [selectedMarker, setSelectedMarker] = useState(null);
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
    <>
      <div className="waitMate_letter">
        <span>
          <img src="/waitmate/images/waitMate.png" alt="WaitMate" />
        </span>
        내 위치 주변의 웨이트메이트를 찾아보세요!
        <p>
          웨이트메이트는 프록시에게 웨이팅을 요청해 대신 웨이팅을 해주는
          역할입니다.
        </p>
      </div>
      <div className="waitMate_letter_second">
        <span>
          <img src="/waitmate/images/proxy.png" alt="Proxy" />
          프록시
          </span>
          <span className="waitMate_letter">
            는 자신의 위치입니다!
            <p>채팅을 통해 프록시와 대화후 웨이팅을 요청해보세요!</p>
            <span>
              프록시는 자신의 위치를 기반으로 주변 웨이트메이트 공고를 찾아볼수
              있습니다!
            </span>
          
        </span>
      </div>

      <div className="container">
        <Map
          className="map"
          level={3}
          center={userLocation || { lat: 0, lng: 0 }}
          style={{ width: '100%', height: getMapHeight() }}
        >
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

          {userAddress.map((data, index) => {
            if (data.lat && data.lng) {
              return (
                <MapMarker
                  key={index}
                  position={{ lat: data.lat, lng: data.lng }}
                  image={{
                    src: './images/waitMate.png',
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
    </>
  );
}
