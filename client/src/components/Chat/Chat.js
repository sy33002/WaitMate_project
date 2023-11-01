import React, { useState } from 'react';
import { MessageBox, Input, Button } from 'react-chat-elements';
import './chat.scss';
import sendButtonImage from './images/chatting_send_btn.png';
export default function Chat() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const inputReferance = React.createRef();

  console.log(inputValue);

  const sendMessage = () => {
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
      inputReferance.current.value = '';
    }
  };

  return (
    <div className="container">
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
          className="input_item"
          referance={inputReferance}
          placeholder="Message..."
          multiline={true}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rightButtons={
            <Button
              src={sendButtonImage}
              className="input_send_btn"
              color="purple"
              backgroundColor="white"
              
              onClick={sendMessage}
            />
          }
          leftButtons={
            <Button
              text=' 📎 '
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
