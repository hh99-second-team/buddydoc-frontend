import React from 'react';
import styled from 'styled-components';

const ChatRoomCard: React.FC<{ postTitle: string }> = ({ postTitle }) => {
  return (
    <Container>
      <RoomName>{postTitle}</RoomName>
    </Container>
  );
};

const Container = styled.div`
  height: 5.625rem;
  border-bottom: 1px solid #dadada;
  display: flex;
  align-items: center;
  padding: 1.125rem 0.5rem;
`;

const RoomName = styled.p`
  width: 100%;
  color: #000;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export default ChatRoomCard;
