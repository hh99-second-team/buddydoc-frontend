import React from 'react';
import styled from 'styled-components';

function TextChattingContent() {
  return (
    <ChatTabContainer>
      <ChatTabLeft>채팅목록</ChatTabLeft>
      <ChatTabRight>
        <ChatRoomHeader>채팅창 헤더</ChatRoomHeader>
        <ChatRoomMain>
          채팅창
          <ChatRoomInputGroup>입력창</ChatRoomInputGroup>
        </ChatRoomMain>
        
      </ChatTabRight>
    </ ChatTabContainer>
  );
}

export default TextChattingContent;

const ChatTabContainer = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  gap: 28px;
`;
const ChatTabLeft = styled.div` 
  width: 346px;
  height: 935px;
  flex-shrink: 0;
  background-color: blue; 
`;
const ChatTabRight = styled.div`
  width: 761px;
  height: 935px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 12px;
`;
const ChatRoomHeader = styled.div`
  width: 761px;
  height: 84px;
  flex-shrink: 0;
  background-color: purple; 
`;
const ChatRoomMain = styled.div`
  width: 761px;
  height: 781px;
  flex-shrink: 0;
  background-color: red; 
`;
const ChatRoomInputGroup = styled.div`
  width: 761px;
  height: 188px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--white, #FFF);
  position: absolute;
  bottom: 0px;
  background-color: yellow; 
`;