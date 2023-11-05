import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './main.scss';
// import Footer from '../../static/Footer';
import { Link } from 'react-router-dom';
export default function Main() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div class="container">
      <div class="first_column">
        <img class="waitMate"src="./images/main/WAITMATE.png"></img>
        <img class="waitMate_letter" src="./images/main/WaitMate_letter.png"></img>
        <button class="login"></button>
        <button class="kakao_login"></button>
        <img
          class="background_img"
          src="./images/main/Rectangle_layer.png"
        ></img>
      </div>
      <div class="character_column">
        <div>
          <img class="character_character"src="./images/main/Character.png" />
        </div>
        <div>
          <img class="character_character_Group_2" src="./images/main/Group_2.png" />
          <img class="character_character_Group_7" src="./images/main/Group 7.png" />
        </div>
        <div>
          <img class="character_character_Group_8"src="./images/main/Group 8.png" />
        </div>
      </div>
      <div class="strength_column">
        <img class="strength_Waitmate_3"src="./images/main/Waitmate_3.png" />
      </div>
      <div class="chatting_column">
        <img  class="chatting_Group_3"src="./images/main/Group_3.png"></img>
        <img  class="chatting_Group_4"src="./images/main/Group_4.png"></img>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
