import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './main.scss';
// import Footer from '../../static/Footer';
import { Link, useNavigate } from 'react-router-dom';
export default function Main() {
  const navigate = useNavigate();
  const [scrollPos, setScrollPos] = useState(0);
  useEffect(() => {
    AOS.init();
  });
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const waitMateElement = document.querySelector('.container_main');

    if (!waitMateElement) return;

    const waitMatePosition = waitMateElement.getBoundingClientRect().top;
    const startStopPosition = waitMatePosition + 100;

    const handleScroll = (e) => {
      if (scrollPos >= startStopPosition) {
        e.preventDefault(); // 스크롤 이벤트를 중단
        setTimeout(() => {
          // 일정 시간(2초) 후에 다시 스크롤 이벤트를 허용
          window.removeEventListener('scroll', handleScroll); // 스크롤 이벤트 제거
        }, 5000); // 2초 (2000 밀리초)
      }
    };

    if (scrollPos >= startStopPosition) {
      window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너 추가
    }
  }, [scrollPos]);
  return (
    <>
      <div class="container_main">
        <div class="first_column">
          <img class="background_img" src="./images/main/Rectangle_layer.png" />
          <img
            class="waitMate"
            data-aos="fade-zoom-in"
            data-aos-delay="100"
            data-aos-anchor-placement="top-bottom"
            src="./images/main/WAITMATE.png"
          />
          <br />
          <img
            class="waitMate_letter"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-anchor-placement="top-bottom"
            src="./images/main/WaitMate_letter.png"
          />
          <br />
          <img
            class="waitMateProxy"
            data-aos="zoom-in-up"
            src="./images/main/Group_1.png"
          />
          <div class="button">
            <button
              class="login"
              onClick={() => navigate('/register/SigninForm')}
            />
            <button
              class="kakao_login"
              onClick={() => {
                window.location.href = `https://kauth.kakao.com/oauth/authorize?redirect_uri=http://localhost:8080/user/kakao&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&response_type=code`;
              }}
            ></button>
          </div>
        </div>
        <br />

        <div class="character_character_div">
          <img class="character_character" src="./images/main/Character.png" />
        </div>
        <div class="character_column">
          <img
            class="character_character_Group_7"
            data-aos="flip-left"
            data-aos-delay="200"
            src="./images/main/Group 7.png"
          />
          <img
            class="character_character_Group_2"
            data-aos="flip-left"
            data-aos-delay="200"
            src="./images/main/Group_2.png"
          />

          {/* <img class="character_background" src="./images/main/Group 8.png" /> */}
        </div>
        <br />

        <div class="strength_column">
          <img class="strength_Waitmate_3" src="./images/main/Waitmate_3.png" />
        </div>
        <br />

        <div class="chatting_column">
          <img
            class="chatting_Group_3"
            data-aos="flip-left"
            data-aos-delay="100"
            src="./images/main/Group_3.png"
          />
          <img
            class="chatting_Group_4"
            data-aos="flip-left"
            data-aos-delay="100"
            src="./images/main/Group_4.png"
          />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
