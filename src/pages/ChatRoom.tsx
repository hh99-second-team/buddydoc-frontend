import React from 'react';
import styled from 'styled-components';
import SideTab from '../components/feature/chat/SideTab';

const ChatRoom = () => {
  return (
    <Layout>
      <SideTab />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  background: var(--grey01, #f9fafc);
`;

export default ChatRoom;
