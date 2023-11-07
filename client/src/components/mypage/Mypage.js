import React, { useState, useEffect } from 'react';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../common/axiosInstance';

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
  const [activeTab, setActiveTab] = useState('null');
  const [listItems, setListItems] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUserInfo();
    const fetchItems = async () => {
      let url;
      if (activeTab === 'proxy') {
        url = 'YOUR_BACKEND_URL_FOR_PROXY';
      } else if (activeTab === 'waitmate') {
        url = 'YOUR_BACKEND_URL_FOR_WAITMATE';
      }

      if (url) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setListItems(data);
          setError('');
        } catch (error) {
          console.error('Error:', error);
          setError(
            '데이터를 불러오는데 실패했습니다. 나중에 다시 시도해주세요.'
          );
        }
      }
    };

    fetchItems();
  }, [activeTab, setUserInfo]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      // 이미지를 서버로 업로드하고 결과 URL을 받아옴
      const response = await axiosInstance.post(
        '/user/uploadProfileImage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // 서버로부터 받은 이미지 URL로 상태 업데이트
      const newImageUrl = response.data.imageUrl; // 서버 응답에 따라서 'imageUrl'을 적절한 필드명으로 변경해야 할 수 있습니다.
      useUserStore.getState().setProfileImage(newImageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
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
          <button className="background text-primary w-52 py-2 rounded-lg  border-2 border-primary">
            나의 이력서
          </button>
          <button className="background text-primary w-52 py-2 rounded-lg  border-2 border-primary">
            내가 찜한 웨메 리스트
          </button>
          <button className="background text-primary w-52 py-2 rounded-lg  border-2 border-primary">
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
          <button className="background text-primary w-52 py-2 rounded-lg  border-2 border-primary">
            내가 등록한 웨메 리스트
          </button>
          <button className="background text-primary w-52 py-2 rounded-lg  border-2 border-primary">
            내가 픽한 프록시 리스트
          </button>
        </div>
      );
    }
  };

  const navigate = useNavigate();
  const handleModalConfirm = () => {
    setShowModal(false);
    navigate('/register/UserInfo'); // 회원정보수정 페이지로 이동
  };
  const handleLogout = () => {
    logout(); // useUserStore의 logout 함수를 호출하여 로그아웃 처리
    navigate('/'); // 로그아웃 후 홈 페이지로 이동
  };

  return (
    <div className="background min-h-screen">
      <h1 className="ml-10 mt-10 text-6xl text-primary font-semibold mb-2 text-left">
        My Page
      </h1>

      <div className="mt-10 flex items-start mb-6">
        <div className="ml-10 mr-4 flex flex-col items-center">
          <div className="border w-52 h-60 border-primary rounded-lg flex flex-col items-center">
            <img
              src={profileImg}
              alt="Profile"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              className="w-44 h-36 mt-1 bg-gray-300 rounded-lg flex items-center justify-center text-6xl mb-2"
            />

            <input
              type="file"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="profile-upload"
            />
            <label
              htmlFor="profile-upload"
              className="background text-primary w-44 h-8 py-1 rounded-lg text-center text-sm  border-2 border-primary cursor-pointer"
            >
              프로필 사진 Edit
            </label>
            <div className="flex flex-row w-44 py-2">
              <div className="pr-2">
                <button
                  onClick={handleLogout}
                  className="text-primary w-16 h-8 text-sm rounded-lg border-2 border-primary"
                >
                  Log Out
                </button>
              </div>
              <div className="pl-2">
                <button
                  onClick={handleModalConfirm}
                  className="text-primary text-sm w-24 h-8 rounded-lg border-2 border-primary"
                >
                  회원정보 수정
                </button>
              </div>
            </div>
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
          <div className="bg-white rounded-lg h-96 mt-4  border-2 border-primary">
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
