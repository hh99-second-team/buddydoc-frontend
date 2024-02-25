import React, { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import styled from 'styled-components';
import { career, positions } from '../../constants/data';

interface FormProps {
  inputVal: any;
  setInputVal: any;
  setNextPage: any;
}

const SignupForm = ({ inputVal, setInputVal, setNextPage }: FormProps) => {
  const [isValid, setIsValid] = useState({
    isNameValid: true,
    isNicknameValid: true,
    isEmailValid: true,
  });

  /**
   * nickname: 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성, 한글 초성 및 모음은 허가하지 않는다.
   */
  const regex: { [key: string]: RegExp } = {
    nickname: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
  };

  const validateInput = (type: string, value: string): boolean => regex[type].test(value);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setInputVal({ ...inputVal, nickname });
    setIsValid({ ...isValid, isNicknameValid: validateInput('nickname', nickname) });
  };

  const onChangePosition = (position: string) => setInputVal({ ...inputVal, position });

  const onChangeCareer = (career: string) => setInputVal({ ...inputVal, career });

  const handleNextPage = () => {
    if (!inputVal.nickname || !inputVal.position || !inputVal.career) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    setNextPage();
  };

  return (
    <>
      <div>
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
      </div>

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