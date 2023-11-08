import React, { useState, useEffect, useRef } from 'react';
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
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("거래중");
  const menuItems = ['예약중', '거래 완료', '거래중'];
  const apiUrl = process.env.REACT_APP_URL;
  
  // Create a reference for the container element that holds the chat messages
  const chatContainerRef = useRef();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  // Data loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Data loading and socket connection
        const response = await axios({
          url: `${apiUrl}/proxy/chat/${roomNumber}`,
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
            alert(
              '잘못된 사용자입니다. 다른 사용자 정보로 접근할 수 없습니다.'
            );
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
        messageType : 'text',
        receiver: receiver.userId,
        createdAt: currentTime,
      };
      console.log('안정값', newMessage);
      console.log('메세지값', inputValue);

      // setMessages((prevMessages) => [...prevMessages, newMessage]);
      
      setMessages([...messages, newMessage]);
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
        messageType: 'text',
        sender: messageData.sender || '',
        receiver: messageData.receiver || '',
        createdAt: currentTime,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off('smessage');
    };
  }, []);

  // Check if chatContainerRef is defined before attempting to scroll
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }

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
              <p class="chat_header">
                <button
                  onClick={toggleMenu}
                  className="font-extrabold text-primary py-2 px-1 sm:py-2 sm:px-1 md:py-2 md:px-2 text-xs sm:text-sm md:text-baserounded-full relative"
                >
                  <div className="chat_header_status">  {selectedStatus}     ▽</div>
                  {isMenuOpen && (
                    <div className="menu bg-gray-100 absolute right-0 top-full p-2 rounded-md shadow-md">
                      {menuItems.map((item, index) => (
                        <p
                          className="p-2"
                          key={index}
                          onClick={() => {
                            setSelectedStatus(item);
                            setMenuOpen(false);
                          }}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                </button>
                현재 회원님의 아이디는 {sender.userId}입니다
              </p>
              <div className="message_container" ref={chatContainerRef}>
                {messages.map((msg, index) => {
                  console.log('>>', msg)
                  return  (
                    // <div key={index} className={msg.sender === sender.userId ? 'me' : 'other'}>{`${msg.sender} ${msg.createdAt}`} === {msg.messageContent}</div>
                  <MessageBox
                    key={index}
                    className={msg.sender === sender.userId ? 'me' : 'other'}
                    photo={
                      msg.receiver !== receiver.userId ? proxy || null : null
                    }
                    type={msg.messageType}
                    text={msg.messageContent}
                    title={`${msg.sender} ${msg.createdAt}`}
                    notch={false}
                  ></MessageBox>
                )})}
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
