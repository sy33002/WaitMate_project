import React, { useState, useEffect } from 'react';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../common/axiosInstance';
import axios from 'axios';

function Mypage() {
  const {  id, userId, nickname, profileImg, setProfileImage, setUserInfo, logout,} = useUserStore();
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

  // My Proxy - 나의 이력서
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`https://sesac-projects.site/wapi/getProxyAll/id=${id}`, {
  //           method: 'GET',
  //         });
  //       if (response.ok) {
  //         const {list} = await response.json();
  //         setMyResume(list);
  //       } else {
  //         console.log('데이터 가져오기 실패!');
  //       }
  //     } catch (error) {
  //       console.log('데이터 가져오는 중 오류 발생', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // My Proxy - 내가 찜한 웨이트메이트 list
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`https://sesac-projects.site/wapi/likeWait/list/id=${id}`, {
  //           method: 'GET',
  //         });
  //       if (response.ok) {
  //         const {getLikeWaitList} = await response.json();
  //         setMyLikeList(getLikeWaitList);
  //       } else {
  //         console.log('데이터 가져오기 실패!');
  //       }
  //     } catch (error) {
  //       console.log('데이터 가져오는 중 오류 발생', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // My WaitMate - 내가 작성한 웨이트메이트 list
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`https://sesac-projects.site/wapi/waitMate/myWaitMate/id=${id}`, {
  //           method: 'GET',
  //         });
  //       if (response.ok) {
  //         const {myWaitMates} = await response.json();
  //         setMyWaitMateList(myWaitMates);
  //       } else {
  //         console.log('데이터 가져오기 실패!');
  //       }
  //     } catch (error) {
  //       console.log('데이터 가져오는 중 오류 발생', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className={`w-full h-screen text-primary_dark font-Line m-1 p-1 flex flex-col items-center`}>
      <h1 className={`${isSmallScreen? 'text-[20px]' : 'text-[30px] mt-3 p-4'}`}>My page</h1>
    <div className={` w-full h-screen text-primary_dark font-Line flex ${isSmallScreen ? 'flex-col' : ''} m-1 p-1`}>
      <div className={`flex ${isSmallScreen? 'w-full h-2/5 p-2' : 'w-1/3 h-4/5'}  items-center`}>
        <div className={`flex flex-col items-center justify-center ${isSmallScreen? 'h-full' : 'h-4/5'}  w-full`}>
          <div className={`${isSmallScreen? ' w-3/5 h-3/5' : 'h-1/4 w-4/5'} bg-white rounded-lg`}><img src={profileImg} alt="Profile" /></div>
          <input type="file" onChange={handleImageUpload} id="profile-upload" />
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
      <div className='w-full h-4/5'>
        <div className={`flex w-full ${isSmallScreen ? 'h-120' : 'h-24'}`}>
          <div className={`${isSmallScreen? 'text-[16px]' : 'text-[16px]'} w-1/2`}>
          <button className='bg-primary text-background px-2 rounded-lg'>My Proxy</button>
            <div className={`flex  flex-col p-2 ${isSmallScreen? 'text-[10px]' : 'text-[14px]'}`}>
              <button onClick={() => {}}>나의 이력서</button>
              <button>내가 찜한 웨이트메이트 list</button>
            </div>
          </div>
          <div className={`${isSmallScreen? 'text-[16px]' : 'text-[16px]'} w-1/2`}>
          <button className='bg-primary text-background px-2 rounded-lg'>My WaitMate</button>
          <div className={`flex flex-col p-2 ${isSmallScreen? 'text-[10px]' : 'text-[14px]'}`}>
              <button>나의 웨이트메이트 목록</button>
              <button>거래 완료 list</button>
            </div>
          </div>
        </div>
        <div className='w-full h-4/5 border-2 border-primary_dark rounded-lg'>



        </div>
      </div>
    </div>
    </div>
  )
}

export default Mypage;