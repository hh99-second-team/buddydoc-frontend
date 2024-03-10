import React, { useState } from 'react';
import Modal from '../modal/Modal';
import styled from 'styled-components';
import SignupForm from './SignupForm';
import SkillsForm from './SkillsForm';
import { SignUpType } from '../../types';

const SignupModal = () => {
  const [inputVal, setInputVal] = useState<SignUpType>({
    userNickname: '',
    position: '',
    career: '',
    skillList: [],
  });
  const [pageNum, setPageNum] = useState(1);
  const setPrevPage = () => setPageNum(1);
  const setNextPage = () => setPageNum(2);

  return (
    <Modal postTitle="회원가입">
      <Container>
        {pageNum === 1 && <SignupForm inputVal={inputVal} setInputVal={setInputVal} setNextPage={setNextPage} />}
        {pageNum === 2 && <SkillsForm inputVal={inputVal} setPrevPage={setPrevPage} />}
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export default SignupModal;
