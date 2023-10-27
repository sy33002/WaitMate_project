import React, { useState } from 'react';

function SignupForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id, password, nickName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center background">
      <div className="p-4 shadow-md backgroud rounded-md">
        <h2 className="text-2xl mb-4 text-primary">Sign Up</h2>
        <p className="mb-4">Let's Go Wait Mate!!!</p>
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
              className="p-3 mt-1 w-full border rounded-lg pl-3 pr-16 shadow-inner shadow-gray-300"
            />
            <button className="absolute top-1/2 transform -translate-y-1 right-3 flex items-center text-sm bg-white text-primary border-2 border-primary py-1 px-2 rounded-lg">
              중복 확인
            </button>
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
              className="p-3 mt-1 w-full border rounded-lg shadow-inner shadow-gray-300"
            />
            <input
              type="password"
              placeholder="비밀번호를 한 번 더 입력하세요."
              className="p-3 mt-1 w-full border rounded-lg shadow-inner shadow-gray-300"
            />
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
              className="p-3 mt-1 w-full border rounded-lg pl-3 pr-16 shadow-inner shadow-gray-300"
            />
            <button className="absolute top-1/2 transform -translate-y-1 right-3 flex items-center text-sm bg-white text-primary border-2 border-primary py-1 px-2 rounded-lg shadow-lg">
              중복 확인
            </button>
          </div>
          <button
            type="submit"
            className="p-3 w-full bg-background text-primary rounded-md mt-2 border-2 border-primary shadow-lg"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-2">아이디가 있으신가요? 로그인하기</p>
      </div>
    </div>
  );
}

export default SignupForm;
