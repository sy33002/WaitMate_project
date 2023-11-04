import React, { useRef, useEffect, useState } from 'react';

// 이 함수는 API 또는 서버에서 더 많은 채팅 데이터를 가져오는 것을 시뮬레이션합니다
const fetchMoreChats = () => {
  // 여기서 일반적으로 채팅 데이터를 더 불러오기 위해 API 호출을 하게 됩니다.
  // 시연을 위해 우리는 더 많은 가짜 채팅 데이터를 해결하는 Promise를 반환합니다.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        // 여기에 추가 가짜 채팅 데이터를 추가합니다.
      ]);
    }, 1500); // 네트워크 요청 지연을 시뮬레이션합니다
  });
};

function ChatList() {
  const [chats, setChats] = useState([
    // ... 초기 채팅 데이터 ...
  ]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 채팅이 있는지 추적하는 상태
  const loader = useRef(null);

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

    // 컴포넌트가 언마운트될 때 옵저버를 정리합니다
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
    setLoading(true);
    const newChats = await fetchMoreChats();
    if (newChats.length === 0) {
      setHasMore(false); // 데이터가 더 없으면 모든 채팅을 불러왔다는 것을 알 수 있습니다
    } else {
      setChats((prevChats) => [...prevChats, ...newChats]);
    }
    setLoading(false);
  }

  return (
    <div className="ml-40 mr-40 mt-10 mb-10 background">
      {/* ... 헤더 ... */}
      <div className="flex justify-center mb-5">
        <h1 className="text-primary text-3xl">My Chat List</h1>
      </div>
      <div className="w-full h-96 overflow-y-auto p-5 rounded-lg bg-white border-primary border-2">
        <div className="overflow-y-auto">
          {chats.map((chat, index) => (
            <div
              key={index}
              className="mb-4 p-4 background rounded-lg flex items-center border-4 border-primary"
            >
              {/* ... 채팅 아이템 ... */}
            </div>
          ))}
          {/* 로더 요소 */}
          <div ref={loader} className="loading">
            {loading && <div>채팅 정보 불러오는 중...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
