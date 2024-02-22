import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const StudyTypeIcon = ({ children }: Props) => {
  return <TypeBox>{children}</TypeBox>;
};

const TypeBox = styled.div`
  display: inline-flex;
  padding: 4.026px 8.052px;
  justify-content: center;
  align-items: center;
  gap: 6.442px;
  border-radius: 45.091px;
  background: #434855;
  color: white;
`;

export default StudyTypeIcon;
