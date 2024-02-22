import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import styled, { keyframes } from 'styled-components';

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => (
  <>
    <Overlay />
    <Content>
      <Header>
        <div></div>
        <Title>{props.title}</Title>
        <Close asChild>
          <button aria-label="Close">
            <Cross2Icon />
          </button>
        </Close>
      </Header>
      <div>{props.children}</div>
    </Content>
  </>
);

const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const Overlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;
`;

const Content = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  padding: 30px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;

  &:focus {
    outline: none;
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  margin-bottom: 50px;
`;

const Title = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  font-size: 26px;
  text-align: center;
`;

const Close = styled(Dialog.Close)`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;

  & > svg {
    float: right;
    width: 22px;
    height: 22px;
  }
`;

export default Modal;
