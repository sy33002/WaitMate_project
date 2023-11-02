import React, { useState, useEffect} from 'react';
import { MessageBox, Input, Button } from 'react-chat-elements';
import './chat.scss';
import {socket} from '../../componen';
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
          placeholder="Start chatting..."
          multiline={true}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rightButtons={
            <Button
              className="input_send_btn"
              color="purple"
              backgroundColor="white"
              text="Send"
              onClick={sendMessage}
            />
          }
          leftButtons={
            <Button
              className="input_file_btn"
              text=" "
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