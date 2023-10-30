import React, { useState, useRef } from 'react';
import { MessageBox, Input, Button } from 'react-chat-elements';
import './chat.scss';

export default function Chat() {
  const [inputValue, setInputValue] = useState('');
  const inputReference = useRef(null);
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    console.log('sendMessage function called');

    if (inputValue.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString();
      console.log(currentTime);
      setMessages((prevMessages) => [
          ...prevMessages,
          {
              avatar: '/images/me.jpg',
              message: inputValue,
              title: 'user1',
              time: currentTime,
            },
        ]);
        setInputValue('');
    }

    console.log('Updated inputValue:', setInputValue);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 파일 처리 로직. 예: 서버로 전송
      console.log(file);
    }
  };
  return (
    <div className="container">
      <div className="message_container">
        <MessageBox
          className="avatar2"
          type={'text'}
          text={'사용자2의 메세지 입니다'}
          reply={{
            photoURL: '/images/me.jpg',
            title: 'user2',
            titleColor: 'red',
            position: 'right',
          }}
          notch={false}
        />
        {messages.map((msg, index) => (
          <MessageBox
            key={index}
            className="avatar1"
            avatar={msg.avatar}
            size="xsmall"
            avatarFlexible={true}
            position="right"
            type={'text'}
            title={msg.title}
            text={`${msg.time}  ${msg.message} `}
            notch={false}
          />
        ))}
        <Input
          className="input"
          ref={inputReference}
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
              text=" 📎 "
              backgroundColor="white"
              onClick={() => document.getElementById('fileInput').click()}
            />
          }
        />

        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

//title : 사용자 이름
//titleColor : 사용자 이름 색깔
