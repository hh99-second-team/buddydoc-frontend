import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const TypeIcon = ({ children }: Props) => {
  return <TypeBox>{children}</TypeBox>;
};

const TypeBox = styled.div`
  display: flex;
  height: 36px;
  padding: 5.636px 11.273px;
  justify-content: center;
  align-items: center;
  gap: 6.442px;
  border-radius: 12px;
  border: 1px solid var(--grey02, #e2e3e5);
  background: #fff;
  color: #434855;
`;

export default TypeIcon;
