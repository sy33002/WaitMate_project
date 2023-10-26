import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Main() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <>
      <div className="flex justify-between items-start h-full">
        <div className="flex flex-col space-y-4 w-4/5">
          <div
            className="flex justify-center"
            data-aos="fade-down"
            data-aos-delay="1200"
          >
            <img
              src="/images/logo.png"
              alt="로고"
              className="w-60 h-60 sm:w-30 sm:h-30 md:w-48 md:h-48 lg:w-60 lg:h-60"
            />
          </div>
          <div
            className="flex relative top-12"
            data-aos="fade-right"
            data-aos-delay="1000"
          >
            <img src="/images/Main_Union.png" alt="도형" className='w-[260px] h-[100px]'/>
            <div className="absolute inset-0 left-20 flex justify-start items-center text-primary text-shadow-lg font-bold text-5xl sm:text-3xl md:text-5xl lg:text-7xl">
              More Service Less Time
            </div>
          </div>
        </div>

        {/* 보라색 div */}
        <div
          style={{ width: '60vw', height: '100vh', backgroundColor: '#4B4097' }}
          className="relative"
        ></div>
        <div className="flex">
          {/* 로그인 버튼 */}
          <div className="absolute bottom-72 right-32 ">
            <button
              className="bg-primary rounded-sm px-6 py-3 text-white"
              data-aos="fade-left"
              data-aos-delay="900"
            >
              로그인
            </button>
          </div>
          {/* 카카오 로그인 버튼 */}
          <div className="absolute bottom-52 right-32 ">
            <button
              className="bg-yellow rounded-sm px-6 py-3"
              data-aos="fade-left"
              data-aos-delay="1100"
            >
              카카오 로그인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
