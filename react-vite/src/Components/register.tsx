import React, { useState } from 'react';
import '../global.css';

// 1. 컴포넌트 내부 상태(State)를 위한 타입 정의 (선택사항이지만 확장성을 위해 추천)
interface RegisterFormState {
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register: React.FC = () => {
  // 2. 입력값을 관리할 State 선언
  const [formData, setFormData] = useState<RegisterFormState>({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { email, password, passwordConfirm } = formData;

  // 3. 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 4. 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 간단한 유효성 검사 예시
    if (!email || !password || !passwordConfirm) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 여기에 회원가입 API 요청 로직을 추가하면 됩니다.
    console.log('회원가입 데이터 제출:', formData);
    alert('회원가입이 완료되었습니다!');
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <div className="auth-card__header">
          <h2 className="auth-card__title">회원가입</h2>
          <p className="auth-card__subtitle">홈페이지의 다양한 서비스를 이용해보세요.</p>
        </div>

        {/* 5. 회원가입 폼 */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* 이메일 입력 필드 */}
          <div className="form-group">
            <label htmlFor="email">이메일 주소</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="example@email.com"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          {/* 비밀번호 확인 입력 필드 */}
          <div className="form-group">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="form-control"
              placeholder="비밀번호를 다시 한번 입력하세요"
              value={passwordConfirm}
              onChange={handleChange}
              required
            />
          </div>

          {/* 제출 버튼 (기존 Header의 btn--primary 스타일 상속) */}
          <button type="submit" className="btn btn--primary btn--block">
            동의하고 가입하기
          </button>
        </form>

        <div className="auth-card__footer">
          <span>이미 계정이 있으신가요?</span>
          <button type="button" className="btn btn--link">로그인하기</button>
        </div>
      </div>
    </main>
  );
};

export default Register;