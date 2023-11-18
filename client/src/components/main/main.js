import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './main.scss';
import { Link, useNavigate } from 'react-router-dom';
export default function Main() {
  const apiUrl = process.env.REACT_APP_URL;
  const apiKey = process.env.REACT_APP_REST_API_KEY;
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
        e.preventDefault(); 
        setTimeout(() => {
          
          window.removeEventListener('scroll', handleScroll); 
        }, 5000); 
      }
    };

    if (scrollPos >= startStopPosition) {
      window.addEventListener('scroll', handleScroll);
    }
  }, [scrollPos]);
  return (
    <>
      <div class="container_main">
        <div class="first_column">
          <img class="background_img" src="https://sesac-projects.site/waitmate/images/main/Rectangle_layer.png" />
          <img
            class="waitMate"
            data-aos="zoom-out-up"
            data-aos-delay="100"
            data-aos-anchor-placement="top-bottom"
            src="https://sesac-projects.site/waitmate/images/main/WAITMATE.png"
          />
          <br />
          <img
            class="waitMate_letter"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-anchor-placement="top-bottom"
            src="https://sesac-projects.site/waitmate/images/main/WaitMate_letter.png"
          />
          <br />
          <img
            class="waitMateProxy"
            data-aos="zoom-in-up"
            src="https://sesac-projects.site/waitmate/images/main/Group_1.png"
          />
          <div class="button">
            <button
              class="login"
              onClick={() => navigate('/register/SigninForm')}
            />
            <button
              class="kakao_login"
              onClick={() => {
                const redirectUri = encodeURIComponent(`${apiUrl}/user/kakao`);
                window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${apiKey}&redirect_uri=${redirectUri}`;
              }}
            ></button>
          </div>
        </div>
        <br />

        <div class="character_character_div">
          <img
            class="character_character"
            data-aos="fade-right"
            data-aos-delay="200"
            src="https://sesac-projects.site/waitmate/images/main/Character.png"
          />
        </div>
        <div class="character_column">
          <img
            class="character_character_Group_7"
            data-aos="flip-left"
            data-aos-delay="200"
            src="https://sesac-projects.site/waitmate/images/main/Group 7.png"
          />
          <img
            class="character_character_Group_2"
            data-aos="flip-left"
            data-aos-delay="200"
            src="https://sesac-projects.site/waitmate/images/main/Group_2.png"
          />

      
        </div>
        <br />

        <div class="strength_column">
          <img
            class="strength_Waitmate_3"
            data-aos="fade-up"
            data-aos-delay="300"
            src="https://sesac-projects.site/waitmate/images/main/Waitmate_3.png"
          />
        </div>
        <br />

        <div class="chatting_column">
          <img
            class="chatting_Group_3"
            data-aos="flip-left"
            data-aos-delay="100"
            src="https://sesac-projects.site/waitmate/images/main/Group_3.png"
          />
          <img
            class="chatting_Group_4"
            data-aos="flip-left"
            data-aos-delay="100"
            src="https://sesac-projects.site/waitmate/images/main/Group_4.png"
          />
        </div>
  
      </div>
    </>
  );
}
