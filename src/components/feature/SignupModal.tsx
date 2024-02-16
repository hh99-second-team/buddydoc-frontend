import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import styled from 'styled-components';
import SelectDemo from '../common/Select';
import Button from '../common/Button';

const SignupModal = () => {
  const skills = ['프론트엔드', '백엔드', 'IOS', '안드로이드', '데브옵스', '디자이너', '기획'];
  const career = ['초보', '1년 미만', '1년 이상 ~ 3년 이하', '3년 이상 ~ 5년 이하', '5년 이상'];

  const [inputVal, setInputVal] = useState({ name: '', nickname: '', email: '' });
  const [isValid, setIsValid] = useState({
    isNameValid: true,
    isNicknameValid: true,
    isEmailValid: true,
  });

  const validateName = (name: string): boolean => {
    // 한글 or 영문 가능
    const regex = /^[가-힣a-zA-Z]+$/;
    return regex.test(name);
  };

  const validateNickname = (nickname: string): boolean => {
    // 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성, 한글 초성 및 모음은 허가하지 않는다.
    const regex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    return regex.test(nickname);
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    return regex.test(email);
  };

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setInputVal({ ...inputVal, name });
    setIsValid({ ...isValid, isNicknameValid: validateName(name) });
  };

  const nicknameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setInputVal({ ...inputVal, nickname });
    setIsValid({ ...isValid, isNicknameValid: validateNickname(nickname) });
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setInputVal({ ...inputVal, email });
    setIsValid({ ...isValid, isEmailValid: validateEmail(email) });
  };

  return (
    <Modal title="회원가입">
      <Container>
        <Input
          type="text"
          placeholder="이름을 입력해주세요."
          value={inputVal.name}
          onChange={nameChangeHandler}
          isValid={true}
        />
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={inputVal.nickname}
          onChange={nicknameChangeHandler}
          isValid={true}
        />
        <Input
          type="text"
          placeholder="이메일을 입력해주세요."
          value={inputVal.email}
          onChange={emailChangeHandler}
          isValid={true}
        />

        <SelectDemo items={skills} placeholder="기술 스택을 선택해주세요." />
        <SelectDemo items={career} placeholder="경력 기간을 선택해주세요." />
        <Button size="full" color="primary">
          다음
        </Button>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

export default SignupModal;
