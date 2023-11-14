import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';

function ChatList() {
  const [chats, setChats] = useState([]);
  const {id} = useUserStore();
  const apiUrl = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/proxy/listChatting2`, {
          params: { id },
        });
    
        const chatListData = response.data.list;
        let latestMessages = [];
    
        if (Array.isArray(chatListData)) {
          latestMessages = chatListData
            .map((chat) => chat.latestChat)
            .filter((latestChat) => latestChat !== null);
    
          console.log('아하', latestMessages);
          setChats(latestMessages);
        } else {
          const chatList = Object.values(chatListData);
    
          latestMessages = chatList
            .map((chat) => chat.latestChat)
            .filter((latestChat) => latestChat !== null);
    
          console.log('아하', latestMessages);
          setChats(latestMessages);
        }
      } catch (error) {
        console.error('채팅 목록을 불러오는 중 문제가 발생했습니다:', error);
      }
    };

    fetchChats();
  }, [apiUrl]);

  const formatCreatedAt = (createdAt, locale, timeZone) => {
    const date = new Date(createdAt);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
  
    const formattedDate = date.toLocaleString(locale, {
      ...options,
      timeZone: timeZone,
    });
    
    return formattedDate;
  };

  return (
    <div className="ml-20 mr-20 mt-10 mb-10 background">
      <div className="flex justify-center mb-5">
        <h1 className="text-primary text-3xl font-gmarket">My Chat List</h1>
      </div>
      <div className="w-full h-96 overflow-y-auto p-5 rounded-lg bg-white border-primary border-2">
        <div className="overflow-y-auto">
          {chats.map((chat) => (
            <Link to={`/proxy/detail/chat/${chat.roomNumber}`} key={chat.roomNumber}>
              <div className="mb-4 p-4 background rounded-lg flex items-center border-4 border-primary">
                <img
                  src={chat.photo || 'https://sesac-projects.site/waitmate/images/someone.png'}
                  alt={`${chat.nickname}의 프로필 사진`}
                  className="rounded-full w-14 h-14 mr-4 border-2 border-primary"
                />
                <div className="chat-item">
                  <div className="flex flex-row items-center">
                  <div className="roomNumber font-Line">방번호 : {chat.roomNumber}</div>
                    <div className="nickname font-Line">보낸사람 : {chat.sender}</div>
                   
                  </div>
                  <div className="message font-Line">{chat.messageContent}</div>
                  <div className="time text-xs font-Line"> {formatCreatedAt(chat.createdAt, 'ko-KR', 'Asia/Seoul')}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


export default ChatList;