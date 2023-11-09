import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../../socket';
import useUserStore from '../../store/useUserStore';
import ChatListModal from '../Chat/ChatListModal';

export default function ProxyDetail() {
  const { proxyId } = useParams();
  const [proxy, setProxy] = useState({});
  const [roomNumber, setRoomNumber] = useState(null);
  const { id } = useUserStore();
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };
  useEffect(() => {
    if (selectedUser) {
      startChat();
    }
  }, [selectedUser]);
  const startChat = () => {
    setIsModalOpen(true);
    handleUserSelect(selectedUser);
    const usedRoomNumbers = [];
    if (!id) {
      alert('로그인 먼저 진행하시기 바랍니다');
      return;
    }
    if (id === proxy.id) {
      console.log(id, proxy.id);
      alert('둘의 정보값이 같아서 채팅 창을 만들 수 없습니다');
      return;
    }
    socket.on('roomExists', (data) => {
      console.log(`이미 존재하는 방 번호: ${data.roomNumber}`);
      alert('이미 존재하는 채팅방이 있습니다');
      navigate(`/proxy/detail/chat/${data.roomNumber}`);
    });
    if (selectedUser) {
      socket.emit('createRoom', {
        sender: parseInt(id),
        receiver: parseInt(proxy.id),
        proxyId: parseInt(proxy.proxyId),
        wmId: parseInt(selectedUser.wmId),
      });
      socket.on('roomCreated', (data) => {
        if (usedRoomNumbers.includes(data.roomNumber)) {
          console.log('이미 사용 중인 방 번호입니다.');
        } else {
          setRoomNumber(data.roomNumber);
          usedRoomNumbers.push(data.roomNumber);
          console.log('Room number:', data.roomNumber);
          navigate(`/proxy/detail/chat/${data.roomNumber}`);
        }
      });
    }
  };
  useEffect(() => {
    fetch(`http://localhost:8080/proxy/detail/${proxyId}`, {
      withCredentials: true,
    })
      .then((response) => response.json())
      .then((data) => {
        setProxy(data.result);
      })
      .catch((error) => {
        console.error('데이터 가져오는 중 오류 발생!', error);
      });
  }, [proxyId]);
  return (
    <>
      {isModalOpen && (
        <ChatListModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onUserSelect={handleUserSelect}
        />
      )}
      <p
        className={`${
          isSmallScreen ? 'mt-4 text-[18px]' : 'mt-10 text-[20px]'
        } text-primary_dark font-Line`}
      >
        프록시의 디테일한 자기소개 페이지입니다!
      </p>
      <div
        className={`${isSmallScreen ? 'flex flex-col' : 'flex'} h-4/5 w-full`}
      >
        <div
          className={`${
            isSmallScreen ? 'flex flex-col' : 'flex'
          } w-full h-3/5 bg-white shadow-lg`}
        >
          <div
            className={`${
              isSmallScreen ? 'h-1/3 w-full' : 'h-full w-1/3'
            } bg-primary flex flex-col justify-center items-center`}
          >
            <div className="w-full p-3 flex justify-center">
              <img
                className={`${isSmallScreen ? 'w-3/5 h-2/5' : 'w-full'}`}
                src="/images/whiteWaitMate.png"
              ></img>
            </div>
            <img
              src={'/images/me.jpg'}
              alt="Proxy Photo"
              className={`${
                isSmallScreen ? 'w-4/5 h-1/3 mt-4 mb-2' : 'w-4/5 h-1/3'
              } border border-background rounded-lg`}
            />
            <button
              className={`${
                isSmallScreen ? 'mb-2' : 'mt-4'
              } shadow-lg bg-background text-green font-Line p-3 rounded-sm`}
              onClick={startChat}
            >
              Chat with Proxy
            </button>
          </div>
          <div
            className={`${
              isSmallScreen ? 'w-full' : 'w-2/3'
            } flex flex-col h-full`}
          >
            <div className="h-1/4 w-full flex justify-around ">
              <div
                className={`${
                  isSmallScreen ? 'mt-8' : 'mt-8'
                } w-4/5 h-full flex flex-col justify-end`}
              >
                <span className="text-primary ml-3 text-lg font-gmarket font-bold w-full">
                  Title:
                  <br
                    style={{ display: isSmallScreen ? 'block' : 'none' }}
                  />{' '}
                  <span>{proxy.title}</span>
                </span>
                <br />
                <span className="text-primary_light ml-3 font-Line text-md">
                  proxy ID: {proxy.proxyId}
                </span>
                <br />
              </div>
              <div
                className="w-6 h-full flex align-end bg-primary rounded-b-lg font-Line text-xs text-background p-1"
                style={{
                  writingMode: 'vertical-rl',
                  display: isSmallScreen ? 'none' : 'block',
                }}
              >
                proxy's resume
              </div>
            </div>
            <div className="w-full h-2/3 p-10">
              <div className="font-Line bg-primary w-1/2 flex justify-center items-center rounded-t-lg">
                <span
                  className={`${
                    isSmallScreen ? 'text-[15px]' : ''
                  } text-background p-2`}
                >
                  Age/ Gender
                </span>
              </div>
              <div className="flex justify-center w-full p-4 items-center border-2 boder-gray-200">
                <span className="text-gray-700 font-Line text-md">
                  {proxy.age}대/ {proxy.gender}
                </span>
              </div>
              <br />
              <div className="font-Line bg-primary w-1/2 flex justify-center items-center rounded-t-lg">
                <span
                  className={`${
                    isSmallScreen ? 'text-[15px]' : ''
                  } text-background p-2`}
                >
                  Address
                </span>
              </div>
              <div className="flex justify-center w-full p-4 items-center border-2 boder-gray-200">
                <span className="text-gray-700 font-Line text-md">
                  {proxy.proxyAddress}
                </span>
              </div>
              <br />
              <div className="font-Line bg-primary w-1/2 flex justify-center items-center rounded-t-lg">
                <span
                  className={`${
                    isSmallScreen ? 'text-[15px]' : ''
                  } text-background p-2`}
                >
                  Introduce
                </span>
              </div>
              <div className="flex justify-center w-full p-4 items-center border-2 border-gray-200">
                <span className="text-gray-700 font-Line text-md break-all">
                  {proxy.proxyMsg}
                </span>
              </div>
            </div>
            {/* <button onClick={handleEditClick}>수정하기</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
