import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';
import ManageProfile from './tabs/ManageProfile';
import ApplyList from './tabs/ApplyList';
import LikeList from './tabs/LikeList';
import MyPostList from './tabs/MyPostList';
import JoinList from './tabs/JoinList';
import styled from 'styled-components';

const SideMenu: React.FC<{ tabTypes: string[] }> = ({ tabTypes }) => {
  return (
    <Layout>
      {tabTypes.map((tab, idx) => (
        <TabsContent key={idx} value={tab}>
          {idx === 0 && <ManageProfile />}
          {idx === 1 && <JoinList />}
          {idx === 2 && <ApplyList />}
          {idx === 3 && <LikeList />}
          {idx === 4 && <MyPostList />}
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
