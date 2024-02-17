import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import styled from 'styled-components';
import { Box, Text } from '@radix-ui/themes';
import JoinListContent from './TeamPages/JoinListContent';
import TextChattingContent from './TeamPages/TextChattingContent';
import VideoChattingContent from './TeamPages/VideoChattingContent';

function ChatPage() {
  const [selectedTab, setSelectedTab] = useState('joinList');
  return (
    <PageContainer>
      <Navbar>logo search catting notification profile</Navbar>
      <Main>
        <TabsRoot defaultValue="joinList">
          <SideBar>
            <SideTabsList>
              <SideTabsTrigger
                value="joinList"
                isSelected={selectedTab === 'joinList'}
                onClick={() => setSelectedTab('joinList')}>
                현재 참여 목록
              </SideTabsTrigger>
              <SideTabsTrigger
                value="textChatting"
                isSelected={selectedTab === 'textChatting'}
                onClick={() => setSelectedTab('textChatting')}>
                채팅
              </SideTabsTrigger>
              <SideTabsTrigger
                value="videoChatting"
                isSelected={selectedTab === 'videoChatting'}
                onClick={() => setSelectedTab('videoChatting')}>
                화상 채팅
              </SideTabsTrigger>
              <SideTabsTrigger
                value="settings"
                isSelected={selectedTab === 'settings'}
                onClick={() => setSelectedTab('settings')}>
                설정
              </SideTabsTrigger>
            </SideTabsList>
          </SideBar>
          <SideMenu>
            <Box px="4" pt="3" pb="2">
              <SideTabsContent value="joinList">
                <JoinListContent />
              </SideTabsContent>

              <Tabs.Content value="textChatting">
                <TextChattingContent />
              </Tabs.Content>

              <Tabs.Content value="videoChatting">
                <VideoChattingContent />
              </Tabs.Content>

              <Tabs.Content value="settings">
                <Text size="2">settings</Text>
              </Tabs.Content>
            </Box>
          </SideMenu>
        </TabsRoot>
      </Main>
    </PageContainer>
  );
}

export default ChatPage;

const PageContainer = styled.div``;
const Navbar = styled.div`
  width: 100%;
  height: 94px;
  flex-shrink: 0;
  border-bottom: 1px solid #d9d9d9;
  background: #fff;
`;
const Main = styled.div`
  box-sizing: border-box;
  height: 800px;
  margin-top: 30px;
`;
const TabsRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: row;
`;
const SideBar = styled.div`
  width: 15%;
`;
const SideTabsList = styled(Tabs.List)`
  display: flex;
  padding-top: 50px;
  gap: 20px;
  flex-direction: column;
`;
const SideTabsTrigger = styled(Tabs.Trigger)<{ isSelected?: boolean }>`
  display: flex;
  width: 100%;
  height: 49px;
  padding: 8px;
  font-size: 20px;
  font-weight: bold;
  color: ${({ isSelected }) => (isSelected ? '#000' : '#e2e3e5')};
  border: none;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  transition-duration: 0.3s;
  &:hover {
    color: #000;
    background-color: #f9fafc;
  }
`;
const SideMenu = styled.div`
  width: 85%;
  padding-left: 40px;
  box-sizing: border-box;
`;
const SideTabsContent = styled(Tabs.Content)``;
