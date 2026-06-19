import React from 'react';
import '../global.css';

// 1. 컴포넌트가 전달받을 Props의 타입을 정의합니다.
interface HeaderProps {
  email?: string;       // 로그인하지 않았을 땐 이메일이 없을 수 있으므로 옵셔널(?) 처리
  isLoggedIn: boolean;  // 로그인 여부 (true 또는 false)
}

// 2. 정의한 타입을 컴포넌트에 적용합니다.
const Header: React.FC<HeaderProps> = ({ email, isLoggedIn }) => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">
          <h1 className="site-header__title">HomePage</h1>
          <span className="site-header__tagline">홈페이지 내용</span>
        </div>
        
        <nav className="site-header__actions" aria-label="계정 메뉴">
          {/* 3. isLoggedIn 상태에 따른 조건부 렌더링 */}
          {isLoggedIn ? (
            // 로그인 상태 (true) 일 때 보여줄 화면
            <>
              <span className="site-header-loginid">{email}</span>
              <button type="button" className="btn btn--outline">로그아웃</button>
            </>
          ) : (
            // 로그아웃 상태 (false) 일 때 보여줄 화면
            <>
              <button type="button" className="btn btn--ghost">로그인</button>
              <button type="button" className="btn btn--primary">회원가입</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;