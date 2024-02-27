import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import styled from 'styled-components';
// import ChatPageSideBar from '../components/feature/chat/ChatPageSideBar';
// import ChatPageMain from '../components/feature/chat/ChatPageMain';

const ChatRoom = () => {
  const tabTitle = ['현재참여목록', '채팅', '설정'];
  return (
    <Layout>
      <TabsRoot defaultValue="현재참여목록">
        <TabsList>
          {tabTitle.map((title) => (
            <TabsTrigger key={title} value={title}>
              {title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContentContainer>
          <Tabs.Content value="현재참여목록">현재참여목록</Tabs.Content>
          <Tabs.Content value="채팅">채팅</Tabs.Content>
          <Tabs.Content value="설정">설정</Tabs.Content>
        </TabsContentContainer>
      </TabsRoot>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  background: var(--grey01, #f9fafc);
`;
const TabsRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: row;
`;
const TabsList = styled(Tabs.List)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
  height: 954px;
  flex-shrink: 0;
  padding-top: 60px;
  /* background-color: red; */
`;
const TabsTrigger = styled(Tabs.Trigger)`
  display: flex;
  width: 200px;
  height: 49px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  color: #7a7a7a;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.72px;
  border: none;
  transition: 0.3s;
  &:hover {
    background: #7a7a7a;
    color: #fff;
  }
`;
const TabsContentContainer = styled.div`
  width: 1500px;
  height: 800px;
  display: flex;
  flex-direction: row;
  background-color: green;
  box-sizing: border-box;
  margin: 40px 0 0 40px;
`;

export default ChatRoom;
