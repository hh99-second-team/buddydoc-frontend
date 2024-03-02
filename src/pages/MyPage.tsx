import React from 'react';
import '@radix-ui/themes/styles.css';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import SideBar from '../components/feature/mypage/Sidebar';
import SideMenu from '../components/feature/mypage/SideMenu';
import { Layout } from '../styles/GlobalStyles';

const MyPage = () => {
  const tabTypes = ['프로필', '현재 참여 목록', '내 신청 현황', '관심 목록', '작성 목록'];

  return (
    <Layout>
      <TabsRoot defaultValue={tabTypes[0]}>
        <SideBar tabTypes={tabTypes} />
        <SideMenu tabTypes={tabTypes} />
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
