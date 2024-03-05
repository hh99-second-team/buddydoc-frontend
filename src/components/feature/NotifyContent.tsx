import * as Dialog from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const notifyDummy = [
  {
    noti_message: '안녕하세요 같이 프로젝트 진행하고싶어요 1 ',
    position: '프론트엔드',
    postId: 43,
    userId: 1,
  },
  {
    noti_message: '안녕하세요 같이 프로젝트 진행하고싶어요 2 ',
    position: '프론트엔드',
    postId: 43,
    userId: 2,
  },
];

const NotifyContent = () => {
  // localstorage에 있는 userId가져오기

  useEffect(() => {
    console.log('Notify Modal Opend !');
  }, []);

  return (
    <DialogContent>
      <DialogTitle>알림</DialogTitle>
      <DialogDescription>
        {notifyDummy.map((data, index) => {
          return (
            <NotifyCard key={index}>
              <NotifyTitle>{data.noti_message}</NotifyTitle>
              <NotifyDescription>{data.position}</NotifyDescription>
            </NotifyCard>
          );
        })}
      </DialogDescription>
      <DialogClose>닫기</DialogClose>
    </DialogContent>
  );
};

export default NotifyContent;

const DialogContent = styled(Dialog.Content)`
  position: relative;
  width: 340px;
  height: 400px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.07);
  padding: 20px 18px;
`;
const DialogTitle = styled(Dialog.Title)`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.72px;
  text-align: start;
  margin-bottom: 20px;
`;
const NotifyCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
const NotifyTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.64px;
  text-align: start;
`;
const NotifyDescription = styled.div`
  color: var(--text1, #737373);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.48px;
  text-align: start;
`;
const DialogDescription = styled(Dialog.Content)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: start;
`;
const DialogClose = styled(Dialog.Close)`
  border: none;
  background-color: transparent;
  color: var(--text1, #434855);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.64px;
  position: absolute;
  right: 14.25px;
  bottom: 17px;
`;
