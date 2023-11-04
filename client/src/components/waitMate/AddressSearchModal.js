import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';

export default function AddressSearchModal({
  setInputAddressValue,
  setLocationInfo,
}) {
  const KAKAO_API_KEY = 'd6b027213f554936dffa4ecfc423cd06';

  const handleAddressChange = (data) => {
    setInputAddressValue(data.address);

    // 주소 검색 결과로 가져온 위치 정보를 설정
    setLocationInfo({
      lat: data.y,
      lng: data.x,
    });

    const searchTxt = data.address;
    const config = {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    const url =
      'https://dapi.kakao.com/v2/local/search/address.json?query=' + searchTxt;
    axios.get(url, config).then(function (result) {
      if (
        result.data !== undefined &&
        result.data.documents &&
        result.data.documents[0]
      ) {
        const firstDocument = result.data.documents[0];
        console.log('x :', firstDocument.x);
        console.log('y :', firstDocument.y);
        if (firstDocument.x && firstDocument.y) {
          setLocationInfo({
            address_name: firstDocument.address.address_name,
            region_2depth_name: firstDocument.address.region_2depth_name,
            x: firstDocument.x,
            y: firstDocument.y,
          });
        }
      }
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <DaumPostcode autoClose onComplete={handleAddressChange} />
      </div>
    </div>
  );
}
