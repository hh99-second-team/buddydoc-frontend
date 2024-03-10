import * as Tabs from '@radix-ui/react-tabs';
import React, { useState } from 'react';
import styled from 'styled-components';

function JoinListContent() {
  const [selectedTab, setSelectedTab] = useState('study');

  return (
    <Tabs.Root defaultValue="study">
      <TabsList>
        <TabsTrigger value="study" isSelected={selectedTab === 'study'} onClick={() => setSelectedTab('study')}>
          스터디()
        </TabsTrigger>
        <TabsTrigger value="project" isSelected={selectedTab === 'project'} onClick={() => setSelectedTab('project')}>
          프로젝트()
        </TabsTrigger>
        <TabsTrigger
          value="coffeeChat"
          isSelected={selectedTab === 'coffeeChat'}
          onClick={() => setSelectedTab('coffeeChat')}>
          커피챗()
        </TabsTrigger>
      </TabsList>
      <ContentContainer>
        <TabsContent value="study">study</TabsContent>
        <TabsContent value="project">project</TabsContent>
        <TabsContent value="coffeeChat">coffeeChat</TabsContent>
      </ContentContainer>
    </Tabs.Root>
  );
}

export default JoinListContent;
const TabsList = styled(Tabs.List)`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-bottom: 40px;
`;
const TabsTrigger = styled(Tabs.Trigger)<{ isSelected?: boolean }>`
  border: none;
  font-size: 30px;
  font-weight: bold;
  background-color: transparent;
  color: ${({ isSelected }) => (isSelected ? '#000' : '#e2e3e5')};
  transition-duration: 0.3s;
  &:hover {
    color: #000;
  }
`;
const TabsContent = styled(Tabs.Content)``;
const ContentContainer = styled.div`
  height: 650px;
  background-color: blue;
`;
