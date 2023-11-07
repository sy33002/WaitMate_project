import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../../socket';
import useUserStore from '../../store/useUserStore';


export default function ProxyDetail() {
  const { proxyId } = useParams();
  const [proxy, setProxy] = useState({});
  const [roomNumber, setRoomNumber] = useState(null);
  const {id} = useUserStore();
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

  const handleEditClick = () => {
    navigate(`/proxy/update/${proxyId}`);
  };

  const startChat = () => {
    const usedRoomNumbers = [];
    if (!id) {
      alert('로그인 먼저 진행하시기 바랍니다');
      return;
    }
    
    if(id === proxy.id){
      console.log(id, proxy.id);
      alert('둘의 정보값이 같아서 채팅 창을 만들 수 없습니다');
      return;
    }

    socket.on('roomExists', (data) => {
      console.log(`이미 존재하는 방 번호: ${data.roomNumber}`);
      alert('이미 존재하는 채팅방이 있습니다');
      navigate(`/proxy/detail/chat/${data.roomNumber}`);
    });
    
    socket.emit('createRoom', {
      sender: parseInt(id),
      receiver: parseInt(proxy.id),
      proxyId: parseInt(proxy.proxyId),
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
  };

  useEffect(() => {

    fetch(`http://localhost:8080/proxy/detail/${proxyId}`)
    .then(response => response.json())
    .then(data => {
      setProxy(data.result);
      console.log(data.result);
    })
    .catch(error => {
      console.error('데이터 가져오는 중 오류 발생!', error);
    });
  }, [proxyId]);

  return (
    <>
    <p className={`${isSmallScreen ? 'mt-4' : 'mt-10'} font-Line text-xs`}>프록시의 디테일한 자기소개 페이지입니다!</p>
    <div className={`${isSmallScreen ? 'flex flex-col' : 'flex'} h-full w-full justify-center`}>
      <div className={`${isSmallScreen ? 'w-full' : 'w-4/5' } h-3/5 bg-white flex shadow-lg`}>
        <div className={`${isSmallScreen ? 'w-full h-full' : 'w-4/5 h-1/3' } bg-primary w-1/3 h-full flex flex-col justify-center items-center`}>
          <img src={'/images/me.jpg'} alt="Proxy Photo" className={`'${isSmallScreen ? 'w-full h-full' : 'w-4/5 h-1/3' } border border-background rounded-lg'`}/><br />
          <button className="bg-background text-green font-Line p-3 rounded-sm" onClick={startChat}>
            Chat with Proxy
          </button>
        </div>
        <div className="flex flex-col h-full w-2/3">
          <div className="h-1/3 w-full flex justify-around">
            <div className="w-3/5 h-full flex flex-col  justify-end">
              <img src='/images/proxy.png' className='w-full'></img><br />
              <span className="text-primary text-lg font-gmarket font-bold">Title: {proxy.title}</span><br />
              <span className="text-primary_light font-Line text-md">proxy ID: {proxy.proxyId}</span><br />
            </div>
            <div className="w-6 h-full flex align-end bg-primary rounded-b-lg font-Line text-xs text-background p-1" style={{ writingMode: 'vertical-rl' }}>proxy's resume</div>
          </div>
          <div className="w-full h-2/3 p-10">
            <div className="font-Line bg-primary w-1/3 flex justify-center items-center rounded-t-lg">
              <span className="text-background p-2">Age/ Gender</span>
            </div><br />
            <div className="flex justify-center items-center">
              <span className='text-gray-700 font-Line text-md'>{proxy.age}대/  {proxy.gender}</span>
            </div>
            <br />
            <div className="font-Line bg-primary w-1/3 flex justify-center items-center rounded-t-lg">
              <span className="text-background p-2">Address</span>
            </div><br />
            <div className="flex justify-center items-center">
              <span className='text-gray-700 font-Line text-md'>{proxy.proxyAddress}</span>
            </div>
            <br />
            <div className="font-Line bg-primary w-1/3 flex justify-center items-center rounded-t-lg">
              <span className="text-background p-2">Introduce</span>
            </div><br />
            <div className="flex justify-center items-center">
              <span className='text-gray-700 font-Line text-md'>{proxy.proxyMsg}</span>
            </div>
          </div>
          <button onClick={handleEditClick}>수정하기</button>
        </div>
      </div>
    </div>
    </>
  );
}
