import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Main() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <div className="flex flex-col space-y-4">
      <img
        src="/images/logo.png"
        alt="로고"
        className="items-center w-12 md:w-24 sm:w-20"
      />
      <div className="flex relative" data-aos="fade-up-right">
        <img src="/images/Main_Union.png" alt="도형" className="" />
        <div className="absolute inset-0 left-32 flex justify-start items-center text-primary text-7xl">
          More Service Less Time
        </div>
      </div>
      <div className="relative">
        <img
          src="/images/Main_Polygon.png"
          alt="도형"
          className="absolute right-0 top-0"
        />
        <div className="absolute top-56 right-8 ">
          <button className="bg-primary rounded-sm px-6 py-3 text-white">
            로그인
          </button>
        </div>
        <div className="absolute top-72 right-8 ">
          <button className="bg-yellow rounded-sm px-6 py-3">
            카카오 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
