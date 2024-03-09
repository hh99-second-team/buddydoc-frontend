import React from 'react';
import '@radix-ui/themes/styles.css';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import SideBar from '../components/feature/mypage/Sidebar';
import SideMenu from '../components/feature/mypage/SideMenu';
import { Layout } from '../styles/GlobalStyles';

const MyPage = () => {
  const tabsNav = ['profile', 'join', 'apply', 'like', 'mypost'];

  return (
    <Layout>
      <TabsRoot defaultValue={tabsNav[0]}>
        <SideBar tabsNav={tabsNav} />
        <SideMenu tabsNav={tabsNav} />
      </TabsRoot>
    </Layout>
  );
};

const TabsRoot = styled(Tabs.Root)`
  display: grid;
  grid-template-columns: 12rem auto;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export default MyPage;
