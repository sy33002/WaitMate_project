import React from 'react';

function ChatList({ id, nickname, photo, userId }) {
  const chats = [
    {
      name: '바비킴',
      time: '23:11+8',
      message: '거래 가능? ...',
    },
    // 추가적인 채팅 데이터...
  ];

  return (
    <div className="w-80 h-96 p-5 border rounded-lg bg-gray-200">
      <h2 className="mb-5 text-lg font-bold">My Chat List</h2>
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
  );
}

export default ChatList;
