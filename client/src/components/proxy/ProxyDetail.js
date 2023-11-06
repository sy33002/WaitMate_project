import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function ProxyDetail({ id, nickname, photo, userId }) {
  const { proxyId } = useParams();
  const [proxy, setProxy] = useState({});
  
  useEffect(() => {
    fetch(`http://localhost:8080/proxy/detail/${proxyId}`)
    .then(response => response.json())
    .then(data => {
      setProxy(data.result);
      console.log(data.result);
    })
    .catch(error => {
      console.error('데이터 가져오는 중 오류 발생!', error);
    });
  }, [proxyId]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-4/5 w-4/5 bg-white flex">
        <div className="bg-primary w-1/3 h-full flex flex-col justify-center items-center">
          <img src={proxy.photo} alt="Proxy Photo" />
          <button className="bg-background text-primary mb-2">
            프록시와 채팅하기
          </button>
          <button className="bg-background text-primary mb-2">
            프록시 픽하기
          </button>
        </div>
        <div className="flex flex-col h-full w-2/3">
          <div className="h-1/3 w-full flex justify-around">
            <div className="w-3/5 h-full flex flex-col  justify-center">
              <span className="text-primary text-lg">Title: {proxy.title}</span>
              <br />
              <span className="text-primary">proxy ID: {proxy.proxyId}</span>
            </div>
            <div className="w-10 h-full bg-primary"></div>
          </div>
          <div className="w-full h-2/3 p-10">
            <div className="bg-primary w-1/3 flex justify-center items-center">
              <span className="text-background">Age/ Gender</span>
            </div>
            <div className="flex justify-center items-center">
              <span>{proxy.age}/{proxy.gender}</span>
            </div>
            <br />
            <div className="bg-primary w-1/3 flex justify-center items-center">
              <span className="text-background">Address</span>
            </div>
            <div className="flex justify-center items-center">
              <span>{proxy.proxyAddress}</span>
            </div>
            <br />
            <div className="bg-primary w-1/3 flex justify-center items-center">
              <span className="text-background">Introduce</span>
            </div>
            <div className="flex justify-center items-center">
              <span>{proxy.proxyMsg}</span>
            </div>
            <button>채팅하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
