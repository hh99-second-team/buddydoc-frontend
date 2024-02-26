import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';
import Button from '../common/Button';

const SearchModal = () => {
  return (
    <>
      <Overlay />
      <Content>
        <input type="text" placeholder="검색어를 입력해주세요." />
        <Button size="small" color="black">
          검색
        </Button>
      </Content>
    </>
  );
};

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
  border-radius: 2rem;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 8rem;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 9vh;
  max-width: 650px;
  max-height: 80px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;

  &:focus {
    outline: none;
  }

  & > input {
    width: 80%;
    height: 90%;
    font-size: 1.3rem;
    border: none;

    &:focus {
      outline: none;
    }
  }
`;

export default SearchModal;
