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
      <Title>{props.title}</Title>
      <Description>{props.children}</Description>
      <Close asChild>
        <button className="IconButton" aria-label="Close">
          <Cross2Icon />
        </button>
      </Close>
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
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;

  &:focus {
    outline: none;
  }
`;

const Title = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  color: var(--mauve-12);
  font-size: 17px;
`;

const Description = styled(Dialog.Description)`
  margin: 10px 0 20px;
  color: var(--mauve-11);
  font-size: 15px;
  line-height: 1.5;
`;

const Close = styled(Dialog.Close)``;

export default Modal;
