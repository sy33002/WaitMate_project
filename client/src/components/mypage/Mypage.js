import React, { useState, useEffect } from 'react';
import useUserStore from '../../store/useUserStore';

function Mypage() {
  const {
    id,
    userId,
    nickname,
    profileImg,
    setUserInfo,
    logout,
    setProfileImage,
  } = useUserStore();
  const [activeTab, setActiveTab] = useState(null);
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    setUserInfo();
  }, [setUserInfo]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const renderButtons = () => {
    if (activeTab === 'proxy') {
      fetch('YOUR_BACKEND_URL_FOR_PROXY') // 백엔드 API 호출 예시
        .then((response) => response.json())
        .then((data) => setListItems(data))
        .catch((error) => console.error('Error:', error));

      return (
        <div className="flex space-x-2 mb-4">
          <button className="background text-primary w-52 py-2 rounded-lg border border-2 border-primary">
            나의 이력서
          </button>
          <button className="background text-primary w-52 py-2 rounded-lg border border-2 border-primary">
            내가 찜한 웨메 리스트
          </button>
          <button className="background text-primary w-52 py-2 rounded-lg border border-2 border-primary">
            내가 픽한 웨메 리스트
          </button>
        </div>
      );
    }
    if (activeTab === 'waitmate') {
      fetch('YOUR_BACKEND_URL_FOR_WAITMATE') // 백엔드 API 호출 예시
        .then((response) => response.json())
        .then((data) => setListItems(data))
        .catch((error) => console.error('Error:', error));

      return (
        <div className="flex space-x-2 mb-4">
          <button className="background text-primary w-52 py-2 rounded-lg border border-2 border-primary">
            내가 등록한 웨메 리스트
          </button>
          <button className="background text-primary w-52 py-2 rounded-lg border border-2 border-primary">
            내가 픽한 프록시 리스트
          </button>
        </div>
      );
    }
  };

  return (
    <div className="background min-h-screen">
      <h1 className="ml-10 mt-10 text-6xl text-primary font-semibold mb-2 text-left">
        My Page
      </h1>

      <div className="mt-10 flex items-start mb-6">
        <div className="ml-10 mr-4 flex flex-col items-center">
          <div className="border w-52 h-60 border-primary rounded-lg flex flex-col items-center">
            <div className="w-44 h-44 mt-1 bg-gray-300 rounded-lg flex items-center justify-center text-6xl mb-2">
              <img
                src={profileImg}
                alt="Profile"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
            <input
              type="file"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="profile-upload"
            />
            <label
              htmlFor="profile-upload"
              className="background text-primary w-44 py-2 rounded-lg text-center text-sm border border-2 border-primary cursor-pointer"
            >
              프로필 사진 Edit
            </label>
          </div>
        </div>
        <div>
          <div className="space-x-4">
            <button
              onClick={() => setActiveTab('proxy')}
              className="w-80 bg-primary text-white py-2 px-4 rounded-lg"
            >
              My Proxy
            </button>
            <button
              onClick={() => setActiveTab('waitmate')}
              className="w-80 bg-primary text-white py-2 px-4 rounded-lg"
            >
              My WaitMate
            </button>
          </div>
          <div className="mt-4">{renderButtons()}</div>
          <div className="bg-white rounded-lg h-96 mt-4 border border-2 border-primary">
            {listItems.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
