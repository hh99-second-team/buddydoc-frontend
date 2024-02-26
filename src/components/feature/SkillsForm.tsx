import React, { useState } from 'react';
import Button from '../common/Button';
import styled, { css } from 'styled-components';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { skills } from '../../constants/data';
import api from '../../services/api';
import { isSignupOpenState } from '../../store/atomDefinitions';
import { useRecoilState } from 'recoil';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import SelectedIcon from '../common/SelectedIcon';

interface FormProps {
  inputVal: any;
  setPrevPage: () => void;
  setSkills: (skills: string[]) => void;
}

const SkillsForm = ({ inputVal, setPrevPage, setSkills }: FormProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSignupOpen, setIsSignupOpen] = useRecoilState(isSignupOpenState);

  const onChangeSkills = (value: string[]) => setSelectedSkills(value);

  const handleSubmit = async () => {
    setSkills(selectedSkills);
    const response = await api.signup(inputVal);
    console.log(response);
    setIsSignupOpen(false);
  };

  return (
    <ScrollAreaRoot>
      <Title>
        기술 스택 선택<span> *</span>
      </Title>
      <ScrollAreaViewport>
        <SkillBox type="multiple" value={selectedSkills} onValueChange={onChangeSkills}>
          {skills.map((skill, idx) => (
            <SkillItem key={idx} value={skill} onClick={() => onChangeSkills(selectedSkills)}>
              <SelectedIcon type="skill" item={skill} removeBtn={false} />
            </SkillItem>
          ))}
        </SkillBox>
      </ScrollAreaViewport>

      <ButtonSet>
        <Button size="full" color="primary" onClick={setPrevPage}>
          이전
        </Button>
        <Button size="full" color="primary" onClick={handleSubmit}>
          완료
        </Button>
      </ButtonSet>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Corner />
      </ScrollArea.Scrollbar>
    </ScrollAreaRoot>
  );
};

const ScrollAreaRoot = styled(ScrollArea.Root)`
  overflow: hidden;
`;

const ScrollAreaViewport = styled(ScrollArea.Viewport)`
  height: 450px;
  border-radius: 12px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: var(--white, #fff);
  padding: 2rem;
  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const SkillBox = styled(ToggleGroup.Root)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 15px;
  column-gap: 10px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SkillItem = styled(ToggleGroup.Item)`
  background: #fff;
  padding: 0;
  border: none;
  & > div {
    &:hover {
      background-color: #f9fafc;
    }
  }

  &[data-state='on'] {
    & > div {
      background-color: var(--grey02, #e2e3e5);
    }
  }
`;

const Title = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;

  & > span {
    color: rgb(224, 67, 53);
  }
`;

const ButtonSet = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  margin-top: 2rem;
`;

export default SkillsForm;
