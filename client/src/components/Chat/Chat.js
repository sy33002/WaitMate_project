import React, { useState, useEffect } from 'react';
import { MessageBox, Input, Button } from 'react-chat-elements';
import './chat.scss';
import { socket } from '../../socket';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';

export default function Chat() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [proxy, setProxy] = useState('');
  const [error, setError] = useState(null);
  const {id} = useUserStore();
  const Navigate = useNavigate();
  const inputReferance = React.createRef();
  const { roomNumber } = useParams();
  
  useEffect(() => {
    socket.emit('getRoomInfo', roomNumber);
    if(!id){
      alert('로그인 먼저 진행하시기 바랍니다');
      
    }
   
    socket.on('roomInfo', (data) => {
      if (data.error) {
        setError(data.error);
      } else {
        if (data.sender.id !== id && data.receiver.id !== id) {
          alert('잘못된 사용자입니다. 다른 사용자 정보로 접근할 수 없습니다.');
          Navigate(-1);
        } else {
          if (data.sender.id === id) {
              setSender(data.sender);
              setReceiver(data.receiver);
              
            } else if (data.receiver.id === id) {
              setSender(data.receiver);
              setProxy(data.proxy.photo);
              setReceiver(data.sender);
            }
            console.log(data.sender);
            console.log(data.receiver);
        }
      }
    });

    
    return () => {
      socket.off('roomInfo');
    };
  }, []);
  
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
      <div className="user-input">
        <input
          type="text"
          placeholder="Enter your user ID"
          value={sender.userId}
          onChange={(e) => setSender(e.target.value)}
        />
      </div>
      <div className="message_container">
        {messages.map((msg, index) => (
          <MessageBox
            key={index}
            className={msg.sender === sender ? 'me' : 'other'}
            photo={
              msg.sender !== sender &&
              (index === 0 || messages[index - 1].sender !== msg.sender)
                ? msg.photo
                : null
            }
            size="xsmall"
            type="text"
            text={msg.message}
            title={index === 0 ? `${msg.sender}  ${msg.time}` : msg.time}
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
          rightButtons={
            <Button
              className="input_send_btn"
              backgroundColor="transparent"
              onClick={sendMessage}
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
