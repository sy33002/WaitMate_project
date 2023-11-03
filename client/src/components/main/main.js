import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../main/main.css';
import Footer from '../../static/Footer';
export default function Main() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      {/* 첫번째 문단 */}
      <div>
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
              <div className="absolute inset-0 left-20 flex justify-start items-center text-primary text-shadow-lg font-hanna text-5xl sm:text-4xl md:text-5xl lg:text-7xl ">
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
        <br />
      </div>
      {/* 두번째 문단 */}
      <div className="flex flex-wrap mt-10 font-hanna">
        {/* 프록시 소개 (왼쪽) */}
        <div className="flex flex-col justify-center w-1/2 p-4 font-hanna ">
          <div className="mb-4 text-lg">프록시란(Proxy)?</div>
          <div className="mb-4 text-lg">
            웨이트 메이트에게 요청을 받아 웨이팅 서비스를 제공하는 사람을
            말합니다!
          </div>
        </div>

        {/* 프록시 이미지 (오른쪽) */}
        <div className="w-1/2 p-4">
          <img src="./images/proxy.png" alt="proxy" className="w-full" />
        </div>

        {/* 웨이트메이트 이미지 (왼쪽) */}
        <div className="w-1/2 p-4 mt-10">
          <img src="./images/waitMate.png" alt="waitmate" className="w-full" />
        </div>

        {/* 웨이트메이트 소개 (오른쪽) */}
        <div className="flex flex-col justify-center w-1/2 p-4 mt-10">
          <div className="mb-4 text-3xl">웨이트 메이트(Wait Mait)란?</div>
          <div className="mb-4 text-3xl">
            프록시에게 웨이팅 서비스를 요청하는 사람을 말합니다! 언제 어디서든
            프록시를 통해 웨이팅 서비스를 제공받으세요!
          </div>
        </div>

        <div className="p-4 mt-10">
          <div className="mb-4 mt-4 text-3xl">
            프록시와 웨이트 메이트가 만나 웨이트 메이트는 프록시가 제공해주는
            서비스를 통해 시간을 아낄수 있고, 프록시는 웨이트 메이트의 요청을
            들어주고 만족할 만한 대가를 받을 수 있어요
          </div>
        </div>

        <div className="flex w-full p-4 mt-10">
          <div className="flex flex-col justify-center w-1/2 text-3xl ">
            언제, 어디서든 채팅을 통해 웨이트메이트와 프록시가 만나 대화를
            나눠보세요!
          </div>
          <div className="w-1/2">
            <img src="/images/Chatting.png" alt="chatting" className="w-full" />
            {/*  */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
