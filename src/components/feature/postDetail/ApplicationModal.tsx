import React, { useState } from 'react';
import Modal from '../../common/Modal';
import styled from 'styled-components';
import Textarea from '../../common/Textarea';
import Button from '../../common/Button';
import api from '../../../services/api';

interface ModalProps {
  postId: string;
  setIsOpen: (isOpen: boolean) => void;
}

const ApplicationModal = ({ postId, setIsOpen }: ModalProps) => {
  const [notiMsg, setNotiMsg] = useState('');
  const onChangeNotiMsgText = (e: React.ChangeEvent<HTMLInputElement>) => setNotiMsg(e.target.value);

  const handleSubmit = async () => {
    await api.createApplication(postId, notiMsg);
    setIsOpen(false);
  };

  return (
    <Modal title="신청서">
      <Container>
        <div>
          <Title>
            자기소개<span> *</span>
          </Title>
          <Textarea
            placeholder="간단한 지원동기나 자기소개를 작성해주세요 :)"
            value={notiMsg}
            onChange={onChangeNotiMsgText}
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
