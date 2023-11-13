import React, { useState, useEffect } from 'react';
import useUserStore from '../../store/useUserStore';
import { useNavigate, Link } from 'react-router-dom';
import { axiosInstance } from '../common/axiosInstance';
import axios from 'axios';

function Mypage() {
  const {
    id,
    userId,
    nickname,
    profileImg,
    setProfileImage,
    setUserInfo,
    logout,
  } = useUserStore();
  const [myResume, setMyResume] = useState([]);
  const [myLikeList, setMyLikeList] = useState([]);
  const [myWaitMateList, setMyWaitMateList] = useState([]);
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

  const handleLogout = async () => {
    await logout();
    navigate('/');
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

  const proxyNotes = async () => {
    try {
      console.log('아이디값', id);
      const response = await axios.get(
        'http://localhost:8080/proxy/getProxyAll',
        {
          params: { id: id },
        }
      );
      if (!response) {
        console.log('정보값이 없습니다');
        return;
      }
      if (response.data === '') {
        console.log('정보값이 비었습니다');
      }

      console.log(response.data);
      setMyResume(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`w-full h-screen text-primary_dark font-Line m-1 p-1 flex flex-col items-center`}
    >
      <h1
        className={`${isSmallScreen ? 'text-[20px]' : 'text-[30px] mt-3 p-4'}`}
      >
        My page
      </h1>
      <div
        className={` w-full h-screen text-primary_dark font-Line flex ${
          isSmallScreen ? 'flex-col' : ''
        } m-1 p-1`}
      >
        <div
          className={`flex ${
            isSmallScreen ? 'w-full h-2/5 p-2' : 'w-1/3 h-4/5'
          }  items-center`}
        >
          <div
            className={`flex flex-col items-center justify-center ${
              isSmallScreen ? 'h-full' : 'h-4/5'
            }  w-full`}
          >
            <div
              className={`${
                isSmallScreen ? ' w-3/5 h-3/5' : 'h-1/4 w-4/5'
              } bg-white rounded-lg`}
            >
              <img src={profileImg} alt="Profile" />
            </div>
            <input
              type="file"
              onChange={handleImageUpload}
              id="profile-upload"
            />
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
        <div className="w-full h-4/5">
          <div className={`flex w-full ${isSmallScreen ? 'h-120' : 'h-24'}`}>
            <div
              className={`${
                isSmallScreen ? 'text-[16px]' : 'text-[16px]'
              } w-1/2`}
            >
              <button className="bg-primary text-background px-2 rounded-lg">
                My Proxy
              </button>
              <div
                className={`flex  flex-col p-2 ${
                  isSmallScreen ? 'text-[10px]' : 'text-[14px]'
                }`}
              >
                <button onClick={proxyNotes}>나의 이력서</button>
                <button>내가 찜한 웨이트메이트 list</button>
              </div>
            </div>
            <div
              className={`${
                isSmallScreen ? 'text-[16px]' : 'text-[16px]'
              } w-1/2`}
            >
              <button className="bg-primary text-background px-2 rounded-lg">
                My WaitMate
              </button>
              <div
                className={`flex flex-col p-2 ${
                  isSmallScreen ? 'text-[10px]' : 'text-[14px]'
                }`}
              >
                <button>나의 웨이트메이트 목록</button>
                <button>거래 완료 list</button>
              </div>
            </div>
          </div>
          <div className="w-full h-4/5 border-2 border-primary_dark rounded-lg">
            {myResume.length > 0 ? (
              <ul>
                {myResume.map((item, index) => (
                  <li
                    key={index}
                    className="mb-4 p-4 border-2 border-gray-300 rounded-md flex"
                  >
                    <div className="w-1/4">
                      <img
                        src={item.photo}
                        alt="Proxy"
                        className="w-full h-auto rounded-md"
                      />
                    </div>
                    <div className="w-3/4 ml-4">
                      <Link to={`/proxy/update/${item.proxyId}`}>
                        <p>{item.title}</p>
                        <p>주소 : {item.proxyAddress}</p>
                        <p>성별 : {item.gender}</p>
                        <p>나이 : {item.age}</p>
                        <p>메세지 : {item.proxyMsg}</p>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>데이터가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
