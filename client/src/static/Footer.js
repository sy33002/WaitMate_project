import React, {useEffect, useState} from 'react';

export default function Footer() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <footer class="bottom-0 h-10 w-full bg-gray-400 z-20 flex flex-col font-gmarket">
      <div className="">
        <img
          src="https://sesac-projects.site/waitmate/images/logo_letter.png"
          alt="로고"
          className="w-20 md:w-24 sm:w-20 rounded-none p-1"
        />
        <div className={`${isSmallScreen ? 'text-[10px]' : 'text-[16px]'} flex justify-between p-3 bg-gray-400`}>
          <div className="">
            <div className={`${isSmallScreen ? 'text-[8px]' : 'text-[12px]'} font-bold`}>FE</div>
            <hr />
            <div className={`${isSmallScreen ? 'text-[6px]' : 'text-[12px]'}`}>
              <a href="https://github.com/ellin45">정채림</a>
            </div>
            <div className={`${isSmallScreen ? 'text-[6px]' : 'text-[12px]'}`}>
              <a href="https://github.com/sy33002">김지형</a>
            </div>
            <div className={`${isSmallScreen ? 'text-[6px]' : 'text-[12px]'}`}>
              <a href="https://github.com/Vamos-Hyuk">박장혁</a>
            </div>
          </div>
          <div className="">
            <div className={`${isSmallScreen ? 'text-[8px]' : 'text-[12px]'} font-bold`}>BE</div>
            <hr />
            <div className={`${isSmallScreen ? 'text-[6px]' : 'text-[12px]'}`}>
              <a href="https://github.com/kdm111">박준수</a>
            </div>
            <div className={`${isSmallScreen ? 'text-[6px]' : 'text-[12px]'}`}>
              <a href="https://github.com/LOBSTER10000"></a>이동규
            </div>
            <div className={`${isSmallScreen ? 'text-[6px]' : 'text-[12px]'}`}>
              <a href="https://github.com/rlagywnd4"></a>김효중
            </div>
          </div>
          <div className="">
            <div className={`${isSmallScreen ? 'text-[8px]' : 'text-[12px]'} font-bold`}> 프로젝트 관련 링크</div>
            <hr />

            <div>
              <a href="https://glitter-microwave-3f2.notion.site/Sesac-Team-2-B-3d4311bf57ca4559a11e84a3e74ebcc8?pvs=4">
                Notion
              </a>
            </div>
            <div>
              <a href="https://github.com/2nd-team-b">Github</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
