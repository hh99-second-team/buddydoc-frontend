import React from 'react';
import * as Menubar from '@radix-ui/react-menubar';
import styled, { keyframes } from 'styled-components';

const PortalContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Menubar.Portal>
      <Content align="start" sideOffset={5} alignOffset={-3}>
        {children}
      </Content>
    </Menubar.Portal>
  );
};

const slideUpAndFade = keyframes`
  0% { opacity: 0; transform: translateY(2px) };
  100% { opacity: 1; transform: translateY(0) };
`;

const slideRightAndFade = keyframes`
  0% { opacity: 0; transform: translateX(-2px) };
  100% { opacity: 1; transform: translateX(0) };
`;

const slideDownAndFade = keyframes`
  0% { opacity: 0; transform: translateY(-2px) };
  100% { opacity: 1; transform: translateY(0) };
`;

const slideLeftAndFade = keyframes`
  0% { opacity: 0; transform: translateX(2px) };
  100% { opacity: 1; transform: translateX(0) };
`;

const Content = styled(Menubar.Content)`
  z-index: 999;
  border-radius: 4;
  padding: 1rem;
  margin-top: 1rem;
  width: 10rem;
  display: grid;
  row-gap: 1rem;
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  &[data-state='open'] {
    &[data-side='top'] {
      animation-name: ${slideDownAndFade};
    }
    &[data-side='right'] {
      animation-name: ${slideLeftAndFade};
    }
    &[data-side='bottom'] {
      animation-name: ${slideUpAndFade};
    }
    &[data-side='left'] {
      animation-name: ${slideRightAndFade};
    }
  }

  &:hover {
    border: none;
  }
`;

export default PortalContent;
