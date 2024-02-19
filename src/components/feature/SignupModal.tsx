import React, { useState } from 'react';
import Modal from '../common/Modal';
import styled from 'styled-components';
import SignupForm from './SignupForm';
import SkillsForm from './SkillsForm';

interface InputVal {
  nickname: string;
  position: string;
  career: string;
  skills: string[];
}

const SignupModal = () => {
  const [inputVal, setInputVal] = useState<InputVal>({
    nickname: '',
    position: '',
    career: '',
    skills: [],
  });
  const [pageNum, setPageNum] = useState(1);
  const setPrevPage = () => setPageNum(1);
  const setNextPage = () => setPageNum(2);
  const setSkills = (skills: string[]) => setInputVal({ ...inputVal, skills });

  return (
    <Modal title="회원가입">
      <Container>
        {pageNum === 1 && <SignupForm inputVal={inputVal} setInputVal={setInputVal} setNextPage={setNextPage} />}
        {pageNum === 2 && <SkillsForm inputVal={inputVal} setPrevPage={setPrevPage} setSkills={setSkills} />}
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
