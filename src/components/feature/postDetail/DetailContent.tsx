import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const DetailContent = ({ children }: Props) => {
  return <ContentBox>{children}</ContentBox>;
};

const ContentBox = styled.div`
  padding: 40px 0;
  min-height: 500px;
  font-size: 1.3rem;
  line-height: 1.7;
`;

export default DetailContent;
