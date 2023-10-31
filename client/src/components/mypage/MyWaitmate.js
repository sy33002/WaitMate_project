import React from 'react';

function MyWaitmate() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center backgroung">
      <h1 className="text-3xl mb-6">My WaitMate</h1>
      <div className="flex space-x-4">
        <div className="border-2 p-32 text-center">
          <p>내가 등록한 웨메 리스트</p>
        </div>
        <div className="border-2 p-32 text-center">
          <p>내가 픽한 프록시 리스트(거래완료)</p>
        </div>
      </div>
    </div>
  );
}

export default MyWaitmate;
