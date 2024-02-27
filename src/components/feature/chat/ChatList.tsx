import React from 'react';
import styled from 'styled-components';
import ChatRoomCard from './ChatRoomCard';
<<<<<<< HEAD
import * as Tabs from '@radix-ui/react-tabs';
import Chatting from './Chatting';

const ChatList = () => {
  const tabTitle = ['FE 스터디', 'BE 스터디', '웹개발 프로젝트'];

  return (
    <ListBox>
      <Title>채팅</Title>
      <Tabs.Root defaultValue="FE 스터디">
        <TabsList>
          {tabTitle.map((title) => (
            <TabsTrigger key={title} value={title}>
              {title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="FE 스터디">
          <Chatting />
        </TabsContent>
        <TabsContent value="BE 스터디">
          <Chatting />
        </TabsContent>
        <TabsContent value="웹개발 프로젝트">
          <Chatting />
        </TabsContent>
      </Tabs.Root>
=======

const ChatList = () => {
  return (
    <ListBox>
      <Title>채팅</Title>
      <ChatRoomCard title="버디독" />
>>>>>>> 1582d546f0f9d9abcd970b5dbdcf85158180b6c7
    </ListBox>
  );
};

<<<<<<< HEAD
export default ChatList;

=======
>>>>>>> 1582d546f0f9d9abcd970b5dbdcf85158180b6c7
const ListBox = styled.div`
  border-radius: 12px;
  background: #fff;
  width: 21.625rem;
  height: 100%;
  padding: 1.125rem;
`;

const Title = styled.p`
  color: #000;
  font-family: Pretendard;
<<<<<<< HEAD
  font-size: 25px;
=======
  font-size: 20px;
>>>>>>> 1582d546f0f9d9abcd970b5dbdcf85158180b6c7
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

<<<<<<< HEAD
const TabsList = styled(Tabs.List)`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #eee;
`;
const TabsTrigger = styled(Tabs.Trigger)`
  border: none;
  background-color: transparent;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-top: 1px solid black;
  padding: 10px;
`;

const TabsContent = styled(Tabs.Content)``;
=======
export default ChatList;
>>>>>>> 1582d546f0f9d9abcd970b5dbdcf85158180b6c7
