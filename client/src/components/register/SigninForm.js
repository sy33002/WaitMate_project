import React, { useState } from 'react';

function SigninForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center background">
      <div className="p-4 shadow-lg background rounded-md">
        <img src="../" className="flex items-center justify-center" />
        <h1 className="text-2xl text-primary mb-4">Sign In</h1>
        <p className="mb-4 text-gray-400">Wellcome!</p>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 mb-2 w-80 border rounded-md shadow-inner  shadow-gray-300"
          />
          <br />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-2 w-80 border bg- rounded-md shadow-inner  shadow-gray-300"
          />
          <br />
          <div className="flex ">
            <div className="flex justify-center">
              <button
                type="submit"
                className="p-2 w-60 bg-background text-primary rounded-md mt-2 border-2 border-primary shadow-lg "
              >
                Log In
              </button>
            </div>
          </div>
          <br />
          <button className="p-2 w-60 bg-background text-primary rounded-md mt-2 border-2 border-primary shadow-lg">
            Sign Up
          </button>
          <p className="text-center mt-2">아이디/비밀번호 찾기</p>
        </form>
      </div>
    </div>
  );
}

export default SigninForm;
