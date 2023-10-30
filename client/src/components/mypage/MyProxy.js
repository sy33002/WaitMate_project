import React from 'react';

function MyProxy() {
  // 예제 리스트 데이터
  const resumeList = ['이력서1', '이력서2', '이력서3'];
  const favoriteList = ['웨메1', '웨메2', '웨메3'];
  const pickedList = ['웨메A', '웨메B', '웨메C'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center background">
      <h1 className="text-3xl mb-6 text-primary">My Proxy</h1>
      <br />
      <div className="flex space-x-4">
        <div className="border-2 p-4 border-primary rounded-lg shadow-md w-64 h-96 relative">
          <h2 className="background px-2 absolute -top-8 left-1/2 transform -translate-x-1/2">
            나의 이력서
          </h2>
          <ul className="mt-4 space-y-2">
            {resumeList.map((resume, index) => (
              <li key={index} className="my-1">
                {resume}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-2 p-4 border-primary rounded-lg shadow-md w-64 h-96 relative">
          <h2 className="background px-2 absolute -top-8 left-1/2 transform -translate-x-1/2">
            찜한 웨메 리스트
          </h2>
          <ul className="mt-4 space-y-2">
            {favoriteList.map((favorite, index) => (
              <li key={index} className="my-1">
                {favorite}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-2 p-4 border-primary rounded-lg shadow-md w-64 h-96 relative">
          <h2 className="background px-2 absolute -top-8 left-1/2 transform -translate-x-1/2">
            픽한 웨메 리스트(거래완료)
          </h2>
          <ul className="mt-4 space-y-2">
            {pickedList.map((picked, index) => (
              <li key={index} className="my-1">
                {picked}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyProxy;
