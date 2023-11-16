import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore'; // useUserStore를 import 합니다.
import { axiosInstance } from '../common/axiosInstance';

function SigninForm() {
  // 테스트 계정
  const testUsername = 'test2';
  const testPassword = 'abc12345';

  const [username, setUsername] = useState(testUsername);
  const [password, setPassword] = useState(testPassword);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // useUserStore에서 setUserInfo 함수를 가져옵니다.
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/user/login', {
        userId: username,
        password,
      });
      if (response.status === 200) {
        // 로그인 성공 시 setUserInfo 함수를 호출하여 상태를 업데이트합니다.
        await setUserInfo();
        localStorage.clear();
        localStorage.setItem('id', response.data.user.id);
        localStorage.setItem('userId', response.data.user.userId);
        navigate('/map'); // 성공적으로 로그인하면 맵 페이지로 리다이렉트합니다.
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // 백엔드에서 반환하는 오류 메시지를 설정합니다.
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('로그인에 실패했습니다.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="p-4 w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl shadow-md rounded-md">
        <h1 className="text-2xl text-primary mb-4">Sign In</h1>
        <p className="mb-4 text-gray-400">Wellcome!</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 mt-1 w-full border rounded-lg pl-3 pr-16 shadow-inner shadow-gray-300"
            />
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 mt-1 w-full border rounded-lg pl-3 pr-16 shadow-inner shadow-gray-300"
            />
            <div className="flex flex-col items-center mt-4">
              <button
                type="submit"
                className="p-2 w-full sm:w-60 bg-background text-primary rounded-md border-2 border-primary shadow-lg"
              >
                Log In
              </button>
              <button
                type="button"
                className="p-2 w-full sm:w-60 bg-background text-primary rounded-md border-2 border-primary shadow-lg"
                onClick={() => navigate('/register/SignupForm')} // 'Sign Up' 버튼
              >
                {' '}
                Sign Up
              </button>
            </div>
            <p className="text-center mt-2">
              <a
                href="/password-reset"
                className="text-primary hover:underline"
              >
                아이디/비밀번호 찾기
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninForm;
