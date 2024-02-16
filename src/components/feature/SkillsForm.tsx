import React from 'react';
import Button from '../common/Button';
import styled from 'styled-components';

interface FormProps {
  inputVal: any;
  setInputVal: any;
  setPrevPage: () => void;
  handleSubmit: () => void;
}

const SkillsForm = ({ inputVal, setInputVal, setPrevPage, handleSubmit }: FormProps) => {
  return (
    <div>
      SkillsForm
      <ButtonSet>
        <Button size="full" color="primary" onClick={setPrevPage}>
          이전
        </Button>
        <Button size="full" color="primary" onClick={handleSubmit}>
          완료
        </Button>
      </ButtonSet>
    </div>
  );
};

const ButtonSet = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
`;

export default SkillsForm;
