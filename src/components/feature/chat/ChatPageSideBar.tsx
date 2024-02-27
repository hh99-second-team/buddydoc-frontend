import React from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import JoinList from './tabs/JoinList';

const ChatPageSideBar = () => {
  const tabTitle = ['현재 참여 목록', '채팅', '설정'];

  return (
    <Layout>
      <Tabs.Root defaultValue="현재참여목록">
        <TabsList>
          {tabTitle.map((title) => (
            <Tabs.Trigger key={title} value={title}>
              {title}
            </Tabs.Trigger>
          ))}
        </TabsList>
        <TabsContentContainer>
          <Tabs.Content value="현재참여목록">{/* <JoinList /> */}</Tabs.Content>
          <Tabs.Content value="채팅">채팅</Tabs.Content>
          <Tabs.Content value="설정">설정</Tabs.Content>
        </TabsContentContainer>
      </Tabs.Root>
    </Layout>
  );
};

const Layout = styled.div`
  background-color: green;
`;
// const TabsRoot = styled(Tabs.Root)`
//   height: calc(100vh - 4.375rem);
//   display: flex;
// `;

const TabsList = styled(Tabs.List)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// const TabsList = styled(Tabs.List)`
//   width: 12.5rem;
//   box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08);
//   background: #fff;
//   padding: 3.75rem 0;
// `;

// const TabsTrigger = styled(Tabs.Trigger)`
//   width: 100%;
//   text-align: center;
//   height: 3.125rem;
//   padding: 0.5rem;
//   color: #9f9f9f;
//   font-size: 18px;
//   font-style: normal;
//   font-weight: 800;
//   line-height: normal;
//   letter-spacing: 0.72px;
//   border: none;
//   outline: none;
//   background: transparent;

//   &:hover {
//     background: #e2e3e5;
//   }
// `;

const TabsContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: green;
`;

// const TabsContent = styled(Tabs.Content)`
//   display: flex;
//   padding: 2.25rem;
//   height: calc(100vh - 4.375rem);
// `;

export default ChatPageSideBar;
