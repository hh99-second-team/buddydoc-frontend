import React from 'react';
import Modal from '../common/Modal';
import kakaoLogin from '../../assets/kakao_login_medium_wide.png';

const LoginModal = () => {
  return (
    <Modal title="로그인">
      <img src={kakaoLogin} alt="" />
    </Modal>
  );
};

export default LoginModal;
