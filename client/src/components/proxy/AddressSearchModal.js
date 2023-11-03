import React from 'react';
import DaumPostcode from 'react-daum-postcode';

function AddressSearchModal({ setInputAddressValue }) {
  const handleAddressChange = (data) => {
    // 주소 검색 완료 후 처리 로직
    setInputAddressValue(data.jibunAddress);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <DaumPostcode autoClose onComplete={handleAddressChange} />
      </div>
    </div>
  );
}

export default AddressSearchModal;
