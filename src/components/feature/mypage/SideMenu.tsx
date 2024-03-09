import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';
import ManageProfile from './tabs/ManageProfile';
import ApplyList from './tabs/ApplyList';
import LikeList from './tabs/LikeList';
import MyPostList from './tabs/MyPostList';
import JoinList from './tabs/JoinList';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const SideMenu: React.FC<{ tabsNav: string[] }> = ({ tabsNav }) => {
  const { tabType } = useParams();
  return (
    <Layout>
      {tabsNav.map((tab, idx) => (
        <TabsContent key={idx} value={tab}>
          {tabType === 'profile' && <ManageProfile />}
          {tabType === 'join' && <JoinList />}
          {tabType === 'apply' && <ApplyList />}
          {tabType === 'like' && <LikeList />}
          {tabType === 'mypost' && <MyPostList />}
        </TabsContent>
      ))}
    </Layout>
  );
};

const Layout = styled.div`
  padding-left: 5vw;

  @media screen and (max-width: 768px) {
    padding-left: 0;
  }
`;

const TabsContent = styled(Tabs.Content)`
  width: 100%;
`;

export default SideMenu;
