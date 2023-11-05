import React, { useRef, useEffect, useState } from 'react';

const fetchMoreChats = (cursor) => {
  // 이 부분은 실제 API 호출 로직을 대체합니다
  return new Promise((resolve) => {
    setTimeout(() => {
      const newChats = [
        // 새로운 채팅 데이터를 추가
        // cursor 값에 따라 분기하여 다른 데이터를 반환
      ];
      resolve({ data: newChats, nextCursor: cursor + newChats.length });
    }, 1500);
  });
};

function ChatList({ id, nickname, photo, userId }) {
  const [chats, setChats] = useState([
    {
      id: 'chat-0',
      nickname: '홍길동',
      time: '13:00+9',
      message: '안녕하세요, 채팅리스트에 오신 것을 환영합니다!',
      profilePic: '/images/someone.png',
    },
    {
      id: 'chat-1',
      nickname: '카일',
      time: '13:00+9',
      message: '웨메 신청 ...',
    },
    {
      id: 'chat-2',
      nickname: '꿍치',
      time: '14:33+9',
      message: '프록시 가능하세요?',
      profilePic: '/images/waitmate.png',
    },
    {
      id: 'chat-3',
      nickname: '가을',
      time: '15:40+2',
      message: 'ㅇㅇ식당입니다!',
      profilePic: '/images/waitmate.png',
    },
    {
      id: 'chat-4',
      nickname: '봄',
      time: '20:33+4',
      message: '두근두근',
      profilePic: '/images/waitmate.png',
    },
    {
      id: 'chat-5',
      nickname: '여름',
      time: '08:55+2',
      message: '굳 !',
      profilePic: '/images/waitmate.png',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const [cursor, setCursor] = useState(0);

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
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="mb-4 p-4 background rounded-lg flex items-center border-4 border-primary"
            >
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
          ))}
          {loading && (
            <div className="flex justify-center items-center">
              <div className="loader"></div>
              채팅 목록을 가져오는 중...
            </div>
          )}
          <div ref={loader} />
        </div>
      </div>
    </div>
  );
}

export default ChatList;
