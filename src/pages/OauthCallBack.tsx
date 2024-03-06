// Callback 페이지 컴포넌트
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useRecoilState } from 'recoil';
import { isSignupOpenState } from '../store/atomDefinitions';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface DecodedToken {
  id: number;
  nickname: string;
  profileImage: string;
}

const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setIsSignupOpen] = useRecoilState(isSignupOpenState);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const decoded: DecodedToken = jwtDecode(token || '');

    // 받은 토큰을 사용하여 로컬 스토리지 또는 상태에 저장할 수 있습니다.
    if (token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userId', decoded.id.toString());
      localStorage.setItem('nickname', decoded.nickname);
      localStorage.setItem('profileImage', decoded.profileImage || '');
    }

    if (!decoded?.nickname) {
      localStorage.setItem('isLogin', 'false');
    } else {
      localStorage.setItem('isLogin', 'true');
    }
    // 사용자를 로그인 후 페이지로 리디렉션할 수 있습니다.
    window.location.href = '/';
  }, [location, navigate, setIsSignupOpen]);

  return (
    <>
      <LoadingSpinner />
    </>
  );
};

export default CallbackPage;
