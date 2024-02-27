import React from 'react';
import Modal from '../common/Modal';
import styled, { css } from 'styled-components';
import api from '../../services/api';
import kakaoIcon from '../../assets/kakao.icon.png';
import googleIcon from '../../assets/google.icon.png';
import naverIcon from '../../assets/naver.icon.png';

const LoginModal = () => {
  return (
    <Modal
      title="SNS 계정으로 간편하게 
    로그인 / 회원가입 하세요!">
      <KakaoConnect onClick={api.kakaoLogin}>
        <img src={kakaoIcon} alt="" />
        카카오로 시작하기
      </KakaoConnect>
      <GoogleConnect onClick={api.googleLogin}>
        <img src={googleIcon} alt="" />
        구글로 시작하기
      </GoogleConnect>
      <NaverConnect onClick={api.naverLogin}>
        <img src={naverIcon} alt="" />
        네이버로 시작하기
      </NaverConnect>
    </Modal>
  );
};

const SocialStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  cursor: pointer;
  font-size: 14px;
  border: none;
  line-height: 40px;
  outline: none;
  padding: 1rem 0;
  border-radius: 59.175px;
  color: #000;
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  max-width: 22rem;
  column-gap: 0.5rem;
  margin-bottom: 1.5rem;

  & > img {
    width: 2rem;
    height: 2rem;
  }
`;

const KakaoConnect = styled.button`
  ${SocialStyles}
  background:#FFED00;
  color: black;
  box-shadow: 0 15px 30px rgba(254, 229, 0, 0.36);
  transition: 0.2s linear;
  & > i {
    font-size: 20px;
    padding: 0 5px 0 0;
  }
  &:hover {
    box-shadow: 0 0 0 rgba(254, 229, 0, 0);
  }
`;

const NaverConnect = styled.button`
  ${SocialStyles}
  background:#03C75A;
  color: white;
  box-shadow: 0 15px 30px rgba(3, 199, 90, 0.36);
  transition: 0.2s linear;
  & > i {
    font-size: 20px;
    padding: 0 5px 0 0;
  }
  &:hover {
    box-shadow: 0 0 0 rgba(3, 199, 90, 0);
  }
`;

const GoogleConnect = styled.button`
  ${SocialStyles}
  background: var(--white, #FFF);
  border: 1px solid var(--grey03, #ced0d3);
  box-shadow: 0 15px 30px var(--grey03, #ced0d354);
  transition: 0.2s linear;

  & > i {
    font-size: 20px;
    padding: 0 5px 0 0;
  }
  &:hover {
    box-shadow: 0 0 0 rgba(91, 144, 240, 0);
  }
`;

export default LoginModal;
