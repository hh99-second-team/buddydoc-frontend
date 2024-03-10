import React, { useState } from 'react';
import Button from '../Button';
import styled from 'styled-components';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { skills } from '../../constants';
import api from '../../api';
import { isSignupOpenState } from '../../store/atomDefinitions';
import { useRecoilState } from 'recoil';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import SelectedIcon from '../SelectedIcon';
import { SignUpType } from '../../types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormProps {
  inputVal: SignUpType;
  setPrevPage: () => void;
}

const SkillsForm = ({ inputVal, setPrevPage }: FormProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [, setIsSignupOpen] = useRecoilState(isSignupOpenState);

  const onChangeSkills = (value: string[]) => setSelectedSkills(value);

  const handleSubmit = async () => {
    if (!selectedSkills.length) {
      toast.error('기술 스택을 선택하세요.');
    } else if (localStorage.getItem('accessToken')) {
      try {
        await api.signup({ ...inputVal, skillList: selectedSkills });
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('nickname', inputVal.userNickname);
        toast.success('회원가입 성공');
        setIsSignupOpen(false);
      } catch (e) {
        toast.error('회원가입에 실패했습니다.');
      }
    }
  };

  return (
    <>
      <ScrollAreaRoot>
        <Title>
          기술 스택 선택<span> *</span>
        </Title>
        <ScrollAreaViewport>
          <SkillBox type="multiple" value={selectedSkills} onValueChange={onChangeSkills}>
            {skills.map((skill, idx) => (
              <SkillItem key={idx} value={skill} onClick={() => onChangeSkills(selectedSkills)}>
                <SelectedIcon type="skill" item={skill} />
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
    </>
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
