import React from 'react';
import styled from 'styled-components';
import ChatRoomCard from './ChatRoomCard';

const ChatList = () => {
  return (
    <ListBox>
      <Title>채팅</Title>
      <ChatRoomCard title="버디독" />
    </ListBox>
  );
};

const ListBox = styled.div`
  border-radius: 12px;
  background: #fff;
  width: 21.625rem;
  height: 100%;
  padding: 1.125rem;
`;

const Title = styled.p`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default ChatList;
