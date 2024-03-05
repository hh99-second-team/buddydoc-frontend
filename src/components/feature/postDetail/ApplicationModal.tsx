import React, { useEffect, useState } from 'react';
import Modal from '../../common/Modal';
import styled from 'styled-components';
import Textarea from '../../common/Textarea';
import Button from '../../common/Button';
import api from '../../../api';
import Select from '../../common/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io, Socket } from 'socket.io-client';

interface ModalProps {
  postId: string;
  setIsOpen: (isOpen: boolean) => void;
  positionList: string[];
}

const ApplicationModal = ({ postId, setIsOpen, positionList }: ModalProps) => {
  const [position, setPosition] = useState('');
  const [notiMsg, setNotiMsg] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  const onChangePosition = (position: string) => setPosition(position);
  const onChangeNotiMsgText = (e: React.ChangeEvent<HTMLInputElement>) => setNotiMsg(e.target.value);

  // 알림 Request를 보내는 ENDPOINT 설정
  const ENDPOINT = process.env.REACT_APP_API_ROOT + '/alarm';

  // 모달창 렌더링시 socket 연결
  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSubmit = async () => {
    if (!position || !notiMsg) {
      toast.error('모든 항목을 입력해주세요.');
      return;
    }
    try {
      await api.createApplication(postId, { position, noti_message: notiMsg });
      toast.success('신청이 완료됐습니다.');
      if (socket) {
        // 알림 emit 로직 삽입
        // userId추출
        const userId = localStorage.getItem('userId');
        // socket 연결
        socket.emit('buddydocConnect', userId);
        console.log('socket connected');
        // 알림 request 전송
        socket.emit('alarmMessage', { position, noti_message: notiMsg, userId, postId });
      }
      setIsOpen(false);
    } catch (e) {
      toast.error('이미 신청한 글입니다.');
    }
  };

  return (
    <>
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
      </Modal>
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
    </>
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
