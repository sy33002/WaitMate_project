import React, { useState, useEffect } from 'react';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../common/axiosInstance';

function Mypage() {
  const {
    userId, //
    nickname,
    profileImg,
    setUserInfo,
    logout,
    setProfileImage,
  } = useUserStore();

  const [activeTab, setActiveTab] = useState('');
  const [listItems, setListItems] = useState([]);
  const [error, setError] = useState('');
  const [showEditButton, setShowEditButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const basicButtonClasses =
    'py-2 px-4 text-white bg-primary border-2 border-primary rounded-lg transition-colors duration-300';
  const baseButtonClasses =
    'py-2 px-4 text-primary border-2 border-primary rounded-lg transition-colors duration-300';
  const responsiveButtonClasses =
    'w-full sm:w-52 md:w-64 lg:w-72 xl:w-80 my-2 sm:my-0';

  // Fetch the relevant items depending on the active tab
  useEffect(() => {
    const urls = {
      proxy: '',
      waitmate: '',
    };
    const fetchItems = async () => {
      const url = urls[activeTab];
      if (!url) return;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setListItems(data);
        setError('');
      } catch (error) {
        console.error('Error:', error);
        setError('데이터를 불러오는데 실패했습니다. 나중에 다시 시도해주세요.');
      }
    };

    setUserInfo();
    fetchItems();
  }, [activeTab, setUserInfo]);

  // Handle the profile image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.post(
        '/user/uploadProfileImage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const newImageUrl = response.data.imageUrl;
      setProfileImage(newImageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Navigate to the edit resume page
  const handleEditResume = () => {
    navigate('/edit-resume');
  };

  const toggleEditButton = () => {
    setShowEditButton((prev) => !prev);
  };

  const renderButtons = () => {
    if (activeTab === 'proxy') {
      return (
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
          <div className="flex space-x-2">
            <button
              onClick={toggleEditButton}
              className={`${baseButtonClasses} ${responsiveButtonClasses}`}
            >
              나의 이력서
            </button>
            <button
              className={`${baseButtonClasses} ${responsiveButtonClasses}`}
            >
              내가 찜한 웨메 리스트
            </button>
            <button
              className={`${baseButtonClasses} ${responsiveButtonClasses}`}
            >
              내가 픽한 웨메 리스트
            </button>
          </div>
          <div>
            {showEditButton && (
              <button
                onClick={handleEditResume}
                className={`${baseButtonClasses} ${responsiveButtonClasses}`}
              >
                수정하기
              </button>
            )}
          </div>
        </div>
      );
    }
    if (activeTab === 'waitmate') {
      return (
        <div className="flex space-x-2 mb-4">
          <button className={`${baseButtonClasses} ${responsiveButtonClasses}`}>
            내가 등록한 웨메 리스트
          </button>
          <button className={`${baseButtonClasses} ${responsiveButtonClasses}`}>
            내가 픽한 프록시 리스트
          </button>
        </div>
      );
    }
    return null; // 활성 탭이 없을 때는 버튼을 렌더링하지 않음
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate('/register/UserInfo');
  };

  return (
    <div className="background min-h-screen">
      <h1 className="ml-10 mt-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-semibold mb-2">
        My Page
      </h1>

      <div className="mt-10 flex flex-col md:flex-row items-start mb-6">
        <div className="ml-10 mr-4 flex flex-col items-center mb-6 md:mb-0">
          <div className="border w-full md:w-52 lg:w-60 border-primary rounded-lg p-4 flex flex-col items-center">
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
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4">
            {/* 버튼에 반응형 클래스 사용 */}
            <button
              onClick={() => setActiveTab('proxy')}
              className={`${basicButtonClasses} ${responsiveButtonClasses}`}
            >
              My Proxy
            </button>
            <button
              onClick={() => setActiveTab('waitmate')}
              className={`${basicButtonClasses} ${responsiveButtonClasses}`}
            >
              My WaitMate
            </button>
          </div>
          <div className="mt-4">{renderButtons()}</div>
          <div className="bg-white rounded-lg mt-4 p-4 h-80 border-2 border-primary overflow-auto">
            {listItems.map((item, index) => (
              <div key={index} className="p-2">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
