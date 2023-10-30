import React, { useState } from 'react';

function SignupForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 서버와 통신 등의 추가 로직은 여기에 작성됩니다.
    console.log({ id, password, confirmPassword, nickname });
  };

  return (
    <div className="min-h-screen flex items-center justify-center background">
      <div className="p-4 shadow-lg rounded-md w-1/3">
        <h1 className="text-3xl text-center mb-6 text-primary">
          회원가입 수정
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">ID</span>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="가입 아이디를 입력"
              className="mt-1 p-2 w-full border rounded-md shadow-inner shadow-gray-300"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">PassWord</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="새로운 비밀번호를 입력하세요."
              className="mt-1 p-2 w-full border rounded-md shadow-inner shadow-gray-300"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 한 번 더 입력하세요."
              className="mt-1 p-2 w-full border rounded-md shadow-inner shadow-gray-300"
            />
            <p className="text-xs mt-1 text-gray-500">
              비밀번호가 일치하지 않습니다.
            </p>
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Nick Name</span>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요."
              className="mt-1 p-2 w-full border rounded-md shadow-inner shadow-gray-300"
            />
            <p className="text-xs mt-1 text-gray-500">
              최대 8자까지 입력할 수 있습니다.
            </p>
          </label>

          <div className="flex flex-col items-center mt-4">
            <button
              type="submit"
              className="p-2 w-60 bg-background text-primary rounded-md border-2 border-primary shadow-lg"
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
