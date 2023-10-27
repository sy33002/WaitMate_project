import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '/Users/user/code/2nd_project/front-wait/client/src/components/main/main.css';

export default function Main() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <>
      <div className="flex justify-between items-start h-full">
        <div className="flex flex-col space-y-4 w-4/5">
          {/* 로고 */}
          <div
            className="absolute left-1/2 z-10"
            data-aos="fade-down"
            data-aos-delay="1200"
          >
            <img
              src="/images/logo_clock.png"
              alt="로고"
              className="w-80 h-80 sm:w-30 sm:h-30 md:w-48 md:h-48 lg:w-80 lg:h-80 rotate-animation"
            
            />
            {/* <img
              src="/images/logo_letter.png"
              alt="로고_글씨"
              className="w-30 h-30 sm:w-10 sm:h-10 md:w-20 md:h-20 lg:w-30 lg:h-30"
            /> */}
          </div>
          {/* 도형 + 메세지 */}
          <div
            className="flex relative top-80"
            data-aos="fade-right"
            data-aos-delay="1000"
          >
            <img
              src="/images/Main_Union.png"
              alt="도형"
              className="w-[1450px] h-[406px]"
            />
            <div className="absolute inset-0 left-20 flex justify-start items-center text-primary text-shadow-lg font-bold text-5xl sm:text-3xl md:text-5xl lg:text-7xl">
              More Service Less Time
            </div>
          </div>
        </div>

        <div className="flex">
          {/* 보라색 div */}
          <div
            style={{
              width: '20vw',
              height: '100vh',
              backgroundColor: '#4B4097',
            }}
            className="relative"
          ></div>
          {/* 로그인 버튼 */}
          <div className="absolute bottom-72 right-32 ">
            <button
              className="bg-primary rounded-md px-8 py-4 text-white"
              data-aos="fade-left"
              data-aos-delay="900"
            >
              로그인
            </button>
          </div>
          {/* 카카오 로그인 버튼 */}
          <div className="absolute bottom-52 right-32 ">
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
