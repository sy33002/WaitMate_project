import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../common/axiosInstance';

function SignupForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [idValid, setIdValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [nickNameValid, setNickNameValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const handleIdCheck = async (e) => {
    try {
      e.preventDefault();

      // 아이디 길이 유효성 검사
      if (id.length < 4 || id.length > 12) {
        alert('아이디는 4~12자의 영문 대소문자, 숫자만 사용 가능합니다.');
        return;
      }

      const response = await axiosInstance.post(`user/check/userId`, {
        userId: id,
      });
      if (response.status === 200) {
        alert('사용 가능한 아이디입니다.');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        alert('이미 사용 중인 아이디입니다.');
      } else {
        console.error(error);
        alert('아이디 중복 확인 중 오류가 발생했습니다.');
      }
    }
  };

  // 닉네임 중복 확인 함수
  const handleNicknameCheck = async () => {
    try {
      // 닉네임 길이 유효성 검사
      if (nickName.length < 2 || nickName.length > 10) {
        alert('닉네임은 2~10자 이내로 입력해주세요.');
        return;
      }

      const response = await axiosInstance.post(`user/check/nickname`, {
        nickname: nickName,
      });
      if (response.status === 200) {
        alert('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        alert('이미 사용 중인 닉네임입니다.');
      } else {
        console.error(error);
        alert('닉네임 중복 확인 중 오류가 발생했습니다.');
      }
    }
  };

  const isValidForm = () => {
    const idRegex = /^[a-zA-Z0-9]{4,12}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;

    // 아이디 길이 유효성 검사
    if (id.length < 4 || id.length > 12) {
      alert('아이디는 4~12자의 영문 대소문자, 숫자만 사용 가능합니다.');
      return false;
    }

    // 비밀번호 길이 유효성 검사
    if (!idRegex.test(id)) {
      alert('비밀번호는 숫자와 알파벳을 포함한 8자 이상입니다.');
      return false;
    }

    // 비밀번호 확인 유효성 검사
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    // 닉네임 길이 유효성 검사
    if (nickName.length < 2 || nickName.length > 10) {
      alert('닉네임은 2~10자 이내로 입력해주세요.');
      return false;
    }

    // 모든 유효성 검사 항목이 true여야 유효한 폼으로 간주
    return true;
  };

  // 비밀번호 일치 여부 메시지를 반환하는 함수
  const getPasswordMatchMessage = () => {
    if (password === '' || confirmPassword === '') return ''; // 둘 중 하나라도 입력하지 않았으면 메시지를 반환하지 않습니다.
    return password === confirmPassword
      ? '비밀번호가 일치합니다.'
      : '비밀번호가 일치하지 않습니다.';
  };

  // 비밀번호 일치 여부에 따른 메시지 색상을 반환하는 함수
  const getPasswordMatchColor = () => {
    if (password === '' || confirmPassword === '') return 'text-gray-500'; // 둘 중 하나라도 입력하지 않았으면 회색으로 반환합니다.
    return password === confirmPassword ? 'text-green-500' : 'text-red-500';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidForm()) {
      return;
    }
    try {
      const response = await axiosInstance.post(`user/register`, {
        userId: id,
        password,
        nickname: nickName,
      });
      if (response.status === 201) {
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate('/register/SigninForm');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="p-4 w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl shadow-md rounded-md">
        <h2 className="text-xl sm:text-2xl mb-4 text-primary">Sign Up</h2>

        <p className="mb-4 text-gray-400">Let's Go Wait Mate!!!</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              ID
            </label>
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="p-2 mt-1 w-full border rounded-lg pl-3 pr-16 shadow-inner shadow-gray-300"
            />
            <button
              className="absolute top-1/2 transform -translate-y-3 right-3 flex items-center text-sm bg-white text-primary border-2 border-primary py-1 px-2 rounded-lg"
              type="button"
              onClick={handleIdCheck}
            >
              중복 확인
            </button>
            {idValid ? (
              <p className="text-xs mt-1 valid-message">
                ID는 4~12자의 영문 대소문자, 숫자만 사용 가능합니다.
              </p>
            ) : (
              <p className="text-xs mt-1 invalid-message">
                ID는 4~12자의 영문 대소문자, 숫자만 사용 가능합니다.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              PassWord
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 mt-1 w-full border rounded-lg shadow-inner shadow-gray-300"
            />
            <input
              type="password"
              placeholder="비밀번호를 한 번 더 입력하세요."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => {
                if (!confirmPasswordValid && confirmPassword !== '') {
                  // 비밀번호 일치하지 않을 경우 에러 메시지 표시
                  alert('비밀번호가 일치하지 않습니다.');
                }
              }}
              className="p-2 mt-1 w-full border rounded-lg shadow-inner shadow-gray-300"
            />
            {passwordValid ? (
              <p className="text-xs mt-1 valid-message">
                PW는 숫자와 알파벳을 포함한 8자 이상입니다.
              </p>
            ) : (
              <p className="text-xs mt-1 valid-message">
                PW는 숫자와 알파벳을 포함한 8자 이상입니다.
              </p>
            )}

            <p className={`text-xs mt-1 ${getPasswordMatchColor()}`}>
              {getPasswordMatchMessage()}
            </p>
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nick Name
            </label>
            <input
              type="text"
              placeholder="닉네임을 입력하세요."
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className="p-2 mt-1 w-full border rounded-lg pl-3 pr-16 shadow-inner shadow-gray-300"
            />
            <button
              type="button"
              className="absolute top-1/2 transform -translate-y-3 right-3 flex items-center text-sm bg-white text-primary border-2 border-primary py-1 px-2 rounded-lg shadow-lg"
              onClick={handleNicknameCheck}
            >
              중복 확인
            </button>
            {nickNameValid ? (
              <p className="text-xs mt-1 valid-message">
                Nickname은 2~10자 이내로 입력해주세요.
              </p>
            ) : (
              <p className="text-xs mt-1 valid-message">
                Nickname은 2~10자 이내로 입력해주세요.
              </p>
            )}
          </div>
          <div className="flex flex-col items-center mt-4">
            <button
              type="submit"
              className="p-2 w-full sm:w-60 bg-background text-primary rounded-md border-2 border-primary shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center mt-2">
          아이디가 있으신가요?{' '}
          <Link
            to="/register/SigninForm"
            className="text-primary hover:underline"
          >
            로그인하기
          </Link>
        </p>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-full sm:w-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center">
            <p className="mb-4">회원가입이 완료되었습니다.</p>
            <button
              onClick={handleModalConfirm}
              className="p-2 bg-primary text-white rounded-md"
            >
              확인
            </button>
          </div>
        </div>
      )}
      {/* 모달창 끝 */}
    </div>
  );
}

export default SignupForm;
