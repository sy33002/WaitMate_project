import React, { useState, useEffect, useRef } from 'react';
import { MessageBox, Input, Button } from 'react-chat-elements';
import './chat.scss';
import { getSocket } from '../../socket';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import axios from 'axios';
export default function Chat() {
  const socket = getSocket();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [proxy, setProxy] = useState('');
  const [wm, setWm] = useState('');
  const [userPayId, setUserPayId] = useState('');
  const [proxyPayId, setProxyPayId] = useState('');
  const [error, setError] = useState(null);
  const { id } = useUserStore();
  console.log(id);
  const Navigate = useNavigate();
  const inputReference = useRef();
  const { roomNumber } = useParams();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('거래중');
  const menuItems = ['예약중', '거래 완료', '거래중'];
  const apiUrl = process.env.REACT_APP_URL;
  const chatContainerRef = useRef();

  
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

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
              setUserPayId(data.sender.id);
              setReceiver(data.receiver);
              setProxy(data.proxyData.photo);
              setProxyPayId(data.proxyData.proxyId);

              setWm(data.wmData);
              console.log('wm', data.wmData);
              console.log('sender안녕' + data.proxyData.photo);
            } else if (data.receiver.id === id) {
              setSender(data.receiver);
              setProxy(data.proxyData);
              setWm(data.wmData);
              setReceiver(data.sender);

              console.log('wm', data.wmData);
              console.log('receiver안녕' + data.proxyData.photo);
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
        createdAt: currentTime,
      };
      socket.emit('message', messageData);

      // 메시지를 먼저 뷰에 표시
      const newMessage = {
        messageContent: inputValue,
        sender: sender.userId,
        messageType: 'text',
        receiver: receiver.userId,
        createdAt: currentTime,
      };
      console.log('안정값', newMessage);
      console.log('메세지값', inputValue);

      // setMessages((prevMessages) => [...prevMessages, newMessage]);

      setMessages([...messages, newMessage]);
      // 입력값 초기화
      setInputValue('');
      inputReference.current.value = '';
    } else {
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
        photo: messageData.photo || null,
        messageContent: messageData.messageContent || '',
        messageType: 'text',
        sender: messageData.sender || '',
        receiver: messageData.receiver || '',
        createdAt: currentTime,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log('receiver의 값', newMessage);
    });
    return () => {
      socket.off('smessage');
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  const parseDate = (dateString) => {
    return dateString.slice(11, 16);
  };
  useEffect(() => {
    if (selectedStatus === '예약중') {
      socket.emit('reserve', { wmId: wm.wmId, proxyId: proxyPayId });
    } else if (selectedStatus === '거래중') {
      socket.emit('deleteReservation', { wmId: wm.wmId });
    } else if (selectedStatus === '거래 완료') {
      socket.emit('completed', { wmId: wm.wmId, proxyId: proxyPayId });
    }
  }, [selectedStatus]);

  //결제 기능
  const PaymentsList = () => {
    console.log('페이먼츠', wm.id, proxyPayId);
    if (wm && proxy) {
      axios({
        url: `${apiUrl}/payment/kakao`,
        method: 'post',
        data: {
          wmId: wm.wmId,
          id: proxyPayId,
        },
      })
        .then((res) => {
          console.log(res.data);
          window.location.href = `${res.data.redirectUrl}`;
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error('wm나 proxy가 없습니다.');
    }
  };

  return (
    <div className="container">
      <div>
        <div className="initial-chat-container">
          <p class="chat_header">
            <button
              onClick={toggleMenu}
              className="font-extrabold text-primary py-2 px-1 sm:py-2 sm:px-1 md:py-2 md:px-2 text-xs sm:text-sm md:text-baserounded-full relative"
            >
              <div className="chat_header_status"> {selectedStatus} ▽</div>
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
              console.log('msg', msg);
              console.log('msg.receiver:', msg.receiver);
              console.log('receiver.userId:', receiver.userId);
              console.log('proxy:', msg.proxy);
              console.log(
                'photo:',
                msg.receiver === receiver.userId ? proxy.photo : null
              );
              return (
                <MessageBox
                  key={index}
                  className={msg.sender === sender.userId ? 'me' : 'other'}
                  avatar={msg.receiver === receiver.userId ? proxy.photo : null}
                  type={msg.messageType}
                  text={msg.messageContent}
                  title={`${msg.sender} ${msg.createdAt}`}
                  notch={false}
                ></MessageBox>
              );
            })}
            <div className="input_container">
              <Input
                className="input_item"
                referance={inputReference}
                multiline={true}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
                leftButtons={
                  id === userPayId && (
                  <Button
                    className="paymentButton"
                    text="결제"
                    onClick={PaymentsList}
                  />
                  )
                }
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
        </div>
      </div>
    </div>
  );
}
