import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface Props {
  handleClose: any;
  title: string;
  children?: React.ReactNode;
  onClick: any;
}

const AlertModal = ({ handleClose, title, children, onClick }: Props) => {
  return (
    <>
      <Overlay />
      <Content>
        <Title>{title}</Title>
        {children && <Description>{children}</Description>}
        <Flex>
          <Cancel asChild>
            <Button onClick={handleClose}>취소</Button>
          </Cancel>
          <Action asChild>
            <Button onClick={onClick}>삭제</Button>
          </Action>
        </Flex>
      </Content>
    </>
  );
};

const overlayShow = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const contentShow = keyframes`
  0% { opacity: 0; transform: translate(-50%, -48%) scale(.96); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const Overlay = styled(AlertDialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const Content = styled(AlertDialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }
`;

const Title = styled(AlertDialog.Title)`
  margin: 0;
  color: pink;
  font-size: 17px;
  font-weight: 500;
`;

const Description = styled(AlertDialog.Description)`
  margin-bottom: 20px;
  color: pink;
  font-size: 15px;
  line-height: 1.5;
`;

const Flex = styled.div`
  display: flex;
`;

const Button = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
  cursor: pointer;
`;

const Cancel = styled(AlertDialog.Cancel)``;
const Action = styled(AlertDialog.Action)``;

export default AlertModal;
