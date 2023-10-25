import React from "react";

export default function main() {
  return (

      <div className="flex flex-col items-center space-y-4">
      <img src="/images/logo.png" alt="로고" className="w-12 md:w-24 sm:w-20" />
      <div>WAIT MATE</div>
      <div className="text-center">More Service Less Time</div>
      <button className="bg-primary rounded-sm px-4 py-2">로그인</button>
      <button className="bg-yellow rounded-sm px-4 py-2">카카오 로그인</button>
    

    </div>
  );
}
