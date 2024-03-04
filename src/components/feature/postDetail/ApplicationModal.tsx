import React, { useState } from 'react';
import Modal from '../../common/Modal';
import styled from 'styled-components';
import Textarea from '../../common/Textarea';
import Button from '../../common/Button';
import api from '../../../services/api';
import Select from '../../common/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ModalProps {
  postId: string;
  setIsOpen: (isOpen: boolean) => void;
  positionList: string[];
}

const ApplicationModal = ({ postId, setIsOpen, positionList }: ModalProps) => {
  const [position, setPosition] = useState('');
  const [notiMsg, setNotiMsg] = useState('');

  const onChangePosition = (position: string) => setPosition(position);
  const onChangeNotiMsgText = (e: React.ChangeEvent<HTMLInputElement>) => setNotiMsg(e.target.value);

  const handleSubmit = async () => {
    await api.createApplication(postId, { position, noti_message: notiMsg });
    toast.success('신청이 완료됐습니다.');
    setIsOpen(false);
  };

  return (
    <Modal postTitle="신청서">
      <Container>
        <div>
          <div>
            <Title>
              지원 포지션<span> *</span>
            </Title>
            <Select
              selectValue={position}
              onValueChange={onChangePosition}
              placeholder="지원하는 포지션을 선택해주세요"
              items={positionList}
            />
          </div>
          <div>
            <Title>
              자기소개<span> *</span>
            </Title>
            <Textarea
              placeholder="간단한 지원동기나 자기소개를 작성해주세요 :)"
              value={notiMsg}
              onChange={onChangeNotiMsgText}
              rows={10}
              maxLength={400}
            />
          </div>
        </div>
        <Button size="full" color="primary" onClick={handleSubmit}>
          신청하기
        </Button>
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 35px;

  & > div {
    display: grid;
    row-gap: 2rem;
  }
`;

const Title = styled.p`
  font-size: 18px;
  margin-bottom: 10px;

  & > span {
    color: rgb(224, 67, 53);
  }
`;

export default ApplicationModal;
