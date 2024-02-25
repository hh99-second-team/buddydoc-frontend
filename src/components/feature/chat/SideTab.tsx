import React from 'react';
import styled from 'styled-components';

const SideTab = () => {
  const tabTitle = ['현재 참여 목록', '채팅', '설정'];

  return (
    <Container>
      {tabTitle.map((title) => (
        <Tab key={title}>{title}</Tab>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 12.5rem;
  height: calc(100vh - 4.375rem);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08);
  padding: 3.75rem 0;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.125rem;
  padding: 0.5rem;
  color: #9f9f9f;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.72px;

  &:hover {
    background: #e2e3e5;
  }
`;

export default SideTab;
