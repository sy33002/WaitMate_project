import React, { useState } from 'react';
import { MessageBox, Input, Button } from 'react-chat-elements';
import './chat.scss';

export default function Chat() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [clearFunction, setClearFunction] = useState(null); // 추가

  const handleButtonClick = () => {
    sendMessage();
    clearInput();
  };
  
  const clearInput = () => {
    if (clearFunction) {
      clearFunction();
    }
  };

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
      clearInput();
    }

    console.log('Updated inputValue:', setInputValue);
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
          }}
          notch={false}
        />
        {messages.map((msg, index) => (
          <MessageBox
            key={index}
            className="avatar1"
            avatar={'/images/me.jpg'}
            size="xsmall"
            type={'text'}
            title={msg.title}
            text={`${msg.time}  ${msg.message} `}
            notch={false}
          />
        ))}
      </div>
      <div className="input_container">
        <Input
          placeholder="Start chatting..."
          multiline={true}
          value={inputValue}
          rightButtons={
            <Button
              className="input_send_btn"
              color="purple"
              backgroundColor="white"
              text="Send"
              onClick={handleButtonClick}
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
          clear={(clear) => setClearFunction(clear)} // 수정
        />
      </div>
    </div>
  );
}
