import React, { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MapComponent({ id }) {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Control the overlay visibility
  const [selectedMarker, setSelectedMarker] = useState(null); // Store the selected marker
  const { wmId } = useParams();

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
      .get(`http://localhost:8080/waitMate/mapList`)
      .then((res) => {
        const data = res.data;
        setUserAddress(data);
        console.log('waitMate 데이터:', data);
        data.forEach((data) => {
          console.log('data.lat', data.lat);
        });
      })
      .catch((error) => {
        console.error('데이터 가져오기 실패:', error);
      });
  }, [wmId]);

  const stylingOverlay = () => {
    const style = {
      fontSize: 'x-large',
      fontWeight: 'bold',
    };
    const info_close = {
      position: 'absolute',
      top: '10px',
      right: '10px',
      color: '#888',
      width: '17px',
      height: '17px',
      background:
        'url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png)',
    };
    const info_title = {
      padding: '5px 0 0 10px',
      height: '30px',
      background: '#eee',
      borderBottom: '1px solid #ddd',
      fontSize: '18px',
      fontWeight: 'bold',
    };
    const display_none = {
      display: 'none',
    };

    // Styles object
    return { style, info_close, info_title };
  };

  // Function to open the custom overlay
  const openOverlay = (marker) => {
    setSelectedMarker(marker);
    setIsOpen(true);
  };

  // Function to close the custom overlay
  const closeOverlay = () => {
    setSelectedMarker(null);
    setIsOpen(false);
  };

  return (
    <>
      <div class="waitMate_letter">
        <span>
          <img src="./images/waitMate.png" />
        </span>
        웨이트메이트를 찾아보세요!
      </div>
      <div class="waitMate_letter_second">
        <span>
          <img src="./images/proxy.png" />
           프록시<span class="waitMate_letter">는 자신의 위치입니다!</span>
        </span>
      </div>

      <div class="container">
        <Map
          className="map"
          level={3}
          center={userLocation || { lat: 0, lng: 0 }}
          style={{ width: '100%', height: '800px' }}
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
                    <div className="desc">
                      <div>
                        <a
                          href={`http://localhost:8080/waitMate/detail?wmId=${selectedMarker.waitMate}`}
                          target="_blank"
                          className="link"
                          rel="noreferrer"
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
