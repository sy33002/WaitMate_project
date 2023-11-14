import React, { useState, useEffect } from 'react';
import useUserStore from '../../store/useUserStore';
import { useNavigate, Link } from 'react-router-dom';
import { axiosInstance } from '../common/axiosInstance';
import axios from 'axios';
import { getSocket } from '../../socket';
import StarRating from '../rating/StarRating';

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
  const [waitMate, setWaitMate] = useState([]);
  const [pickedProxyList, setPickedProxyList] = useState([]);
  const [reviewId, setReviewId] = useState();
  const [reviewNickname, setReviewNickname] = useState();
  const [isReviewOpen, setIsReviewOpen] = useState();

  const testing = async (pickedProxyId) => {
    try {
      const response = await axios.get(`${apiUrl}/review/check`, {
        params: { userId: id, id: pickedProxyId },
      });
      console.log(response);
      if (response.data.result === true) {
        console.log(pickedProxyId);
        console.log(response.data.User.nickname);
        setReviewId(pickedProxyId);
        setReviewNickname(response.data.User.nickname);
        setIsReviewOpen(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
  const fetchLikedWaitMateList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/likeWait/list`, {
        params: { id: id },
      });
      if (response.data) {
        console.log('내가 찜한 웨이트메이트 목록:', response.data);
        setMyLikeList(response.data.getLikeWaitList);
      } else {
        console.log('내가 찜한 웨이트메이트 목록이 비어 있습니다.');
      }
    } catch (err) {
      console.error('내가 찜한 웨이트메이트 목록 불러오는 중 오류 발생', err);
    }
  };

  // 내가 픽한 웨메 list
  const fetchPickedWaitMateList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/wmReservation/wmList`, {
        params: { id: id },
      });
      if (response.data) {
        console.log('내가 픽한 웨메 리스트:', response.data);
        setPickedWaitMateList(response.data.waitMateList);
      } else {
        console.log('내가 픽한 웨메 리스트가 비어 있습니다.');
      }
    } catch (err) {
      console.error('내가 픽한 웨메 리스트 불러오는 중 오류 발생', err);
    }
  };

  // My WaitMate - 내가 작성한 웨이트메이트 list
  const myWaitMateNotes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/waitMate/myWaitMate`, {
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
      setMyWaitMateList(response.data.myWaitMates);
    } catch (err) {
      console.error('웨이트메이트 목록 불러오는 중 오류 발생', err);
    }
  };

  // 거래완료 list
  const fetchCompletedWaitMateList = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/waitMate/completedMyWaitMateList`,
        {
          params: { id: id },
        }
      );
      if (response.data) {
        console.log('거래 완료 목록:', response.data);
        setCompletedWaitMateList(response.data.completedMyWaitMateList);
      } else {
        console.log('거래 완료 목록이 비어 있습니다.');
      }
    } catch (err) {
      console.error('거래 완료 목록 불러오는 중 오류 발생', err);
    }
  };

  // 내가 픽한 프록시 list
  const fetchPickedProxyList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/wmReservation/proxyList`, {
        params: { id: id },
      });
      if (response.data) {
        console.log('내가 픽한 웨메 리스트:', response.data);
        setPickedProxyList(response.data.proxyList);
      } else {
        console.log('내가 픽한 웨메 리스트가 비어 있습니다.');
      }
    } catch (err) {
      console.error('내가 픽한 웨메 리스트 불러오는 중 오류 발생', err);
    }
  };

  useEffect(() => {
    switch (selectItem.type) {
      case 'myResume':
        proxyNotes();
        break;
      case 'myLikeList':
        fetchLikedWaitMateList();
        break;
      case 'pickedWaitMateList':
        fetchPickedWaitMateList();
        break;
      case 'myWaitMateList':
        myWaitMateNotes();
        break;
      case 'completedWaitMateList':
        fetchCompletedWaitMateList();
        break;
      case 'pickedProxyList':
        fetchPickedProxyList();
        break;
      default:
      // 기본값 혹은 아무 것도 하지 않음
    }
  }, [selectItem]); // 의존성 배열에 selectItem 추가

  return (
    <div
      className={`w-full h-screen text-primary_dark font-Line m-1 p-1 flex flex-col items-center`}
    >
      <h1
        className={`${isSmallScreen ? 'text-[20px]' : 'text-[30px] mt-3 p-4'}`}
      >
        My page
      </h1>
      {isReviewOpen && (
        <StarRating
          id={reviewId}
          nickname={reviewNickname}
          transactionCompleted={true}
        />
      )}
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
                  onClick={() => setSelectItem({ type: 'myResume', id: null })}
                  className="border-primary border-2 rounded-lg"
                >
                  나의 이력서
                </button>
                <button
                  className="border-primary border-2 rounded-lg"
                  onClick={() =>
                    setSelectItem({ type: 'myLikeList', id: null })
                  }
                >
                  내가 찜한 웨이트메이트 list
                </button>
                <button
                  className="border-primary border-2 rounded-lg"
                  onClick={() =>
                    setSelectItem({ type: 'pickedWaitMateList', id: null })
                  }
                >
                  내가 픽한 웨메 list
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
                  onClick={() =>
                    setSelectItem({ type: 'myWaitMateList', id: null })
                  }
                >
                  나의 웨이트메이트 목록
                </button>
                <button
                  className="border-primary border-2 rounded-lg"
                  onClick={() =>
                    setSelectItem({ type: 'completedWaitMateList', id: null })
                  }
                >
                  거래 완료 list
                </button>
                <button
                  className="border-primary border-2 rounded-lg"
                  onClick={() =>
                    setSelectItem({ type: 'pickedProxyList', id: null })
                  }
                >
                  내가 픽한 프록시 list
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-4/5 border-2 border-primary_dark rounded-lg">
            {selectItem.type === 'myResume' &&
            myResume &&
            myResume.length > 0 ? (
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
                    </div>
                  </li>
                ))}
              </ul>
            ) : selectItem.type === 'myLikeList' &&
              myLikeList &&
              myLikeList.length > 0 ? (
              <ul>
                {myLikeList.map((item, index) => (
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
                      <p>title: {item.title}</p>
                      <p>주소: {item.wmAddress}</p>
                      <p>시급: {item.pay}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : selectItem.type === 'myWaitMateList' &&
              myWaitMateList &&
              myWaitMateList.length > 0 ? (
              <ul>
                {myWaitMateList.map((item, index) => (
                  <li
                    key={index}
                    className="mb-4 p-4 border-2 border-gray-300 rounded-md flex"
                  >
                    <div className="w-1/4">
                      <img
                        src={item.photo}
                        alt="WaitMate"
                        className="w-full h-auto rounded-md"
                      />
                    </div>
                    <div className="w-3/4 ml-4">
                      <Link to={`/waitMate/update/${item.id}`}>
                        <p>{item.title}</p>
                        <p>웨이팅할 곳: {item.wmDetailAddress}</p>
                        <p>부탁하는 말: {item.description}</p>
                      </Link>
                      <button
                        onClick={() =>
                          navigate(`/waitMate/update/${item.wmId}`)
                        }
                        className="bg-primary text-white px-3 py-1 rounded-lg mt-2"
                      >
                        수정
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : selectItem.type === 'completedWaitMateList' &&
              completedWaitMateList &&
              completedWaitMateList.length > 0 ? (
              <ul>
                {completedWaitMateList.map((completed, index) => (
                  <li
                    key={index}
                    className="mb-4 p-4 border-2 border-gray-300 rounded-md flex"
                  >
                    <div className="w-1/4">
                      <img
                        src={completed.photo}
                        alt="Proxy"
                        className="w-full h-auto rounded-md"
                      />
                    </div>
                    <div className="w-3/4 ml-4">
                      <p>title: {completed.title}</p>
                      <p>주소: {completed.wmAddress}</p>
                      <p>시작시간: {completed.startTime}</p>
                      <p>종료시간: {completed.endTime}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : selectItem.type === 'pickedWaitMateList' &&
              pickedWaitMateList &&
              pickedWaitMateList.length > 0 ? (
              <ul>
                {pickedWaitMateList.map((picked, index) => (
                  <li
                    key={index}
                    className="mb-4 p-4 border-2 border-gray-300 rounded-md flex"
                  >
                    <div className="w-1/4">
                      <img
                        src={picked.photo}
                        alt="Proxy"
                        className="w-full h-auto rounded-md"
                      />
                    </div>
                    <div className="w-3/4 ml-4">
                      <p>title: {picked.title}</p>
                      <p>주소: {picked.wmAddress}</p>
                      <p>시작시간: {picked.startTime}</p>
                      <p>종료시간: {picked.endTime}</p>
                      <p>시급: {picked.pay}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : selectItem.type === 'pickedProxyList' &&
              pickedProxyList &&
              pickedProxyList.length > 0 ? (
              <ul>
                {pickedProxyList.map((picked, index) => (
                  <li
                    key={index}
                    className="mb-4 p-4 border-2 border-gray-300 rounded-md flex"
                  >
                    <div className="w-1/4">
                      <img
                        src={picked.photo}
                        alt="Proxy"
                        className="w-full h-auto rounded-md"
                      />
                    </div>
                    <div className="w-3/4 ml-4">
                      <p>title: {picked.title}</p>
                      <p>나이: {picked.age}대</p>
                      <p>프록시 주소: {picked.proxyAddress}</p>
                      <p>성별: {picked.gender}</p>
                      <p>프록시 한 마디!: {picked.proxyMsg}</p>
                    </div>
                    <button
                      onClick={() => {
                        testing(picked.id);
                      }}
                      className="border-primary border-2 rounded-lg w-1/12 text-lg"
                    >
                      평점주기
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>List가 없습니다!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
