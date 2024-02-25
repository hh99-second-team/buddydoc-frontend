import React from 'react';
import styled from 'styled-components';
import SideTab from '../components/feature/chat/SideTab';
import ChatList from '../components/feature/chat/ChatList';
import Chatting from '../components/feature/chat/Chatting';

const ChatRoom = () => {
  return (
    <Layout>
      <SideTab />
      <ChatList />
      <Chatting />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
`;

export default ChatRoom;
