const apiUrl = process.env.REACT_APP_URL;

{/* 로그인 버튼 */}
<div className="absolute bottom-52 right-32 md:bottom-52 md:right-32 sm:bottom-52 sm:right-32">
<Link to="register/SigninForm">
  <button
    className="bg-primary  px-8 py-4 text-white"
    data-aos="fade-left"
    data-aos-delay="900"
  >
    로그인
  </button>
</Link>
</div>
{/* 카카오 로그인 버튼 */}
<div className="absolute bottom-32 right-32 md:bottom-32 md:right-32 sm:bottom-32 sm:right-32">
<button
  className="bg-yellow  px-8 py-4"
  data-aos="fade-left"
  data-aos-delay="1100"
  onClick={() => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?redirect_uri=${apiUrl}/user/kakao&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&response_type=code`;
  }}
>
  카카오 로그인
</button>
</div>