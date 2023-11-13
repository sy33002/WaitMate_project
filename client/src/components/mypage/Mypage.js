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
  const apiUrl = process.env.REACT_APP_URL;
  const [loading, setLoading] = useState(false);
  const [selectItem, setSelectItem] = useState({ type: null, id: null });
  const [completedWaitMateList, setCompletedWaitMateList] = useState([]);
  const [pickedWaitMateList, setPickedWaitMateList] = useState([]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleUserinfo = async () => {
    await setUserInfo();
    navigate('/register/UserInfo');
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

  // 나의 이력서
  const proxyNotes = async () => {
    try {
      console.log('아이디값', id);
      const response = await axios.get(`${apiUrl}/proxy/getProxyAll`, {
        params: { id: id },
      });
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

  // My Proxy - 내가 찜한 웨이트메이트 list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sesac-projects.site/wapi/likeWait/list/id=${id}`,
          {
            method: 'GET',
          }
        );
        if (response.ok) {
          const { getLikeWaitList } = await response.json();
          setMyLikeList(getLikeWaitList);
        } else {
          console.log('데이터 가져오기 실패!');
        }
      } catch (error) {
        console.log('데이터 가져오는 중 오류 발생', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // My WaitMate - 내가 작성한 웨이트메이트 list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sesac-projects.site/wapi/waitMate/myWaitMate/id=${id}`,
          {
            method: 'GET',
          }
        );
        if (response.ok) {
          console.log(response.json);
          const { myWaitMates } = await response.json();
          setMyWaitMateList(myWaitMates);
        } else {
          console.log('데이터 가져오기 실패!');
        }
      } catch (error) {
        console.log('데이터 가져오는 중 오류 발생', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCompletedWaitMateList = async () => {
      try {
        const response = await fetch(
          `https://sesac-projects.site/wapi/waitMate/completedMyWaitMateList/id=${id}`,
          {
            method: 'GET',
          }
        );
        if (response.ok) {
          console.log(response.json);
          const data = await response.json();
          setCompletedWaitMateList(data.myCompletedWaitMates);
        } else {
          console.log('데이터 가져오기 실패!');
        }
      } catch (error) {
        console.error('데이터 가져오는 중 오류 발생', error);
      }
    };

    fetchCompletedWaitMateList();
  }, [id]);

  const fetchPickedWaitMateList = async () => {
    try {
      const response = await fetch(
        `https://sesac-projects.site/wapi/wmReservation/wmList/id=${id}`,
        { method: 'GET' }
      );
      if (response.ok) {
        const data = await response.json();
        setPickedWaitMateList(data.pickedWaitMates);
      } else {
        console.log('데이터 가져오기 실패!');
      }
    } catch (error) {
      console.error('데이터 가져오는 중 오류 발생', error);
    }
  };

  useEffect(() => {
    fetchPickedWaitMateList();
  }, [id]); // 의존성 배열에 id 포함

  fetchPickedWaitMateList();
  const renderSelectedList = () => {
    switch (selectItem.type) {
      // case 'resume':
      //   return myResume.map((resume, index) => (
      //     <div key={index}>{/* 이력서 데이터 렌더링 */}</div>
      //   ));
      case 'likeList':
        return myLikeList.map((like, index) => (
          <div key={index}>{/* 찜한 리스트 데이터 렌더링 */}</div>
        ));
      case 'waitMate':
        return myWaitMateList.map((waitMate, index) => (
          <div key={index}>
            {/* 웨이트메이트 목록 데이터 렌더링 */}
            <p>{waitMate.title}</p>
            <button
              onClick={() => navigate(`/waitMate/update/${waitMate.id}`)}
              className="bg-primary text-white px-3 py-1 rounded-lg mt-2"
            >
              수정
            </button>
          </div>
        ));
      case 'completedWaitMate':
        return completedWaitMateList.map((completed, index) => (
          <div key={index}>{/* 거래 완료 리스트 데이터 렌더링 */}</div>
        ));
      case 'pickedWaitMate':
        return pickedWaitMateList.map((picked, index) => (
          <div key={index}>
            {/* '내가 픽한 웨메' 정보를 렌더링하는 코드 */}
            <p>{picked.title}</p>
            {/* 다른 필요한 정보와 수정 버튼 등 */}
          </div>
        ));
      default:
        return <div>선택된 항목이 없습니다.</div>;
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
            <div className="flex flex-row space-x-1">
              <button
                onClick={handleLogout}
                className="bg-primary text-white rounded-lg"
              >
                Log Out
              </button>
              <button
                onClick={handleUserinfo}
                className="bg-primary text-white rounded-lg"
              >
                회원정보 수정
              </button>
            </div>
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
                className={`flex p-2 space-x-2 ${
                  isSmallScreen
                    ? 'text-[10px] flex-col'
                    : 'flex-row text-[14px]'
                }`}
              >
                <button
                  onClick={proxyNotes}
                  className="border-primary border-2 rounded-lg"
                >
                  나의 이력서
                </button>
                <button
                  className="border-primary border-2 rounded-lg"
                  onClick={() => setSelectItem({ type: 'likeList', id: null })}
                >
                  내가 찜한 웨이트메이트 list
                </button>
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
                className={`flex p-2 space-x-2 ${
                  isSmallScreen
                    ? 'flex-col text-[10px]'
                    : 'flex-row text-[14px]'
                }`}
              >
                <button
                  className="border-primary border-2 rounded-lg"
                  onClick={() => setSelectItem({ type: 'waitMate', id: null })}
                >
                  나의 웨이트메이트 목록
                </button>
                <button
                  className="border-primary border-2 rounded-lg"
                  onClick={() =>
                    setSelectItem({ type: 'completedWaitMate', id: null })
                  }
                >
                  거래 완료 list
                </button>
                <button
                  className="border-primary border-2 rounded-lg"
                  onClick={() =>
                    setSelectItem({ type: 'pickedWaitMate', id: null })
                  }
                >
                  내가 픽한 웨메 list
                </button>
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
                      <button
                        onClick={() =>
                          navigate(`/proxy/update/${item.proxyId}`)
                        }
                        className="bg-primary text-white px-3 py-1 rounded-lg mt-2"
                      >
                        수정
                      </button>
                      {renderSelectedList()}
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
