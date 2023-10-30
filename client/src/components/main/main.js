import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './main.css'
export default function Main() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      <div className="flex justify-between items-start h-full">
        <div className="flex flex-col space-y-4 w-3/5">
          {/* 로고 */}
          <div
            className="absolute left-1/3 z-10"
            data-aos="fade-down"
            data-aos-delay="1200"
          >
            <img
              src="/images/logo.png"
              alt="로고"
              className="w-70 h-70 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-70 lg:h-70 "
            
            />
           
          </div>
          {/* 도형 + 메세지 */}
          <div
            className="flex relative top-80"
            data-aos="fade-right"
            data-aos-delay="1000"
          >
            {/* <img
              src="/images/Main_Union.png"
              alt="도형"
              className="w-[1450px] h-[406px]"
            /> */}
            <div className="absolute inset-0 left-20 flex justify-start items-center text-primary text-shadow-lg font-bold text-5xl sm:text-4xl md:text-5xl lg:text-7xl">
              More Service Less Time
            </div>
          </div>
        </div>

        <div className="flex">
          {/* 보라색 div */}
          <div
            style={{
              width: '30vw',
              height: '100vh',
              backgroundColor: '#4B4097',
            }}
            className="relative"
          ></div>
          {/* 로그인 버튼 */}
          <div className="absolute bottom-52 right-32 md:bottom-52 md:right-32 sm:bottom-52 sm:right-32">
            <button
              className="bg-primary rounded-md px-8 py-4 text-white"
              data-aos="fade-left"
              data-aos-delay="900"
            >
              로그인
            </button>
          </div>
          {/* 카카오 로그인 버튼 */}
          <div className="absolute bottom-32 right-32 md:bottom-32 md:right-32 sm:bottom-32 sm:right-32">
            <button
              className="bg-yellow rounded-md px-8 py-4"
              data-aos="fade-left"
              data-aos-delay="1100"
              onClick={() => {
                window.location.href = `https://kauth.kakao.com/oauth/authorize?redirect_uri=http://localhost:8080/user/kakao&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&response_type=code`;
              }}
            >
              카카오 로그인
            </button>
          </div>
        </div>
      </div>
      <br/>
      {/* 두번째 메인 */}
      <hr/>
      <div>dfdfdf</div>

    </>
  );
}
