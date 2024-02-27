import React from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import ChatList from './ChatList';
import Chatting from './Chatting';
import JoinList from './JoinList';

const SideTab = () => {
  const tabTitle = ['현재 참여 목록', '채팅', '설정'];

  return (
    <TabsRoot defaultValue="현재 참여 목록">
      <TabsList>
        {tabTitle.map((title) => (
          <TabsTrigger key={title} value={title}>
            {title}
          </TabsTrigger>
        ))}
      </TabsList>
      <Tabs.Content value="현재 참여 목록">
        <JoinList />
      </Tabs.Content>
      <TabsContent value="채팅">
        <ChatList />
      </TabsContent>
      <Tabs.Content value="설정"></Tabs.Content>
    </TabsRoot>
  );
};

const TabsRoot = styled(Tabs.Root)`
  height: calc(100vh - 4.375rem);
  display: flex;
`;

const TabsList = styled(Tabs.List)`
  width: 12.5rem;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08);
  background: #fff;
  padding: 3.75rem 0;
`;

const TabsTrigger = styled(Tabs.Trigger)`
  width: 100%;
  text-align: center;
  height: 3.125rem;
  padding: 0.5rem;
  color: #9f9f9f;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.72px;
  border: none;
  outline: none;
  background: transparent;

  &:hover {
    background: #e2e3e5;
  }
`;

const TabsContent = styled(Tabs.Content)`
  display: flex;
  padding: 2.25rem;
  height: calc(100vh - 4.375rem);
`;

export default SideTab;
