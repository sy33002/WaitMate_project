import React from 'react';
import './footer.scss';
export default function Footer() {
  const isSmallScreen = window.innerWidth < 700;

  return (
    <footer class="bottom-0 h-10 w-full bg-gray-200 z-20">

      <div className="title4 footer-content">
        <div className={`${isSmallScreen ? 'text-[8px]' : 'text-[11px]'} footer-container`}>

          <div className="footer-item">
            <div className="footer-item-title">FE</div>
            <hr />
            <div>
              <a href="https://github.com/ellin45">정채림</a>
            </div>
            <div>
              <a href="https://github.com/sy33002">김지형</a>
            </div>
            <div>
              <a href="https://github.com/Vamos-Hyuk">박장혁</a>
            </div>
          </div>
          <div className="footer-item">
            <div className="footer-item-title">BE</div>
            <hr />

            <div>
              <a href="https://github.com/kdm111">박준수</a>
            </div>
            <div>
              <a href="https://github.com/LOBSTER10000"></a>이동규
            </div>
            <div>
              <a href="https://github.com/rlagywnd4"></a>김효중
            </div>
          </div>
          <div className="footer-item">
            <div className="footer-item-title"> 프로젝트 관련 링크</div>
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
