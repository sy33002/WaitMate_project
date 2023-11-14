import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';

function ChatList() {
  const [chats, setChats] = useState([]);
  const { id } = useUserStore();
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
    <div className=" mb-10 sm:mt-5 md:mt-10 sm:ml-5 sm:mr-5 md:ml-10 md:mr-10 lg:ml-20 lg:mr-20 ">
      <div className="flex justify-center mb-5">
        <h1 className="text-primary text-xl sm:text-2xl md:text-3xl  font-gmarket">
          My Chat List
        </h1>
      </div>
      <div className="w-full sm:w-11/12 md:w-full sm:h-64 md:h-96 overflow-y-auto p-5 rounded-lg bg-purple-100 border-primary border-2">
        <div className="overflow-y-auto ">
          {chats.map((chat) => (
            <Link
              to={`/proxy/detail/chat/${chat.roomNumber}`}
              key={chat.roomNumber}
            >
              <div className="mb-4 p-4 bg-white rounded-lg flex items-center border-4 border-primary sm:h-20 ">
                <img
                  src={
                    chat.photo ||
                    'https://sesac-projects.site/waitmate/images/someone.png'
                  }
                  alt={`${chat.nickname}의 프로필 사진`}
                  className="rounded-full w-10 h-10 sm:w-14 sm:h-14 mr-2 sm:mr-4 border-2 border-primary  "
                />
                <div className="chat-item flex-grow min-w-0">
                  <div className="flex flex-row items-center space-x-1 sm:space-x-2 ">
                    <div className="roomNumber font-Line text-xs sm:text-sm overflow-hidden whitespace-nowrap overflow-ellipsis ">
                      방번호 : {chat.roomNumber}
                    </div>
                    <div className="nickname font-Line text-xs sm:text-sm  whitespace-nowrap overflow-ellipsis ">
                      보낸사람 : {chat.sender}
                    </div>
                  </div>
                  <div className="message font-Line text-xs sm:text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {chat.messageContent}
                  </div>
                  <div className="time text-xs font-Line">
                    {' '}
                    {formatCreatedAt(chat.createdAt, 'ko-KR', 'Asia/Seoul')}
                  </div>
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
