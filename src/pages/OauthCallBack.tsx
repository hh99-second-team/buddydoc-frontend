// Callback 페이지 컴포넌트
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useRecoilState } from 'recoil';
import { isSignupOpenState } from '../store/atomDefinitions';

interface DecodedToken {
  id: number;
  nickname: string;
}

const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignupOpen, setIsSignupOpen] = useRecoilState(isSignupOpenState);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const decoded: DecodedToken = jwtDecode(token || '');

    // 받은 토큰을 사용하여 로컬 스토리지 또는 상태에 저장할 수 있습니다.
    if (token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userId', decoded.id.toString());
      localStorage.setItem('nickname', decoded.nickname);
    }

    if (!decoded?.nickname) {
      setIsSignupOpen(true);
      localStorage.setItem('isLoggined', 'false');
    } else {
      localStorage.setItem('isLoggined', 'true');
    }
    // 사용자를 로그인 후 페이지로 리디렉션할 수 있습니다.
    navigate('/');
  }, [location, navigate, setIsSignupOpen]);

  return <></>;
};

export default CallbackPage;
