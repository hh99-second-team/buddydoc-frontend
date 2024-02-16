import React, { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import styled from 'styled-components';

interface FormProps {
  inputVal: any;
  setInputVal: any;
  setNextPage: any;
}

const SignupForm = ({ inputVal, setInputVal, setNextPage }: FormProps) => {
  const positions = ['프론트엔드', '백엔드', 'IOS', '안드로이드', '데브옵스', '디자이너', '기획'];
  const career = ['초보', '1년 미만', '1년 이상 ~ 3년 이하', '3년 이상 ~ 5년 이하', '5년 이상'];

  const [isValid, setIsValid] = useState({
    isNameValid: true,
    isNicknameValid: true,
    isEmailValid: true,
  });

  /**
   * name: 한글 or 영문 가능
   * nickname: 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성, 한글 초성 및 모음은 허가하지 않는다.
   */
  const regex: { [key: string]: RegExp } = {
    name: /^[가-힣a-zA-Z]+$/,
    nickname: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
    email: /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
  };

  const validateInput = (type: string, value: string): boolean => regex[type].test(value);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setInputVal({ ...inputVal, name });
    setIsValid({ ...isValid, isNameValid: validateInput('name', name) });
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setInputVal({ ...inputVal, nickname });
    setIsValid({ ...isValid, isNicknameValid: validateInput('nickname', nickname) });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setInputVal({ ...inputVal, email });
    setIsValid({ ...isValid, isEmailValid: validateInput('email', email) });
  };

  const onChangePosition = (position: string) => setInputVal({ ...inputVal, position });

  const onChangeCareer = (career: string) => setInputVal({ ...inputVal, career });

  const handleNextPage = () => {
    if (!inputVal.name || !inputVal.nickname || !inputVal.email || !inputVal.position || !inputVal.career) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    setNextPage();
  };

  return (
    <>
      <InputBox>
        <Title>
          이름<span> *</span>
        </Title>
        <Input
          type="text"
          placeholder="이름을 입력해주세요."
          value={inputVal.name}
          onChange={onChangeName}
          isValid={isValid.isNameValid || !inputVal.name.length}
        />
        <ValidText className={isValid.isNameValid ? '' : 'not--valid'}>
          {!inputVal.name.length || isValid.isNameValid ? '' : '* 이름을 정확히 입력해주세요.'}
        </ValidText>
      </InputBox>
      <InputBox>
        <Title>
          닉네임<span> *</span>
        </Title>
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={inputVal.nickname}
          onChange={onChangeNickname}
          isValid={isValid.isNicknameValid || !inputVal.nickname.length}
        />
        <ValidText className={isValid.isNicknameValid ? '' : 'not--valid'}>
          {!inputVal.nickname.length
            ? ''
            : isValid.isNicknameValid
            ? '* 사용 가능한 닉네임입니다.'
            : '* 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 입력해주세요.'}
        </ValidText>
      </InputBox>
      <InputBox>
        <Title>
          이메일<span> *</span>
        </Title>
        <Input
          type="text"
          placeholder="이메일을 입력해주세요."
          value={inputVal.email}
          onChange={onChangeEmail}
          isValid={isValid.isEmailValid || !inputVal.email.length}
        />
        <ValidText className={isValid.isEmailValid ? '' : 'not--valid'}>
          {!inputVal.email.length
            ? ''
            : isValid.isEmailValid
            ? '* 사용 가능한 이메일입니다.'
            : '* 이메일을 정확하게 입력해주세요.'}
        </ValidText>
      </InputBox>

      <SelectBox>
        <Title>
          포지션<span> *</span>
        </Title>
        <Select
          items={positions}
          selectValue={inputVal.position}
          onValueChange={onChangePosition}
          placeholder="포지션을 선택해주세요."
        />
      </SelectBox>
      <SelectBox>
        <Title>
          경력<span> *</span>
        </Title>
        <Select
          items={career}
          selectValue={inputVal.career}
          onValueChange={onChangeCareer}
          placeholder="경력 기간을 선택해주세요."
        />
      </SelectBox>
      <Button size="full" color="primary" onClick={handleNextPage}>
        다음
      </Button>
    </>
  );
};

const InputBox = styled.div``;

const SelectBox = styled.div`
  margin-bottom: 15px;
`;

const Title = styled.p`
  font-size: 18px;
  margin-bottom: 10px;

  & > span {
    color: rgb(224, 67, 53);
  }
`;

const ValidText = styled.p`
  margin-top: 3px;
  margin-left: 13px;
  font-size: 12px;
  color: #3f87ce;
  height: 15px;

  &.not--valid {
    color: rgb(224, 67, 53);
  }
`;

export default SignupForm;
