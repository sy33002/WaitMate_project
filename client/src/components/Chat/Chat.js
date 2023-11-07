import React, { useState, useEffect } from 'react';
import { MessageBox, Input, Button } from 'react-chat-elements';
import './chat.scss';
import { socket } from '../../socket';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import axios from 'axios';

export default function Chat() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [proxy, setProxy] = useState('');
  const [error, setError] = useState(null);
  const { id } = useUserStore();
  const Navigate = useNavigate();
  const inputReferance = React.createRef();
  const { roomNumber } = useParams();
  console.log('아이디값' + id);

  const [loading, setLoading] = useState(true);

  // 데이터 로딩을 처리하는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          console.log('아이디값' + id);
          alert('로그인 먼저 진행하시기 바랍니다');
          return;
        }

        // 데이터 로딩 및 소켓 연결
        const response = await axios({
          url: `http://localhost:8080/proxy/chat/${roomNumber}`,
          method: 'GET',
        });
        console.log(response.data.list);
        console.log(response.data);
        setMessages(response.data.list);

        socket.emit('getRoomInfo', roomNumber);


      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [roomNumber, id]);

  // id 값이 업데이트될 때 소켓 이벤트 처리
  useEffect(() => {
    if (id) {
      socket.emit('getRoomInfo', roomNumber);
      socket.on('roomInfo', (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          if (data.sender.id !== id && data.receiver.id !== id) {
            console.log('d' + data.sender.id);
            console.log('a' + data.receiver.id);
            console.log('b' + id);
            alert('잘못된 사용자입니다. 다른 사용자 정보로 접근할 수 없습니다.');
            Navigate(-1);
          } else {
            if (data.sender.id === id) {
              setSender(data.sender);
              setReceiver(data.receiver);
              setLoading(false);
            } else if (data.receiver.id === id) {
              setSender(data.receiver);
              setProxy(data.proxyData.photo);
              setReceiver(data.sender);
              setLoading(false);
            }
            console.log(data.sender);
            console.log(data.receiver);
          }
        }
      });
    }
  }, [id, Navigate]);
  

  const sendMessage = () => {
    const messageData = {
      roomNumber: roomNumber,
      sender: sender.userId,
      receiver: receiver.userId,
      messageType: 'text',
      messageContent: inputValue,
    };
    // 서버로 메시지를 전송합니다.
    socket.emit('message', messageData);
    if (inputValue.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString([], {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });

      console.log(currentTime);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          photo: proxy,
          message: inputValue,
          sender: sender.userId,
          receiver: receiver.userId,
          time: currentTime,
        },
      ]);
      setInputValue('');
      inputReferance.current.value = '';
    }
  };
  useEffect(() => {
    socket.on('smessage', (messageData) => {
      const currentTime = new Date().toLocaleTimeString([], {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });

      const newMessage = {
        photo: messageData.photo,
        message: messageData.messageContent,
        sender: messageData.sender,
        receiver: messageData.receiver,
        time: currentTime,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off('smessage');
    };
  }, [sender]);
  
  return (
    <div className="container">
      {!id ? ( // id 값이 없는 경우 (로딩 중 또는 로그인되지 않은 경우)
        <div>로딩 중...</div>
      ) : (
        <div>
          <div className="user-input">
            <input
              type="text"
              placeholder="Enter your user ID"
              value={sender.userId}
              onChange={(e) => setSender(e.target.value)}
            />
          </div>
          {loading ? ( // 데이터 로딩 중인 경우
            <div>로딩 중...</div>
          ) : (
            // 데이터 로딩이 완료된 경우
            <div>
              {/* 채팅 내용 표시 */}
              <div className="message_container">
                {messages.map((msg, index) => (
                  <MessageBox
                    key={index}
                    className={msg.sender === sender ? 'me' : 'other'}
                    photo={msg.sender !== sender ? msg.photo : null}
                    size="xsmall"
                    type={msg.messageType}
                    text={msg.messageContent}
                    title={`${msg.sender} ${msg.createdAt}`}
                    notch={false}
                  ></MessageBox>
                ))}
              </div>
              {/* 채팅 입력 */}
              <div className="input_container">
                <Input
                  className="input_item"
                  referance={inputReferance}
                  multiline={true}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  rightButtons={
                    <Button
                      className="input_send_btn"
                      backgroundColor="transparent"
                      onClick={sendMessage} // sendMessage 함수 호출
                    />
                  }
                  leftButtons={
                    <Button
                      className="input_file_btn"
                      backgroundColor="transparent"
                      onClick={() => document.getElementById('fileInput').click()}
                    />
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
//기능 설명
// 각각의 아바타들이 가지는 속성들
// - 프로필 사진
// - 프로필 이름
// - 메세지 발송 시간
// - 메세지
// 인풋으로 넣을수 있는것
// - 파일 첨부
