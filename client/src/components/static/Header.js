import React from 'react';

function Header() {
  return (
    <header className="bg-background">
      <nav>
        <ul>
          <li>
            <a href="/">홈</a>
          </li>
          <li>
            <a href="/about">소개</a>
          </li>
          <li>
            <a href="/contact">문의</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
