import React, { useState, useEffect} from 'react';
import { MessageBox, Input, Button } from 'react-chat-elements';
import './chat.scss';
import {socket} from '../../socket';
// import sendButtonImage from './images/chatting_send_btn.png';
export default function Chat() {
 

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState(''); 
  const [receiver, setReceiver] = useState('');
  const inputReferance = React.createRef();

  

  const sendMessage = () => {
    const messageData = {
      room: 'your-room-id',
      sender: sender,
      receiver: receiver,
      messageType: 'text',
      messageContent: inputValue,
    };
     // 서버로 메시지를 전송합니다.
     socket.emit('message', messageData);

    if (inputValue.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString();
      console.log(currentTime);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          avatar: '/images/me.jpg',
          message: inputValue,
          sender: sender,
          receiver : receiver,
          time: currentTime,
        },
      ]);
      setInputValue('');
      inputReferance.current.value = '';
    }
  };

  useEffect(() => {
    socket.on('smessage', (messageData) => {
      const currentTime = new Date().toLocaleTimeString();
      const newMessage = {
        avatar: '/images/me.jpg',
        message: messageData.messageContent,
        sender: messageData.sender,
        receiver : messageData.receiver,
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
      <div className="user-input">
        <input
          type="text"
          placeholder="Enter your user ID"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
      <button>거래중</button> {/* 상태값 : 거래중, 예약중, 거래완료 추가 */}
      <div className="message_container">
        <MessageBox
          className="avatar2"
          type={'text'}
          text={'사용자2의 메세지 입니다'}
          reply={{
            photoURL: '/images/me.jpg',
            title: 'user2',
            titleColor: 'red',
          }}
          notch={false}
        />
      </div>
      <div className="message_container">
          {messages.map((msg, index) => (
            <MessageBox
            key={index}
            className={msg.sender === sender ? 'me' : 'other'}
            avatar={msg.avatar}
            size="xsmall"
            type="text"
            title={`${msg.sender} - ${msg.time}`}
            text={msg.message}
            notch={false}
          >
          </MessageBox>
          ))}
          
        </div>
      <div className="input_container">
        <Input
          className="input_item"
          referance={inputReferance}
          placeholder="Message..."
          multiline={true}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rightButtons={
            <Button
              // src={sendButtonImage}
              className="input_send_btn"
              color="purple"
              backgroundColor="white"
              onClick={sendMessage}
            />
          }
          leftButtons={
            <Button
              text=" 📎 "
              className="input_file_btn"
              backgroundColor="white"
              onClick={() => document.getElementById('fileInput').click()}
            />
          }
        />
      </div>
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
