import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../../socket';
import useUserStore from '../../store/useUserStore';


export default function ProxyDetail() {
  const { proxyId } = useParams();
  const [proxy, setProxy] = useState({});
  const [roomNumber, setRoomNumber] = useState(null);
  const {id} = useUserStore();
  console.log('아이디값' + id);
  const navigate = useNavigate();
  
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

    fetch(`http://localhost:8080/proxy/detail/${proxyId}`, { withCredentials: true })
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
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-4/5 w-4/5 bg-white flex">
        <div className="bg-primary w-1/3 h-full flex flex-col justify-center items-center">
          <img src={proxy.photo} alt="Proxy Photo" />
          {/* {imageFile && <img src={imageFile} alt="Preview"  */}
          {/* className="max-w-full max-h-40" />} */}
          <button className="bg-background text-primary mb-2" onClick={startChat}>
            프록시와 채팅하기
          </button>
          <button className="bg-background text-primary mb-2">
            프록시 픽하기
          </button>
        </div>
        <div className="flex flex-col h-full w-2/3">
          <div className="h-1/3 w-full flex justify-around">
            <div className="w-3/5 h-full flex flex-col  justify-center">
              <span className="text-primary text-lg">Title: {proxy.title}</span>
              <br />
              <span className="text-primary">proxy ID: {proxy.proxyId}</span>
            </div>
            <div className="w-10 h-full bg-primary"></div>
          </div>
          <div className="w-full h-2/3 p-10">
            <div className="bg-primary w-1/3 flex justify-center items-center">
              <span className="text-background">Age/ Gender</span>
            </div>
            <div className="flex justify-center items-center">
              <span>{proxy.age}/{proxy.gender}</span>
            </div>
            <br />
            <div className="bg-primary w-1/3 flex justify-center items-center">
              <span className="text-background">Address</span>
            </div>
            <div className="flex justify-center items-center">
              <span>{proxy.proxyAddress}</span>
            </div>
            <br />
            <div className="bg-primary w-1/3 flex justify-center items-center">
              <span className="text-background">Introduce</span>
            </div>
            <div className="flex justify-center items-center">
              <span>{proxy.proxyMsg}</span>
            </div>
          <button onClick={handleEditClick}>수정하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
