import React, { useState, useEffect } from 'react';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../common/axiosInstance';
import axios from 'axios';

function Mypage() {
  const {
    // id,
    userId,
    nickname,
    profileImg,
    setProfileImage,
    setUserInfo,
    logout,
  } = useUserStore();
  const [id, setId] = useState(10); // ID값 넣어 둔거
  const [activeTab, setActiveTab] = useState('');
  const [listItems, setListItems] = useState([]);
  const [error, setError] = useState('');
  const [selectedEdit, setSelectedEdit] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

  const basicButtonClasses =
    'py-2 px-4 text-white bg-primary border-2 border-primary rounded-lg transition-colors duration-300';
  const baseButtonClasses =
    'py-2 px-4 text-primary border-2 border-primary rounded-lg transition-colors duration-300';
  const responsiveButtonClasses =
    'w-full sm:w-auto md:w-1/2 lg:w-1/3 xl:w-1/4 my-2 sm:my-0';

  const responsiveProfileClasses = 'w-full md:w-52 lg:w-60';

  const responsiveImageClasses =
    'w-44 md:w-52 lg:w-60 h-36 md:h-44 lg:h-52 bg-gray-300 rounded-lg';
  const responsiveButtonContainer =
    'flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2';
  const responsiveListItem = 'p-2';

  console.log(id);
  axios({
    url : `https://sesac-projects.site/wapi/proxy/proxyOne/${id}`,
    method : 'get'
   })
   .then((res)=>{
    console.log(res.data);
   })
   .catch((err)=>{
    console.error(err);
   });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (url !== '') {
          // 나머지 코드는 그대로 두고, 첫 번째 요청을 보내도록 수정
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (Array.isArray(data)) {
                console.log('hi');
                setListItems(data);
              } else {
                console.log('bye');
                setListItems([data.result]);
              }
            })
            .catch((error) => {
              console.error('데이터 가져오는 중 오류 발생!', error);
            });
          setError('');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('데이터를 불러오는데 실패했습니다. 나중에 다시 시도해주세요.');
      }
  
    
    };
  
    setUserInfo();
    fetchItems();
  }, [url, setUserInfo]);

  const getProxy = () => {
    // 나의 이력서
    setUrl(`${process.env.REACT_APP_URL}/proxy/detail/33`);
  };

  const getLikeWMList = () => {
    // 내가 찜한 웨메리스트
    setUrl(`${process.env.REACT_APP_URL}/likeWait/list?id=${id}`);
  };
  const getPickedWMList = () => {
    // 내가 픽한 웨메리스트
    setUrl(`${process.env.REACT_APP_URL}/wmReservation/wmList?id=${id}`);
  };
  const getMyWMList = () => {
    // 내가 등록한 웨메리스트
    setUrl(`${process.env.REACT_APP_URL}/waitMate/myWaitMate?id=${id}`);
  };
  const getPickedProxyList = () => {
    console.log(id);
    // 내가 픽한 프록시 리스트
    setUrl(`${process.env.REACT_APP_URL}/wmReservation/proxyList?id=${id}`);
  };

  const fetchMyResumeClick = async () => {
    if (!selectedItem || !selectedItem.id) {
      setError('프록시를 선택해주세요.');
      return;
    }

    const proxyId = selectedItem.proxyId;

  };

  const handleMyLikedWaitMatesClick = async () => {
    setActiveTab('proxy');
  };

  const handleMyPickedWaitMatesClick = async () => {
    setActiveTab('waitmate');
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImg', file);

    try {
      const response = await axiosInstance.post('/user/profileImg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newImageUrl = response.data.imageUrl;
      setProfileImage(newImageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleMyResumeClick = () => {
    setSelectedEdit('proxy');
    setActiveTab('proxy');
  };

  const handleMyWaitMateClick = () => {
    setSelectedEdit('waitmate');
    setActiveTab('waitmate');
  };

  const toggleEditButton = () => {
    setShowEditButton((prev) => !prev);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleEditResume = (item) => {
    console.log(item);
    console.log(selectedItem);
    if (selectedItem) {
      const proxyId = selectedItem.proxyId; // proxyId를 얻어옴
      console.log(proxyId);
      navigate(`/proxy/update/${proxyId}`);
    }
  };

  const handleEditWaitmate = () => {
    console.log(selectedItem);
    if (selectedItem) {
      const wmId = selectedItem.wmId; // wmId를 얻어옴
      navigate(`/waitMate/update/${wmId}`);
    }
  };

  const renderButtons = () => {
    if (activeTab === 'proxy') {
      return (
        <div
          className={`flex ${
            isSmallScreen
              ? 'flex-col space-y-2 mb-4 w-full'
              : 'flex-row space-y-0 space-x-2 mb-4 w-[600px]'
          }`}
        >
          <div
            className={`flex ${
              isSmallScreen
                ? 'flex-row w-full h-20 space-x-1 space-y-2 text-sm '
                : 'space-x-2 w-[600px] '
            }`}
          >
            <button
              onClick={() => {
                getProxy();
                handleMyResumeClick();
              }}
              className={`${baseButtonClasses} ${responsiveButtonClasses}`}
            >
              나의 이력서
            </button>
            <button
              onClick={getLikeWMList}
              className={`${baseButtonClasses} ${responsiveButtonClasses}`}
            >
              내가 찜한 웨메 리스트
            </button>
            <button
              onClick={getPickedWMList}
              className={`${baseButtonClasses} ${responsiveButtonClasses}`}
            >
              내가 픽한 웨메 리스트
            </button>
          </div>
        </div>
      );
    }
    if (activeTab === 'waitmate') {
      return (
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => {
              getMyWMList();
              handleMyWaitMateClick();
            }}
            className={`${baseButtonClasses} ${responsiveButtonClasses}`}
          >
            내가 등록한 웨메 리스트
          </button>
          <button
            onClick={getPickedProxyList}
            className={`${baseButtonClasses} ${responsiveButtonClasses}`}
          >
            내가 픽한 프록시 리스트
          </button>
        </div>
      );
    }
    return null;
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

  const renderListItems = () => {
    return listItems.map((item, index) => (
      <div key={index} className="p-2" onClick={() => handleSelectItem(item)}>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>
    ));
  };

  return (
    <div>
      <h1
        className={`mt-10 ${
          isSmallScreen ? 'text-center text-4xl' : 'ml-10 text-3xl'
        } sm:ml-10 sm:text-4xl md:text-5xl lg:text-6xl text-primary font-semibold mb-2`}
      >
        My Page
      </h1>

      <div
        className={`${
          isSmallScreen ? 'flex flex-col' : 'flex flex-row'
        } justify-center w-full h-full items-center`}
      >
        <div
          className={`${
            isSmallScreen ? 'flex flex-row' : 'flex'
          } justify-center w-full h-full items-center`}
        >
          <div className="flex flex-row md:flex-row items-start mb-6 border-primary">
            <div
              className={`${
                isSmallScreen
                  ? 'flex-col items-center mb-6'
                  : 'ml-10 mr-4 flex flex-col items-center mb-6 md:mb-0'
              } ${responsiveProfileClasses}`}
            >
              <img
                src={profileImg}
                alt="Profile"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                className={`my-1 ${responsiveImageClasses}`}
              />

              <input
                type="file"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="profile-upload"
              />
              <div className="flex justify-center items-center">
                <label
                  htmlFor="profile-upload"
                  className={`background text-primary ${
                    isSmallScreen ? 'w-44 ' : 'w-44'
                  } h-8 py-1 rounded-lg text-center text-sm border-2 border-primary cursor-pointer`}
                >
                  프로필 사진 Edit
                </label>
              </div>
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
        </div>
        <div className={`${isSmallScreen ? 'w-full h-auto' : 'w-[600px]'}  `}>
          <div
            className={`${
              isSmallScreen ? 'w-full h-auto' : 'w-[600px] h-12'
            } ${responsiveButtonContainer} overflow-auto justify-center md:justify-start`}
          >
            <button
              onClick={() => setActiveTab('proxy')}
              className={`${basicButtonClasses} ${responsiveButtonClasses} `}
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

          <div
            className={`bg-white rounded-lg mt-4 p-4 ${
              isSmallScreen ? 'w-full h-48' : 'w-[600px] h-80'
            } border-2 border-primary overflow-auto`}
          >
            {listItems.length === 0 ? (
              <p>데이터가 없습니다.</p>
            ) : (
              listItems.map((item, index) => (
                <div
                  key={index}
                  className={`${responsiveListItem} cursor-pointer`}
                  onClick={() => handleSelectItem(item)}
                >
                  <div className="border-2 border-primary rounded-md">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <h4>{item.likeId}</h4>
                    <p>
                      {item.createdAt}
                      {item.wmId}
                      {item.id}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          

          <div className="mt-2">
            {selectedEdit === 'proxy' && (
              <button
                onClick={handleEditResume}
                className={`${baseButtonClasses} ${responsiveButtonClasses}`}
              >
                나의 이력서 수정하기
              </button>
            )}
          </div>

          <div className="mt-2">
            {selectedEdit === 'waitmate' && (
              <button
                onClick={handleEditWaitmate}
                className={`${baseButtonClasses} ${responsiveButtonClasses}`}
              >
                나의 웨메 수정하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;