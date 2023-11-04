import React from 'react';

function ChatList() {
  const chats = [
    {
      name: '바비킴',
      time: '23:11+8',
      message: '거래 가능? ...',
    },
    {
      name: 'kyle',
      time: '10:09+9',
      message: '웨이트메이트 가능하신가요?? ...',
    },
    // 추가적인 채팅 데이터...
  ];

  return (
    <div className="ml-10 mr-10 mt-10 mb-10 background">
      <div className="flex items-center justify-center background">
        <h2 className="mb-5 text-3xl text-primary font-bold">My Chat List</h2>
      </div>
      <div
        className="w-full h-full
     p-5 rounded-lg bg-white border-primary border-4"
      >
        <div className="overflow-y-auto">
          {chats.map((chat, index) => (
            <div
              key={index}
              className="mb-4 p-4 bg-blue-200 rounded-lg flex items-center"
            >
              <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                👤
              </div>
              <div className="flex-grow">
                <div className="font-semibold">{chat.name}</div>
                <div className="text-xs text-gray-600">{chat.message}</div>
              </div>
              <div className="text-xs text-gray-500">{chat.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatList;
