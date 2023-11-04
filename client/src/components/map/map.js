// import React from "react";
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// export default function SimpleMap(){
//   const defaultProps = {
//     center: {git 
//       lat: 10.99835602,
//       lng: 77.01502627
//     },
//     zoom: 11
//   };

//   return (
//     // Important! Always set the container height explicitly
//     <div style={{ height: '100vh', width: '100%' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "" }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         <AnyReactComponent
//           lat={59.955413}
//           lng={30.337844}
//           text="My Marker"
//         />
//       </GoogleMapReact>
//     </div>
//   );
// }

// import React from 'react';
// import Map from 'react-kakao-maps-sdk';

// export default function Map() {
//   return (
//     <Map
//       center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
//       style={{ width: '800px', height: '600px' }} // 지도 크기
//       level={3} // 지도 확대 레벨
//     ></Map>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function MapComponent({ id, nickname, photo, userId }) {
  const { kakao } = window;
  const locations = [
    { title: '카카오', latlng: { lat: 33.450705, lng: 126.570677 } },
    { title: '생태연못', latlng: { lat: 33.450936, lng: 126.569477 } },
    { title: '텃밭', latlng: { lat: 33.450879, lng: 126.56994 } },
    { title: '근린공원', latlng: { lat: 33.451393, lng: 126.570738 } },
  ];

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  const successHandler = (response) => {
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error) => {
    console.log(error);
  };

  const getAddress = (lat, lng) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lng);

    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  return (
    <div>
      <Map
        center={{
          lat: location.latitude || 33.5563,
          lng: location.longitude || 126.79581,
        }}
        style={{ width: '1000px', height: '800px' }}
        level={3}
        onClick={(e) => getAddress(e.latLng.getLat(), e.latLng.getLng())}
      >
        {locations.map((loc, idx) => (
          <MapMarker
            key={`${loc.title}-${loc.latlng.lat}-${loc.latlng.lng}`}
            position={loc.latlng}
            image={{
              src: './images/proxy.png',
              size: { width: 64, height: 64 },
            }}
            title={loc.title}
          />
        ))}
        {location.latitude && location.longitude && (
          <MapMarker
            position={{ lat: location.latitude, lng: location.longitude }}
          />
        )}
        {address && (
          <div>
            현재 좌표의 주소는..
            <p>address_name: {address.address_name}</p>
            <p>region_1depth_name: {address.region_1depth_name}</p>
            <p>region_2depth_name: {address.region_2depth_name}</p>
            <p>region_3depth_name: {address.region_3depth_name}</p>
          </div>
        )}
      </Map>
    </div>
  );
}