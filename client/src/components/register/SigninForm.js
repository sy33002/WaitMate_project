import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SigninForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/users/login', {
        username,
        password,
      });
      if (response.status === 200) {
        navigate('/map')
      };
    } catch (error) {
      if (error.response && error.response.data) {
        // 백엔드에서 반환하는 오류 메시지를 설정합니다.
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('로그인 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center background">
      <div className="p-4 w-1/3 shadow-lg background rounded-md">
        <h1 className="text-2xl text-primary mb-4">Sign In</h1>
        <p className="mb-4 text-gray-400">Wellcome!</p>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 mb-4 w-full max-w-sm border rounded-md shadow-inner shadow-gray-300"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-4 w-full max-w-sm border rounded-md shadow-inner shadow-gray-300"
          />
          <div className="flex flex-col items-center mt-4">
            <button
              type="submit"
              className="p-2 w-60 bg-background text-primary rounded-md border-2 border-primary shadow-lg mb-2"
            >
              Log In
            </button>
            <button
              className="p-2 w-60 bg-background text-primary rounded-md border-2 border-primary shadow-lg"
              onClick={() => navigate('/register/SignupForm')} // 'Sign Up' 버튼 클릭 시 회원가입 페이지로 이동합니다.
            >
              Sign Up
            </button>
          </div>
          <p className="text-center mt-2">
            <a href="/password-reset" className="text-primary hover:underline">
              아이디/비밀번호 찾기
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SigninForm;
