import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '../../store/useUserStore';

const fetchMoreChats = async (cursor) => {
  try {
    // 백엔드 API 호출로 수정합니다. 여기서 cursor는 페이지 번호나 다른 페이징 인자가 될 수 있습니다.
    const response = await axios.get(
      `http://localhost:8080/proxy/listChatting/chats?cursor=${cursor}`
    );
    return response.data; // 백엔드 응답 구조에 맞게 변경해야 할 수 있습니다.
  } catch (error) {
    console.error('Additional chats fetching failed:', error);
    throw error;
  }
};

function ChatList() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const { id } = useUserStore();
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    async function loadChatList() {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/proxy/listChatting`,
          { withCredentials: true }
        );
        const chatListData = response.data.list;
        console.log(response.data.list);
        if (Array.isArray(chatListData)) {
          setChats(chatListData);
        } else {
          const chatList = Object.values(chatListData);
          setChats(chatList);
        }
      } catch (error) {
        console.error('채팅 목록을 불러오는 중 문제가 발생했습니다:', error);
      }
      setLoading(false);
    }

    loadChatList();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  function handleObserver(entities) {
    const target = entities[0];
    if (target.isIntersecting && hasMore && !loading) {
      loadMoreChats();
    }
  }

  async function loadMoreChats() {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const response = await fetchMoreChats(cursor);
      const newChats = response.data;
      const nextCursor = response.nextCursor;

      setChats((prevChats) => [...prevChats, ...newChats]);
      setCursor(nextCursor);
      setHasMore(newChats.length > 0);
    } catch (error) {
      console.error('채팅을 불러오는 중 문제가 발생했습니다:', error);
    }
    setLoading(false);
  }

  return (
    <div className="ml-40 mr-40 mt-10 mb-10 background">
      <div className="flex justify-center mb-5">
        <h1 className="text-primary text-3xl">My Chat List</h1>
      </div>
      <div className="w-full h-96 overflow-y-auto p-5 rounded-lg bg-white border-primary border-2">
        <div className="overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader"></div>
              채팅 목록을 가져오는 중...
            </div>
          ) : (
            chats.map((chat) => (
              <Link to={`/chat/${chat.id}`} key={chat.id}>
                <div className="mb-4 p-4 background rounded-lg flex items-center border-4 border-primary">
                  <img
                    src={chat.profilePic || '/images/someone.png'}
                    alt={`${chat.nickname}의 프로필 사진`}
                    className="rounded-full w-14 h-14 mr-4 border-2 border-primary"
                  />
                  <div className="chat-item">
                    <div className="flex flex-row items-center">
                      <div className="nickname">{chat.nickname}</div>
                      <div className="time text-xs">{chat.time}</div>
                    </div>
                    <div className="message">{chat.message}</div>
                  </div>
                </div>
              </Link>
            ))
          )}
          <div ref={loader} />
        </div>
      </div>
    </div>
  );
}

export default ChatList;
