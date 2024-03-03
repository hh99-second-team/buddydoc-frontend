import * as Dialog from '@radix-ui/react-dialog';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const notifyDummy = [
  {
    notifyTitle: '새로운 신청 1',
    notifyDescription: '1건의 새로운 신청이 있습니다. - 1',
  },
  {
    notifyTitle: '새로운 신청 2',
    notifyDescription: '1건의 새로운 신청이 있습니다. - 2',
  },
];

const NotifyContent = () => {
  // useEffect(() => {
  //   console.log('NotifyContent');
  // }, []);

  return (
    <DialogContent>
      <DialogTitle>알림</DialogTitle>
      <DialogDescription>
        {notifyDummy.map((data, index) => {
          return (
            <NotifyCard key={index}>
              <NotifyTitle>{data.notifyTitle}</NotifyTitle>
              <NotifyDescription>{data.notifyDescription}</NotifyDescription>
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
  background-color: lightgray;
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
