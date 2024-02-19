import React from 'react';
import Modal from '../common/Modal';
import styled, { css } from 'styled-components';

const LoginModal = () => {
  return (
    <Modal
      title="SNS 계정으로 간편하게 
    로그인 / 회원가입 하세요!">
      <KakaoConnect>카카오로 시작하기</KakaoConnect>
      <NaverConnect>네이버로 시작하기</NaverConnect>
      <GoogleConnect>구글로 시작하기</GoogleConnect>
      <GithubConnect>Github로 시작하기</GithubConnect>
    </Modal>
  );
};

const SocialStyles = css`
  display: block;
  width: 100%;
  margin: 20px auto;
  height: 50px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  line-height: 40px;
  outline: none;
`;

const KakaoConnect = styled.button`
  ${SocialStyles}
  background:#fee500;
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
  background:#5b90f0;
  color: white;
  box-shadow: 0 15px 30px rgba(91, 144, 240, 0.36);
  transition: 0.2s linear;
  & > i {
    font-size: 20px;
    padding: 0 5px 0 0;
  }
  &:hover {
    box-shadow: 0 0 0 rgba(91, 144, 240, 0);
  }
`;

const GithubConnect = styled.button`
  ${SocialStyles}
  background:#25282d;
  color: white;
  box-shadow: 0 15px 30px rgba(37, 40, 45, 0.36);
  transition: 0.2s linear;
  & > i {
    font-size: 20px;
    padding: 0 5px 0 0;
  }
  &:hover {
    box-shadow: 0 0 0 rgba(37, 40, 45, 0);
  }
`;

export default LoginModal;
