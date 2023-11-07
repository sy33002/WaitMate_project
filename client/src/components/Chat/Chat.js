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
  const [loading, setLoading] = useState(true);
  // 데이터 로딩을 처리하는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 데이터 로딩 및 소켓 연결
        const response = await axios({
          url: `http://localhost:8080/proxy/chat/${roomNumber}`,
          method: 'GET',
        });
        setMessages(response.data.list);
        console.log(response.data.list);
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
              console.log('안녕' + data.proxyData.photo);
            } else if (data.receiver.id === id) {
              setSender(data.receiver);
              setProxy(data.proxyData.photo);
              setReceiver(data.sender);
              setLoading(false);
              console.log('안녕' + data.proxyData.photo);
            }
          }
        }
      });
    }
  }, [id, Navigate]);
  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString([], {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
      // 서버로 메시지를 전송합니다.
      const messageData = {
        roomNumber: roomNumber,
        sender: sender.userId,
        receiver: receiver.userId,
        messageType: 'text',
        messageContent: inputValue,
      };
      socket.emit('message', messageData);
      // 메시지를 먼저 뷰에 표시
      const newMessage = {
        messageContent: inputValue,
        sender: sender.userId,
        receiver: receiver.userId,
        time: currentTime,
      };
      console.log('안정값', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      // 입력값 초기화
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
      console.log('뭐가 찍히나요', messageData);
      const newMessage = {
        photo: proxy || null,
        messageContent: messageData.messageContent || '',
        sender: messageData.receiver || '',
        receiver: messageData.sender || '',
        time: currentTime,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  return () => {
    socket.off('smessage');
  };
}, []);
  return (
    <div className="container">
      {!id ? (
        <div>로그인을 먼저 해주시기 바랍니다...</div>
      ) : (
        <div>
          {loading ? (
            <div>로딩 중...</div>
          ) : (
            <div>
              <p>현재 회원님의 아이디는 {sender.userId}입니다</p>
              <div className="message_container">
                {messages.map((msg, index) => (
                  <MessageBox
                    key={index}
                    className={msg.sender === sender.userId ? 'me' : 'other'}
                    photo={msg.receiver !== receiver.userId ? (proxy  || null) : null}
                    type={msg.messageType}
                    text={msg.messageContent}
                    title={`${msg.sender} ${msg.createdAt}`}
                    notch={false}
                  ></MessageBox>
                ))}
              </div>
              <div className="input_container">
                <Input
                  className="input_item"
                  referance={inputReferance}
                  multiline={true}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                  rightButtons={
                    <Button
                      className="input_send_btn"
                      backgroundColor="transparent"
                      onClick={sendMessage}
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