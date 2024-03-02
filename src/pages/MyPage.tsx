import React from 'react';
import '@radix-ui/themes/styles.css';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
// import SimpleProfileInfo from "./components/mypage/SimpleProfileInfo";
import SideBar from '../components/feature/mypage/Sidebar';
import SideMenu from '../components/feature/mypage/SideMenu';
import { Layout } from '../styles/GlobalStyles';

const MyPage = () => {
  return (
    <Layout>
      {/* 메인 영역 */}
      <TabsRoot defaultValue="ManageProfile">
        {/* 좌측 사이드바 메뉴 */}
        <SideBar />
        {/* 우측 메인 */}
        <SideMenu />
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
