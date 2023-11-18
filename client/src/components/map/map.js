import React, { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import axios from 'axios';


export default function MapComponent() {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const isSmallScreen = window.innerWidth < 700;
  const { wmId } = useParams();
  const apiUrl = process.env.REACT_APP_URL;
  const { id } = useUserStore();
  const Navigate = useNavigate();

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
    const updateData = async () => {
      try {
        const response = await axios({
          url: `${apiUrl}/waitMate/mapList`,
          metho: 'GET',
        });
        const data = response.data;
        setUserAddress(data);
        data.forEach((data) => {
          console.log('data.lat', data.lat);
          console.log('id', data.id);
        });
      } catch (err) {
        console.error('데이터 가져오기 실패:', err);
      }
    };
    updateData();
  }, [wmId]);

  const stylingOverlay = () => {
    const style = {
      fontSize: 'large',
      fontWeight: 'bold',
      borderRadius: '5px',
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
      fontSize: '17px',
      fontWeight: 'bold',
    };
    const info_link = {
      padding: '10px 15px 50px 18px',
      height: '60px', 
      background: 'white',
      borderBottom: '1px solid #ddd',
      fontSize: '17px',
      fontWeight: 'bold',
      lineHeight: '36px',
      borderRadius: '5px',
      fontFamily: 'hanna',
    };
    const info_title = {
      padding: '0 0 0 40px',
      height: '40px',
      lineHeight: '40px',
      background: '#eee',
      borderBottom: '1px solid #ddd',
      borderRadius: '5px',
      fontFamily: 'hanna',
    };
    return { style, info_close, info_title, info_link };
  };

  const openOverlay = (marker) => {
    setSelectedMarker(marker);
    setIsOpen(true);
  };

  const closeOverlay = () => {
    setSelectedMarker(null);
    setIsOpen(false);
  };

  const getMapHeight = () => {
    return window.innerWidth > 768 ? '800px' : '400px';
  };

  return (
    <div className={`${isSmallScreen ? 'p-1' : 'p-4'} font-Line`}>
      <div className=" text-primary  flex w-full h-20 items-center">
        <img
          src="https://sesac-projects.site/waitmate/images/waitMate.png"
          alt="WaitMate"
          className="w-20"
        />
        <div>
          <p
            className={`${isSmallScreen ? 'text-[11px]' : 'text-[18px]'} flex`}
          >
            👈 내 위치 주변의 <p className="text-green"> 웨이트메이트 </p>를
            찾아보세요!
          </p>
          <p className={`${isSmallScreen ? 'text-[9px]' : 'text-[14px]'}`}>
            * 웨이트메이트는 프록시에게 웨이팅을 요청하는 역할입니다.
          </p>
        </div>
      </div>
      <div className=" text-primary  flex w-full h-16 items-center mb-3">
        <span className="flex w-full h-20 items-center">
          <img
            src="https://sesac-projects.site/waitmate/images/proxy.png"
            alt="Proxy"
            className="w-40 p-4"
          />
          <p className={`${isSmallScreen ? 'text-[12px]' : 'text-[18px]'}`}>
            👈 프록시 모양의 핀은 "자신의 위치"입니다!
          </p>
        </span>
      </div>
      <div
        className={`${
          isSmallScreen ? 'text-[9px]' : 'text-[14px]'
        } text-gray-600 mb-2`}
      >
        <span>채팅을 통해 웨이트메이트와 대화후 웨이팅을 요청해보세요!</span>
        <p>
          프록시는 자신의 위치를 기반으로 주변 웨이트메이트 공고를 찾아볼수
          있습니다!
        </p>
      </div>

      <div className="marker-marker-container">
        <Map
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
                size: { width: 82, height: 76 },
              }}
            />
          )}

          {userAddress.map((data, index) => {
            if (data.lat && data.lng) {
              return (
                <>
                  <MapMarker
                    key={index}
                    position={{ lat: data.lat, lng: data.lng }}
                    text={data.key}
                    image={{
                      src: 'https://sesac-projects.site/waitmate/images/mapWaitMate.png',
                      size: { width: 54, height: 54 },
                    }}
                    onClick={() => {
                      openOverlay(data);
                      console.log('마커 클릭됨');
                    }}
                  ></MapMarker>
                  {isOpen && selectedMarker && (
                    <CustomOverlayMap
                      position={{
                        lat: selectedMarker.lat,
                        lng: selectedMarker.lng,
                      }}
                    >
                      <div className="wrap marker-marker-test">
                        <div className="info">
                          <div
                            className="title"
                            style={stylingOverlay().info_title}
                          >
                            웨이트 메이트 장소
                            <div
                              className="close"
                              onClick={() => closeOverlay()}
                              title="닫기"
                              style={stylingOverlay().info_close}
                            ></div>
                          </div>
                          <div className="body">
                            <div
                              className="desc"
                              style={stylingOverlay().info_link}
                            >
                              <div>
                                <div
                                  onClick={() =>
                                    Navigate(
                                      `/waitMate/detail/${selectedMarker.wmId}`
                                    )
                                  }
                                  target="_blank"
                                  className="link"
                                  rel="noreferrer"
                                >
                                  웨이트 메이트 공고 바로가기
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CustomOverlayMap>
                  )}
                </>
              );
            }
          })}
        </Map>
       
      </div>
    </div>
  );
}
