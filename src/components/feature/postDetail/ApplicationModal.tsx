import React, { useState } from 'react';
import Modal from '../../common/Modal';
import styled from 'styled-components';
import Select from '../../common/Select';
import { positions } from '../../../utils/skillUrlList';
import Textarea from '../../common/Textarea';
import Button from '../../common/Button';

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const ApplicationModal = ({ setIsOpen }: ModalProps) => {
  const [inputVal, setInputVal] = useState({ position: '', goalsText: '' });
  const onChangePosition = (position: string) => setInputVal({ ...inputVal, position });
  const onChangeGoalsText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputVal({ ...inputVal, goalsText: e.target.value });

  const handleSubmit = () => {
    setIsOpen(false);
  };

  return (
    <Modal title="신청서">
      <Container>
        <div>
          <Title>
            포지션<span> *</span>
          </Title>
          <Select
            items={positions}
            selectValue={inputVal.position}
            onValueChange={onChangePosition}
            placeholder="지원하는 포지션을 선택해주세요."
          />
        </div>
        <div>
          <Title>
            자기소개<span> *</span>
          </Title>
          <Textarea
            placeholder="간단한 지원동기나 자기소개를 작성해주세요 :)"
            value={inputVal.goalsText}
            onChange={onChangeGoalsText}
            rows={10}
          />
        </div>
        <Button size="full" color="primary" onClick={handleSubmit}>
          신청하기
        </Button>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 35px;
`;

const Title = styled.p`
  font-size: 18px;
  margin-bottom: 10px;

  & > span {
    color: rgb(224, 67, 53);
  }
`;

export default ApplicationModal;
