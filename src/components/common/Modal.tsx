import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import styled, { keyframes } from 'styled-components';

interface ModalProps {
  postTitle: string;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => (
  <>
    <Overlay />
    <Content>
      <Header>
        <Close asChild>
          <button aria-label="Close">
            <Cross2Icon />
          </button>
        </Close>
      </Header>
      <Description>
        <Title>
          {props.postTitle.length < 14 ? (
            <>{props.postTitle}</>
          ) : (
            <>
              {props.postTitle.slice(0, 13)}
              <br />
              {props.postTitle.slice(13, props.postTitle.length)}
            </>
          )}
        </Title>
        <Body>{props.children}</Body>
      </Description>
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
  max-width: 650px;
  max-height: 80vh;
  overflow-y: scroll;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;

  &:focus {
    outline: none;
  }
`;

const Header = styled.div`
  height: 3.5rem;
  border-radius: 12px 12px 0px 0px;
  border-bottom: 1px solid #d8d8d8;
  background: #f9fafc;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 1rem;
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

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

const Title = styled(Dialog.Title)`
  font-weight: 500;
  font-size: 1.625rem;
  text-align: center;
`;

const Body = styled.div`
  margin-top: 4rem;
`;

export default Modal;
