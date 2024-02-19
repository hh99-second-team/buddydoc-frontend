import React, { useState } from 'react';
import Button from '../common/Button';
import styled, { css } from 'styled-components';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { skills } from '../../utils/skillUrlList';

interface FormProps {
  inputVal: any;
  setInputVal: any;
  setPrevPage: () => void;
  setSkills: (skills: string[]) => void;
}

const SkillsForm = ({ inputVal, setInputVal, setPrevPage, setSkills }: FormProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const onSkillsChange = (value: string[]) => setSelectedSkills(value);

  return (
    <div>
      <SkillBox type="multiple" value={selectedSkills} onValueChange={onSkillsChange}>
        {skills.map((skill, idx) => (
          <SkillItem key={idx} value={skill}>
            {skill}
          </SkillItem>
        ))}
      </SkillBox>
      <Title>나의 기술 스택</Title>
      <SelectedSkillBox>
        {selectedSkills.map((skill, idx) => (
          <SelectedSkillItem key={idx}>{skill}</SelectedSkillItem>
        ))}
      </SelectedSkillBox>
      <ButtonSet>
        <Button size="full" color="primary" onClick={setPrevPage}>
          이전
        </Button>
        <Button size="full" color="primary" onClick={setSkills}>
          완료
        </Button>
      </ButtonSet>
    </div>
  );
};

const SkillBoxStyles = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 15px;
  column-gap: 10px;
`;

const SkillBox = styled(ToggleGroup.Root)`
  ${SkillBoxStyles};
`;

const SelectedSkillBox = styled.div`
  ${SkillBoxStyles};
  border-radius: 10px;
  margin-top: 10px;
`;

const SkillItemStyles = css`
  display: flex;
  padding: 10px 16px;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid var(--grey02, #e2e3e5);
  font-size: 14px;
`;

const SkillItem = styled(ToggleGroup.Item)`
  ${SkillItemStyles};
  background: #fff;

  &:hover {
    background-color: #f9fafc;
  }
  &[data-state='on'] {
    background-color: var(--grey02, #e2e3e5);
  }
`;

const SelectedSkillItem = styled.div`
  ${SkillItemStyles}
  background-color: var(--grey02, #e2e3e5);
`;

const Title = styled.p`
  text-align: center;
  margin-top: 40px;
`;

const ButtonSet = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  margin-top: 30px;
`;

export default SkillsForm;
